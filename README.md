# Stock MCP Server - Enhanced

[English](#english) | [中文](#中文)

---

## English

A comprehensive MCP (Model Context Protocol) server for Chinese A-share stock data collection and analysis. **Enhanced with multi-source data verification and professional financial analysis.**

### ✨ Enhanced Features

- **📊 Multi-Source Real-time Data**: Cross-verified data from Sina, Tencent, and Eastmoney APIs
- **📈 Professional Technical Analysis**: MA5/10/20/60, RSI, MACD, Volume Ratio, Turnover Rate
- **📋 Historical Data Analysis**: 60+ days of historical data with trend and volatility analysis
- **📰 Real News Collection**: Multi-source news aggregation with sentiment analysis
- **🔍 Comprehensive Analysis**: All-in-one stock analysis combining multiple data sources
- **🌐 Data Quality Assurance**: Multi-source verification with automatic fallback

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
Get real-time stock quotes with multi-source verification
```
Parameters:
- symbol: Stock code (e.g., "600519", "000858")
- include_technical: Include technical indicators (default: true)

Returns: Real-time price, technical indicators, data source verification
```

#### `get_historical_data` ⭐ NEW
Get historical data with professional trend analysis
```
Parameters:
- symbol: Stock code
- days: Historical data days (default: 60)
- include_analysis: Include trend analysis (default: true)

Returns: Historical prices, trend analysis, volatility assessment, risk level
```

#### `get_stock_news`
Collect real stock news with sentiment analysis
```
Parameters:
- symbol: Stock code
- stock_name: Stock name for news search

Returns: Latest news, sentiment analysis, source verification
```

#### `get_market_overview`
Get market overview with major indices
```
Parameters:
- include_money_flow: Include capital flow data (default: true)

Returns: Major indices, market sentiment, money flow analysis
```

#### `comprehensive_analysis`
Complete stock analysis with all data sources
```
Parameters:
- symbol: Stock code
- stock_name: Stock name

Returns: Real-time + technical + news + market environment analysis
```

### 📖 Usage Examples

```
# Multi-source verified real-time data
User: "Get stock data for 600519"
AI: Returns price from 3 verified sources + professional technical indicators

# Historical trend analysis
User: "Get 60-day historical data for 600519 with analysis"
AI: Returns trend analysis, volatility assessment, risk level evaluation

# Comprehensive investment analysis
User: "Comprehensive analysis of Kweichow Moutai"
AI: Returns complete analysis combining all data sources for investment decision
```

### 🔧 Enhanced Data Sources

- **Sina Finance API**: Primary real-time and historical data (GBK encoding handled)
- **Tencent Finance API**: Secondary verification source
- **Eastmoney API**: Enhanced data with additional metrics
- **Multi-source News**: Aggregated financial news with sentiment analysis

### 🌟 Key Enhancements

- **🚀 Multi-Source Verification**: Cross-validates data from 3+ sources
- **📊 Professional Analysis**: Volatility, trend analysis, risk assessment
- **🔄 Real Historical Data**: 60+ days of actual trading data
- **🧠 AI-Ready Output**: Structured data perfect for AI investment analysis
- **🇨🇳 China Market Focus**: Specialized for A-share market with proper encoding

### 📊 Technical Indicators

- **Moving Averages**: MA5, MA10, MA20, MA60
- **Momentum**: RSI (14-period) with overbought/oversold signals
- **MACD**: DIF, DEA, MACD histogram
- **Volume**: Volume ratio and turnover rate
- **Risk Metrics**: Annualized volatility and risk level assessment

---

## 中文

一个用于中国A股数据收集和分析的综合性 MCP 服务器。**增强版具备多源数据验证和专业金融分析功能。**

### ✨ 增强功能

- **📊 多源实时数据**: 新浪、腾讯、东方财富API交叉验证
- **📈 专业技术分析**: MA5/10/20/60、RSI、MACD、量比、换手率
- **📋 历史数据分析**: 60+天历史数据，趋势和波动率分析
- **📰 真实新闻收集**: 多源新闻聚合，情绪分析
- **🔍 综合分析**: 整合多数据源的一站式股票分析
- **🌐 数据质量保证**: 多源验证，自动切换备用源

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

### 🛠️ 可用工具

#### `get_stock_data`
获取多源验证的实时股票数据
```
参数:
- symbol: 股票代码 (如 "600519", "000858")
- include_technical: 是否包含技术指标 (默认: true)

返回: 实时价格、技术指标、数据源验证信息
```

#### `get_historical_data` ⭐ 新功能
获取历史数据和专业趋势分析
```
参数:
- symbol: 股票代码
- days: 历史数据天数 (默认: 60天)
- include_analysis: 是否包含趋势分析 (默认: true)

返回: 历史价格、趋势分析、波动率评估、风险等级
```

#### `comprehensive_analysis`
综合分析，整合所有数据源
```
参数:
- symbol: 股票代码
- stock_name: 股票名称

返回: 实时+技术+新闻+市场环境的完整分析
```

### 📖 使用示例

```
# 多源验证的实时数据
用户: "获取600519的股票数据"
AI: 返回3个数据源验证的价格 + 专业技术指标

# 历史趋势分析
用户: "获取600519的60天历史数据和分析"
AI: 返回趋势分析、波动率评估、风险等级评价

# 综合投资分析
用户: "全面分析贵州茅台"
AI: 返回整合所有数据源的完整投资分析
```

### 🔧 增强数据源

- **新浪财经API**: 主要实时和历史数据源（已处理GBK编码）
- **腾讯财经API**: 二级验证数据源
- **东方财富API**: 增强数据，提供额外指标
- **多源新闻**: 聚合财经新闻，情绪分析

### 🌟 核心增强

- **🚀 多源验证**: 3+数据源交叉验证
- **📊 专业分析**: 波动率、趋势分析、风险评估
- **🔄 真实历史数据**: 60+天实际交易数据
- **🧠 AI友好输出**: 完美适配AI投资分析的结构化数据
- **🇨🇳 A股专业**: 专门针对A股市场，正确处理中文编码

### ⚠️ 免责声明

本工具仅供学习和研究使用，所提供的数据和分析结果仅供参考，不构成投资建议。投资有风险，决策需谨慎。

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](LICENSE) file for details.