/**
 * Competitor Analysis Google Apps Script
 * 
 * This script reads configuration from the "Config" sheet and performs
 * competitor analysis using the configured parameters.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Apps Script project
 * 2. Copy this code into the script editor
 * 3. Create a "Config" sheet in your Google Spreadsheet
 * 4. Run the setup function to create the Config sheet structure
 * 5. The webapp will automatically populate the Config sheet
 */

// ========================================
// CONFIGURATION MANAGEMENT
// ========================================

function getConfiguration() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Config');
    if (!sheet) {
      throw new Error('Config sheet not found. Please run setup() first to create the Config sheet.');
    }
    
    const data = sheet.getDataRange().getValues();
    if (data.length < 2) {
      throw new Error('Configuration data not found in Config sheet. Please use the webapp to save your configuration.');
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
// SETUP FUNCTION
// ========================================

function setup() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Check if Config sheet already exists
    let configSheet = spreadsheet.getSheetByName('Config');
    if (!configSheet) {
      // Create Config sheet
      configSheet = spreadsheet.insertSheet('Config');
      console.log('Config sheet created successfully');
    }
    
    // Set up headers
    const headers = [
      'Brand URL',
      'Keywords', 
      'Serp API Key',
      'Reporting Period',
      'Created At',
      'Updated At'
    ];
    
    configSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Format headers
    configSheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#4285f4')
      .setFontColor('white');
    
    // Auto-resize columns
    configSheet.autoResizeColumns(1, headers.length);
    
    console.log('Setup completed successfully. Config sheet is ready for use.');
    
  } catch (error) {
    console.error('Setup failed:', error);
    throw error;
  }
}

// ========================================
// MAIN ANALYSIS FUNCTION
// ========================================

function runCompetitorAnalysis() {
  try {
    // Load configuration from Config sheet
    const config = getConfiguration();
    
    console.log('Starting competitor analysis with configuration:', config);
    
    // Extract domain from brand URL
    const brandDomain = extractDomain(config.brandUrl);
    console.log('Brand domain:', brandDomain);
    
    // Process each keyword
    config.keywords.forEach((keyword, index) => {
      console.log(`Processing keyword ${index + 1}: ${keyword}`);
      
      // Here you would add your actual competitor analysis logic
      // For example:
      // - Call SerpWow API for SERP data
      // - Analyze competitor positions
      // - Extract pricing information
      // - Save results to sheets
      
      // Placeholder for analysis logic
      analyzeKeyword(keyword, brandDomain, config.serpApiKey);
    });
    
    console.log('Competitor analysis completed successfully');
    
  } catch (error) {
    console.error('Analysis failed:', error);
    throw error;
  }
}

// ========================================
// HELPER FUNCTIONS
// ========================================

function extractDomain(url) {
  try {
    const domain = new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
    return domain.replace('www.', '');
  } catch (error) {
    console.error('Error extracting domain:', error);
    return url;
  }
}

function analyzeKeyword(keyword, brandDomain, serpApiKey) {
  // This is where you would implement your actual analysis logic
  // For now, this is a placeholder
  
  console.log(`Analyzing keyword: ${keyword}`);
  console.log(`Looking for brand domain: ${brandDomain}`);
  
  if (serpApiKey) {
    console.log('SerpWow API key provided - would call API here');
    // Example API call:
    // const serpData = callSerpWowAPI(keyword, serpApiKey);
    // processSerpData(serpData, brandDomain);
  } else {
    console.log('No SerpWow API key - using demo data or alternative method');
  }
  
  // Save results to a results sheet
  saveResults(keyword, {
    keyword: keyword,
    brandDomain: brandDomain,
    analysisDate: new Date().toISOString(),
    // Add your analysis results here
  });
}

function saveResults(keyword, results) {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let resultsSheet = spreadsheet.getSheetByName('Results');
    
    if (!resultsSheet) {
      resultsSheet = spreadsheet.insertSheet('Results');
      // Set up headers for results
      const headers = ['Keyword', 'Brand Domain', 'Analysis Date', 'Your Position', 'Competitors Found', 'Notes'];
      resultsSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      resultsSheet.getRange(1, 1, 1, headers.length)
        .setFontWeight('bold')
        .setBackground('#34a853')
        .setFontColor('white');
    }
    
    // Add results row
    const rowData = [
      results.keyword,
      results.brandDomain,
      results.analysisDate,
      results.yourPosition || 'N/A',
      results.competitorsFound || 'N/A',
      results.notes || ''
    ];
    
    resultsSheet.appendRow(rowData);
    console.log(`Results saved for keyword: ${keyword}`);
    
  } catch (error) {
    console.error('Error saving results:', error);
  }
}

// ========================================
// SCHEDULED EXECUTION
// ========================================

function createDailyTrigger() {
  // Delete existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'runCompetitorAnalysis') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  
  // Create new daily trigger
  ScriptApp.newTrigger('runCompetitorAnalysis')
    .timeBased()
    .everyDays(1)
    .atHour(9) // Run at 9 AM
    .create();
    
  console.log('Daily trigger created for competitor analysis');
}

function createWeeklyTrigger() {
  // Delete existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'runCompetitorAnalysis') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  
  // Create new weekly trigger
  ScriptApp.newTrigger('runCompetitorAnalysis')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.MONDAY)
    .atHour(9) // Run at 9 AM on Mondays
    .create();
    
  console.log('Weekly trigger created for competitor analysis');
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function testConfiguration() {
  try {
    const config = getConfiguration();
    console.log('Configuration test successful:', config);
    return config;
  } catch (error) {
    console.error('Configuration test failed:', error);
    throw error;
  }
}

function clearResults() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const resultsSheet = spreadsheet.getSheetByName('Results');
    
    if (resultsSheet) {
      // Keep headers, clear data
      const lastRow = resultsSheet.getLastRow();
      if (lastRow > 1) {
        resultsSheet.getRange(2, 1, lastRow - 1, resultsSheet.getLastColumn()).clear();
      }
      console.log('Results cleared successfully');
    } else {
      console.log('No Results sheet found');
    }
  } catch (error) {
    console.error('Error clearing results:', error);
  }
}

/**
 * USAGE INSTRUCTIONS:
 * 
 * 1. First time setup:
 *    - Run setup() to create the Config sheet
 * 
 * 2. Configure your analysis:
 *    - Use the webapp to enter your configuration
 *    - The webapp will automatically save to the Config sheet
 * 
 * 3. Run analysis:
 *    - Run runCompetitorAnalysis() to start analysis
 *    - Or set up triggers for automatic execution
 * 
 * 4. View results:
 *    - Check the Results sheet for analysis output
 *    - Use clearResults() to clear old results
 * 
 * 5. Test configuration:
 *    - Run testConfiguration() to verify setup
 */ 