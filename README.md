# Shopping Competitor Analysis

A Next.js 14 application for analyzing shopping competition and optimizing Google Ads campaigns in the Australian market.

## Features

- **Setup Analysis**: Configure your brand URL, keywords, and API keys
- **Competition Results**: View detailed competitor analysis with metrics
- **Strategic Insights**: Get actionable recommendations based on your data
- **Demo Mode**: Explore the tool with sample Australian market data
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd competitor-analysis
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
competitor-analysis/
├── app/
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main competitor analysis page
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
└── next.config.js          # Next.js configuration
```

## Usage

1. **Setup Tab**: Enter your brand URL, target keywords, and optional SerpWow API key
2. **Demo Mode**: Click "View Demo Data" to see sample Australian market analysis
3. **Results Tab**: View detailed competitor analysis and metrics
4. **Insights Tab**: Get strategic recommendations and actionable insights

## API Integration

The app is designed to integrate with:
- **Google Ads API** for shopping campaign data
- **SerpWow API** for SERP analysis (optional)

Currently uses demo data - replace the API calls in `analyzeCompetition()` function with actual integrations.

## Customization

- Modify the demo data in the `loadDemoData()` function
- Update styling using Tailwind CSS classes
- Add new analysis metrics in the `MetricCard` component
- Extend competitor analysis with additional data sources

## Deployment

Build the application for production:

```bash
npm run build
npm start
```

## License

MIT License - feel free to use this project for your own competitor analysis needs. 