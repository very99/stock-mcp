# Stock MCP Server

[English](#english) | [中文](#中文)

---

## English

A comprehensive MCP (Model Context Protocol) server for Chinese A-share stock data collection and analysis. Designed to provide AI models with rich, real-time financial data for investment analysis.

### ✨ Features

- **📊 Real-time Stock Data**: Live quotes, price changes, volume, and trading metrics
- **📈 Technical Analysis**: Moving averages (MA5/10/20), RSI, volume ratios
- **📰 News & Sentiment**: Stock-related news collection and sentiment analysis
- **🏭 Market Overview**: Major indices, market sentiment, industry sectors
- **💰 Money Flow**: Capital flow analysis including northbound funds
- **🔍 Comprehensive Analysis**: All-in-one stock analysis combining multiple data sources

### 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/very99/stock-mcp.git
   cd stock-mcp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Configure your MCP client**
   
   **For Amazon Q CLI** (`~/.aws/amazonq/mcp.json`):
   ```json
   {
     "mcpServers": {
       "stock": {
         "command": "node",
         "args": ["/path/to/stock-mcp/dist/index.js"],
         "timeout": 30000
       }
     }
   }
   ```

### 🛠️ Available Tools

#### `get_stock_data`
Get real-time stock quotes and technical indicators
```
Parameters:
- symbol: Stock code (e.g., "600519", "000858")
- include_technical: Include technical indicators (default: true)
```

#### `get_stock_news`
Collect stock-related news and sentiment analysis
```
Parameters:
- symbol: Stock code
- stock_name: Stock name for news search
```

#### `get_market_overview`
Get market overview including major indices and sentiment
```
Parameters:
- include_money_flow: Include capital flow data (default: true)
```

#### `comprehensive_analysis`
Complete stock analysis combining all data sources
```
Parameters:
- symbol: Stock code
- stock_name: Stock name
```

### 📖 Usage Examples

```
# Get real-time data for Kweichow Moutai
User: "Get stock data for 600519"
AI: Returns real-time price, technical indicators, and trading metrics

# Comprehensive analysis
User: "Analyze BYD stock comprehensively"  
AI: Returns real-time data + technical analysis + news sentiment + market environment
```

### 🔧 Data Sources

- **Sina Finance API**: Real-time quotes and historical data
- **Tencent Finance API**: Backup data source for reliability
- **News Aggregation**: Multi-source news collection and sentiment analysis

### 🌟 Key Advantages

- **🚀 High Reliability**: Multiple data sources with automatic fallback
- **📊 Rich Data**: Comprehensive coverage of stock, market, and news data
- **🔄 Real-time**: Live data updates for timely investment decisions
- **🧠 AI-Ready**: Structured data perfect for AI model analysis
- **🇨🇳 China Focus**: Specialized for Chinese A-share market

---

## 中文

一个用于中国A股数据收集和分析的综合性 MCP 服务器。专为AI模型提供丰富的实时金融数据，支持投资分析决策。

### ✨ 核心功能

- **📊 实时股票数据**: 实时行情、价格变动、成交量等交易指标
- **📈 技术分析**: 移动均线(MA5/10/20)、RSI、量比等技术指标
- **📰 新闻舆情**: 股票相关新闻收集和情绪分析
- **🏭 市场概况**: 主要指数、市场情绪、行业板块分析
- **💰 资金流向**: 包括北向资金在内的资金流向分析
- **🔍 综合分析**: 整合多数据源的一站式股票分析

### 🚀 快速开始

1. **克隆仓库**
   ```bash
   git clone https://github.com/very99/stock-mcp.git
   cd stock-mcp
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **构建项目**
   ```bash
   npm run build
   ```

### 📖 使用示例

```
# 获取贵州茅台实时数据
用户: "获取600519的股票数据"
AI: 返回实时价格、技术指标和交易指标

# 综合分析
用户: "全面分析比亚迪股票"
AI: 返回实时数据+技术分析+新闻情绪+市场环境
```

### ⚠️ 免责声明

本工具仅供学习和研究使用，所提供的数据和分析结果仅供参考，不构成投资建议。投资有风险，决策需谨慎。

---

## License

MIT License - see [LICENSE](LICENSE) file for details.