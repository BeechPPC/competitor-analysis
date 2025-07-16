# Google Apps Script Update Guide

## Overview
This guide explains how to update your existing Google Apps Script to read configuration from the "Config" sheet instead of using hard-coded values.

## What Changed
- **Before**: Users manually edited the script with their configuration
- **After**: Script automatically reads configuration from Google Sheets "Config" sheet

## Step-by-Step Update Instructions

### 1. Open Your Google Apps Script
1. Go to [script.google.com](https://script.google.com)
2. Open your existing competitor analysis script

### 2. Replace the Configuration Section
Find the section where you currently have hard-coded configuration and replace it with this dynamic version:

```javascript
// ========================================
// CONFIGURATION - Now reads from Config sheet
// ========================================

function getConfiguration() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Config');
    if (!sheet) {
      throw new Error('Config sheet not found. Please ensure the Config sheet exists.');
    }
    
    const data = sheet.getDataRange().getValues();
    if (data.length < 2) {
      throw new Error('Configuration data not found in Config sheet.');
    }
    
    // Parse configuration from sheet
    const configRow = data[1]; // Second row contains the actual config
    const headerRow = data[0]; // First row contains headers
    
    const config = {
      brandUrl: configRow[0] || '',
      keywords: configRow[1] ? configRow[1].split(',').map(k => k.trim()).filter(Boolean) : [],
      serpApiKey: configRow[2] || '',
      reportingPeriod: configRow[3] || 'LAST_7_DAYS',
      createdAt: configRow[4] || '',
      updatedAt: configRow[5] || ''
    };
    
    // Validate configuration
    if (!config.brandUrl) {
      throw new Error('Brand URL not found in configuration.');
    }
    if (config.keywords.length === 0) {
      throw new Error('No keywords found in configuration.');
    }
    
    console.log('Configuration loaded successfully:', config);
    return config;
    
  } catch (error) {
    console.error('Error loading configuration:', error);
    throw new Error(`Configuration error: ${error.message}`);
  }
}

// ========================================
// MAIN EXECUTION FUNCTION
// ========================================

function runCompetitorAnalysis() {
  try {
    // Load configuration from Config sheet
    const config = getConfiguration();
    
    console.log('Starting competitor analysis with configuration:', config);
    
    // Your existing analysis logic here, but now using config.brandUrl, config.keywords, etc.
    // Replace hard-coded values with config values:
    
    // Example:
    // const brandUrl = config.brandUrl;
    // const keywords = config.keywords;
    // const serpApiKey = config.serpApiKey;
    
    // Continue with your existing analysis code...
    
  } catch (error) {
    console.error('Analysis failed:', error);
    throw error;
  }
}
```

### 3. Update Your Main Function
Replace your existing main function calls to use the new configuration:

**Before:**
```javascript
function runAnalysis() {
  const brandUrl = 'https://yourbrand.com.au'; // Hard-coded
  const keywords = ['wireless headphones', 'bluetooth earbuds']; // Hard-coded
  const serpApiKey = 'your-api-key'; // Hard-coded
  
  // Your analysis code...
}
```

**After:**
```javascript
function runAnalysis() {
  const config = getConfiguration();
  
  const brandUrl = config.brandUrl;
  const keywords = config.keywords;
  const serpApiKey = config.serpApiKey;
  
  // Your analysis code remains the same...
}
```

### 4. Create the Config Sheet
If you don't already have a "Config" sheet, create one:

1. In your Google Spreadsheet, click the "+" button to add a new sheet
2. Name it "Config"
3. Add these headers in row 1:
   - A1: "Brand URL"
   - B1: "Keywords"
   - C1: "Serp API Key"
   - D1: "Reporting Period"
   - E1: "Created At"
   - F1: "Updated At"

### 5. Test the Configuration
1. Save your script
2. Run the `getConfiguration()` function to test
3. Check the logs to ensure configuration is loaded correctly

## Benefits of This Update

✅ **No More Manual Editing**: Users never need to edit the script again  
✅ **Automatic Updates**: Configuration changes are immediately available  
✅ **Error Handling**: Better validation and error messages  
✅ **Audit Trail**: Timestamps show when configuration was last updated  
✅ **Multi-User Support**: Different users can have different configurations  

## Troubleshooting

### "Config sheet not found" Error
- Ensure the sheet is named exactly "Config" (case-sensitive)
- Check that the sheet exists in the same spreadsheet as your script

### "Configuration data not found" Error
- Make sure the webapp has saved configuration to the sheet
- Check that row 2 contains the actual configuration data

### "Brand URL not found" Error
- Verify that the webapp has properly saved the configuration
- Check that the Brand URL field is not empty

## Migration Checklist

- [ ] Updated script to use `getConfiguration()` function
- [ ] Replaced all hard-coded values with config variables
- [ ] Created "Config" sheet with proper headers
- [ ] Tested configuration loading
- [ ] Verified error handling works
- [ ] Updated any scheduled triggers to use new function names

## Support

If you encounter issues during the update:
1. Check the script logs for detailed error messages
2. Verify the Config sheet structure matches the expected format
3. Ensure the webapp has successfully saved configuration to the sheet 