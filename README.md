# Shopping Competitor Analysis

A Next.js 14 application for analyzing shopping competition and optimizing Google Ads campaigns in the Australian market.

## Features

- **Setup Analysis**: Configure your brand URL, keywords, and API keys
- **Competition Results**: View detailed competitor analysis with metrics
- **Strategic Insights**: Get actionable recommendations based on your data
- **Demo Mode**: Explore the tool with sample Australian market data
- **Google Sheets Integration**: Automatic configuration saving to Google Sheets
- **Dynamic Google Apps Script**: No more manual script editing
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
- Google Sheets API key (for configuration storage)

### Environment Variables

Copy the example environment file and configure your API keys:

```bash
cp env.example .env.local
```

Then edit `.env.local` and add your Google Sheets API key:

```bash
NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY=your_google_sheets_api_key_here
```

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

3. Set up Google Sheets API:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google Sheets API
   - Create credentials (API Key)
   - Add the API key to your `.env.local` file

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
competitor-analysis/
├── app/
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main competitor analysis page
├── utils/
│   └── sheetsService.ts     # Google Sheets integration service
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
├── next.config.js          # Next.js configuration
├── GOOGLE_APPS_SCRIPT_UPDATE.md  # Google Apps Script update guide
└── sample-google-apps-script.js  # Sample Google Apps Script template
```

## Usage

### Web Application
1. **Setup Tab**: Enter your brand URL, target keywords, and optional SerpWow API key
2. **Configuration Saving**: Click "Start Analysis" to automatically save configuration to Google Sheets
3. **Demo Mode**: Click "View Demo Data" to see sample Australian market analysis
4. **Results Tab**: View detailed competitor analysis and metrics
5. **Insights Tab**: Get strategic recommendations and actionable insights

### Google Apps Script Integration
1. **Setup Script**: Use the provided `sample-google-apps-script.js` template
2. **Create Config Sheet**: Run the `setup()` function to create the Config sheet
3. **Automatic Configuration**: The webapp automatically populates the Config sheet
4. **Run Analysis**: Execute `runCompetitorAnalysis()` to start analysis with your configuration
5. **Scheduled Execution**: Set up triggers for automatic daily/weekly analysis

See `GOOGLE_APPS_SCRIPT_UPDATE.md` for detailed setup instructions.

## API Integration

The app integrates with:
- **Google Sheets API** for configuration storage
- **Google Ads API** for shopping campaign data
- **SerpWow API** for SERP analysis (optional)

### Google Sheets Integration
- Automatically saves user configuration to Google Sheets
- Eliminates manual editing of Google Apps Script
- Provides audit trail with timestamps
- Supports multiple users with different configurations

### Current Status
- Google Sheets integration is fully implemented
- Demo data is used for analysis - replace API calls in `analyzeCompetition()` function with actual integrations

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