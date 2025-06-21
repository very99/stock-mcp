#!/usr/bin/env node

/**
 * Stock MCP Server
 * 股票数据收集 MCP 服务器
 * 
 * A comprehensive MCP server for Chinese A-share stock data collection
 * 用于中国A股数据收集的综合性 MCP 服务器
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// 导入数据收集器
import { StockDataCollector } from "./tools/stock-data-collector.js";
import { NewsCollector } from "./tools/news-collector.js";
import { MarketCollector } from "./tools/market-collector.js";
import { Formatters } from "./utils/formatters.js";

// 创建服务器实例
const server = new Server({
  name: "stock-mcp",
  version: "1.0.0",
});

// 创建数据收集器实例
const stockCollector = new StockDataCollector();
const newsCollector = new NewsCollector();
const marketCollector = new MarketCollector();

// 定义所有可用工具
const tools = [
  {
    name: "get_stock_data",
    description: "获取股票实时行情和技术指标数据",
    inputSchema: {
      type: "object",
      properties: {
        symbol: {
          type: "string",
          description: "股票代码，如 600519、000858、SZ000858"
        },
        include_technical: {
          type: "boolean",
          description: "是否包含技术指标数据",
          default: true
        }
      },
      required: ["symbol"]
    }
  },
  {
    name: "get_stock_news",
    description: "获取股票相关新闻和公告信息",
    inputSchema: {
      type: "object",
      properties: {
        symbol: {
          type: "string",
          description: "股票代码"
        },
        stock_name: {
          type: "string",
          description: "股票名称，用于新闻搜索"
        }
      },
      required: ["symbol", "stock_name"]
    }
  },
  {
    name: "get_market_overview",
    description: "获取市场概况，包括主要指数和市场情绪",
    inputSchema: {
      type: "object",
      properties: {
        include_money_flow: {
          type: "boolean",
          description: "是否包含资金流向数据",
          default: true
        }
      }
    }
  },
  {
    name: "comprehensive_analysis",
    description: "获取股票的综合分析数据（实时行情+技术指标+新闻+市场环境）",
    inputSchema: {
      type: "object",
      properties: {
        symbol: {
          type: "string",
          description: "股票代码"
        },
        stock_name: {
          type: "string",
          description: "股票名称"
        }
      },
      required: ["symbol", "stock_name"]
    }
  }
];

// 处理工具列表请求
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// 处理工具调用请求
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "get_stock_data": {
        const symbol = args.symbol;
        const includeTechnical = args.include_technical !== false;

        // 获取实时数据
        const realtimeResult = await stockCollector.getRealTimeData(symbol);
        
        if (!realtimeResult.success) {
          return {
            content: [{
              type: "text",
              text: `❌ 获取股票数据失败: ${realtimeResult.error}\n数据源: ${realtimeResult.source}`
            }]
          };
        }

        const stockData = realtimeResult.data;
        let technicalData = null;

        // 获取技术指标（如果需要）
        if (includeTechnical) {
          const technicalResult = await stockCollector.getTechnicalData(symbol);
          if (technicalResult.success) {
            technicalData = technicalResult.data;
          }
        }

        // 格式化输出
        let output = `📊 股票实时数据\n\n`;
        output += `🏷️ 股票信息\n`;
        output += `• 代码: ${stockData.symbol.toUpperCase()}\n`;
        output += `• 名称: ${stockData.name}\n`;
        output += `• 数据源: ${realtimeResult.source}\n\n`;

        output += `💰 实时行情\n`;
        output += `• 当前价格: ¥${Formatters.formatNumber(stockData.currentPrice)}\n`;
        output += `• 涨跌: ${Formatters.formatChange(stockData.change, stockData.changePercent)}\n`;
        output += `• 今日区间: ¥${Formatters.formatNumber(stockData.low)} - ¥${Formatters.formatNumber(stockData.high)}\n`;
        output += `• 开盘价: ¥${Formatters.formatNumber(stockData.open)}\n`;
        output += `• 成交量: ${Formatters.formatAmount(stockData.volume)}股\n`;
        output += `• 成交额: ¥${Formatters.formatAmount(stockData.turnover)}\n`;
        output += `• 更新时间: ${stockData.timestamp}\n`;

        if (technicalData) {
          output += `\n📈 技术指标\n`;
          output += `• ${Formatters.formatTechnicalIndicator('MA5', technicalData.ma5)}\n`;
          output += `• ${Formatters.formatTechnicalIndicator('MA10', technicalData.ma10)}\n`;
          output += `• ${Formatters.formatTechnicalIndicator('MA20', technicalData.ma20)}\n`;
          output += `• ${Formatters.formatTechnicalIndicator('RSI', technicalData.rsi)}\n`;
          output += `• 量比: ${technicalData.volumeRatio.toFixed(2)}\n`;
        }

        return {
          content: [{
            type: "text",
            text: output
          }]
        };
      }

      case "comprehensive_analysis": {
        const symbol = args.symbol;
        const stockName = args.stock_name;

        let output = `🔍 ${stockName}(${symbol.toUpperCase()}) 综合分析\n\n`;

        // 1. 获取股票基础数据
        const stockResult = await stockCollector.getRealTimeData(symbol);
        if (stockResult.success && stockResult.data) {
          const stockData = stockResult.data;
          output += `📊 实时行情\n`;
          output += `• 当前价格: ¥${Formatters.formatNumber(stockData.currentPrice)}\n`;
          output += `• 涨跌: ${Formatters.formatChange(stockData.change, stockData.changePercent)}\n`;
          output += `• 成交量: ${Formatters.formatAmount(stockData.volume)}股\n`;
          output += `• 成交额: ¥${Formatters.formatAmount(stockData.turnover)}\n\n`;
        }

        // 2. 获取技术指标
        const technicalResult = await stockCollector.getTechnicalData(symbol);
        if (technicalResult.success && technicalResult.data) {
          const technical = technicalResult.data;
          output += `📈 技术指标\n`;
          output += `• ${Formatters.formatTechnicalIndicator('RSI', technical.rsi)}\n`;
          output += `• MA5: ${technical.ma5.toFixed(2)} | MA20: ${technical.ma20.toFixed(2)}\n`;
          output += `• 量比: ${technical.volumeRatio.toFixed(2)}\n\n`;
        }

        // 3. 获取市场环境
        const marketResult = await marketCollector.getMarketOverview();
        if (marketResult.success && marketResult.data) {
          const market = marketResult.data;
          output += `🌍 市场环境\n`;
          output += `• 大盘情绪: ${Formatters.formatSentiment(market.marketSentiment.sentiment)}\n`;
          output += `• 涨跌比: ${market.marketSentiment.rising}:${market.marketSentiment.falling}\n\n`;
        }

        output += `⚠️ 风险提示: 以上数据仅供参考，投资有风险，决策需谨慎！`;

        return {
          content: [{
            type: "text",
            text: output
          }]
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `❌ 执行错误: ${error instanceof Error ? error.message : String(error)}`
      }],
      isError: true
    };
  }
});

// 启动服务器
async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("🚀 Stock MCP Server is running");
    console.error("📈 Ready to collect comprehensive A-share stock data!");
  } catch (error) {
    console.error("❌ Server error:", error);
    process.exit(1);
  }
}

main();