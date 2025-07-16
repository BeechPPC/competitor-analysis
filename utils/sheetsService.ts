// Google Sheets Configuration Service
// Handles writing and reading user configuration to/from Google Sheets

export interface UserConfiguration {
  brandUrl: string;
  keywords: string[];
  serpApiKey?: string;
  reportingPeriod: string;
  createdAt: string;
  updatedAt: string;
}

export interface SheetsConfig {
  spreadsheetId: string;
  configSheetName: string;
  apiKey: string;
}

class SheetsService {
  private config: SheetsConfig;

  constructor(config: SheetsConfig) {
    this.config = config;
  }

  /**
   * Save user configuration to Google Sheets
   */
  async saveConfiguration(userConfig: Omit<UserConfiguration, 'createdAt' | 'updatedAt'>): Promise<boolean> {
    try {
      const timestamp = new Date().toISOString();
      const configWithTimestamps: UserConfiguration = {
        ...userConfig,
        createdAt: timestamp,
        updatedAt: timestamp
      };

      // Prepare the data for Google Sheets
      const values = [
        ['Brand URL', 'Keywords', 'Serp API Key', 'Reporting Period', 'Created At', 'Updated At'],
        [
          configWithTimestamps.brandUrl,
          configWithTimestamps.keywords.join(', '),
          configWithTimestamps.serpApiKey || '',
          configWithTimestamps.reportingPeriod,
          configWithTimestamps.createdAt,
          configWithTimestamps.updatedAt
        ]
      ];

      // Clear existing data and write new configuration
      await this.clearConfigSheet();
      await this.writeToSheet(values);

      console.log('Configuration saved successfully to Google Sheets');
      return true;
    } catch (error) {
      console.error('Error saving configuration to Google Sheets:', error);
      throw new Error('Failed to save configuration to Google Sheets');
    }
  }

  /**
   * Read configuration from Google Sheets
   */
  async readConfiguration(): Promise<UserConfiguration | null> {
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}/values/${this.config.configSheetName}?key=${this.config.apiKey}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.values || data.values.length < 2) {
        return null; // No configuration found
      }

      // Parse the configuration from the sheet
      const configRow = data.values[1]; // Second row contains the actual config
      const headerRow = data.values[0]; // First row contains headers

      const config: UserConfiguration = {
        brandUrl: configRow[0] || '',
        keywords: configRow[1] ? configRow[1].split(',').map((k: string) => k.trim()).filter(Boolean) : [],
        serpApiKey: configRow[2] || undefined,
        reportingPeriod: configRow[3] || 'LAST_7_DAYS',
        createdAt: configRow[4] || '',
        updatedAt: configRow[5] || ''
      };

      return config;
    } catch (error) {
      console.error('Error reading configuration from Google Sheets:', error);
      throw new Error('Failed to read configuration from Google Sheets');
    }
  }

  /**
   * Update existing configuration
   */
  async updateConfiguration(userConfig: Partial<UserConfiguration>): Promise<boolean> {
    try {
      const existingConfig = await this.readConfiguration();
      if (!existingConfig) {
        throw new Error('No existing configuration found to update');
      }

      const updatedConfig: UserConfiguration = {
        ...existingConfig,
        ...userConfig,
        updatedAt: new Date().toISOString()
      };

      return await this.saveConfiguration(updatedConfig);
    } catch (error) {
      console.error('Error updating configuration:', error);
      throw new Error('Failed to update configuration');
    }
  }

  /**
   * Clear the configuration sheet
   */
  private async clearConfigSheet(): Promise<void> {
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}/values/${this.config.configSheetName}:clear`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({})
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error clearing config sheet:', error);
      throw new Error('Failed to clear configuration sheet');
    }
  }

  /**
   * Write data to the configuration sheet
   */
  private async writeToSheet(values: string[][]): Promise<void> {
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}/values/${this.config.configSheetName}?valueInputOption=RAW&key=${this.config.apiKey}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values: values
          })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error writing to sheet:', error);
      throw new Error('Failed to write configuration to sheet');
    }
  }

  /**
   * Validate configuration data
   */
  validateConfiguration(config: Partial<UserConfiguration>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!config.brandUrl || config.brandUrl.trim() === '') {
      errors.push('Brand URL is required');
    }

    if (!config.keywords || config.keywords.length === 0) {
      errors.push('At least one keyword is required');
    }

    if (config.keywords && config.keywords.some(k => k.trim() === '')) {
      errors.push('Keywords cannot be empty');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Create and export a singleton instance
let sheetsServiceInstance: SheetsService | null = null;

export function getSheetsService(): SheetsService {
  if (!sheetsServiceInstance) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;
    if (!apiKey) {
      throw new Error('NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY environment variable is required');
    }

    // Default configuration - these can be customized per user
    const defaultConfig: SheetsConfig = {
      spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms', // Example spreadsheet ID
      configSheetName: 'Config',
      apiKey: apiKey
    };

    sheetsServiceInstance = new SheetsService(defaultConfig);
  }

  return sheetsServiceInstance;
}

export default SheetsService; 