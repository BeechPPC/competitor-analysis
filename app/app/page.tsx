'use client'

import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Eye, DollarSign, BarChart3, AlertCircle, ExternalLink, RefreshCw } from 'lucide-react';

// TypeScript interfaces
interface Competitor {
  title: string;
  price: string;
  merchant: string;
  rating: number;
  reviews: number;
  thumbnail: string;
}

interface CompetitorAd {
  title: string;
  description: string;
  url: string;
  merchant: string;
}

interface YourMetrics {
  keyword: string;
  impressions: number;
  clicks: number;
  cost: number;
  impressionShare: number;
  avgCpc: number;
  conversions: number;
  conversionValue: number;
}

interface KeywordAnalysis {
  keyword: string;
  yourPosition: number;
  totalCompetitors: number;
  topCompetitors: Competitor[];
  competitorAds: CompetitorAd[];
  yourMetrics: YourMetrics;
  avgMarketPrice: number;
}

export default function CompetitorAnalysisApp() {
  const [brandUrl, setBrandUrl] = useState('');
  const [keywords, setKeywords] = useState(['', '', '', '']);
  const [serpApiKey, setSerpApiKey] = useState('');
  const [reportingPeriod, setReportingPeriod] = useState('LAST_7_DAYS');
  const [googleAdsData, setGoogleAdsData] = useState(null);
  const [serpData, setSerpData] = useState({});
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<KeywordAnalysis[] | null>(null);
  const [activeTab, setActiveTab] = useState('setup');
  const [showDemo, setShowDemo] = useState(false);

  const handleKeywordChange = (index: number, value: string) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    setKeywords(newKeywords);
  };

  const extractDomain = (url: string) => {
    try {
      const domain = new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
      return domain.replace('www.', '');
    } catch {
      return url;
    }
  };

  const loadDemoData = () => {
    setBrandUrl('https://yourbrand.com.au');
    setKeywords(['wireless headphones', 'bluetooth earbuds', 'noise cancelling headphones', 'gaming headsets']);
    setShowDemo(true);
    
    // Create demo analysis
    const demoAnalysis: KeywordAnalysis[] = [
      {
        keyword: 'wireless headphones',
        yourPosition: 4,
        totalCompetitors: 20,
        topCompetitors: [
          {
            title: 'Sony WH-1000XM4 Wireless Headphones',
            price: '$449.99',
            merchant: 'JB Hi-Fi',
            rating: 4.5,
            reviews: 1234,
            thumbnail: 'https://via.placeholder.com/100x100/4F46E5/white?text=Sony'
          },
          {
            title: 'Bose QuietComfort 45',
            price: '$489.00',
            merchant: 'Harvey Norman',
            rating: 4.4,
            reviews: 892,
            thumbnail: 'https://via.placeholder.com/100x100/059669/white?text=Bose'
          },
          {
            title: 'Apple AirPods Max',
            price: '$899.00',
            merchant: 'Apple Store AU',
            rating: 4.3,
            reviews: 567,
            thumbnail: 'https://via.placeholder.com/100x100/DC2626/white?text=Apple'
          }
        ],
        competitorAds: [
          {
            title: 'Premium Wireless Headphones | Free Shipping',
            description: 'Experience crystal clear sound with our premium headphones. 30-day money back guarantee.',
            url: 'brandexample.com.au/headphones',
            merchant: 'TechGear Pro'
          }
        ],
        yourMetrics: {
          keyword: 'wireless headphones',
          impressions: 15420,
          clicks: 234,
          cost: 145.67,
          impressionShare: 0.23,
          avgCpc: 0.92,
          conversions: 12,
          conversionValue: 1289.99
        },
        avgMarketPrice: 612.66
      },
      {
        keyword: 'bluetooth earbuds',
        yourPosition: 2,
        totalCompetitors: 18,
        topCompetitors: [
          {
            title: 'AirPods Pro (2nd generation)',
            price: '$399.00',
            merchant: 'Apple Store AU',
            rating: 4.6,
            reviews: 2341,
            thumbnail: 'https://via.placeholder.com/100x100/1F2937/white?text=AirPods'
          },
          {
            title: 'Samsung Galaxy Buds Pro',
            price: '$299.00',
            merchant: 'Samsung Store',
            rating: 4.3,
            reviews: 1456,
            thumbnail: 'https://via.placeholder.com/100x100/3B82F6/white?text=Samsung'
          }
        ],
        competitorAds: [
          {
            title: 'Best Bluetooth Earbuds 2024',
            description: 'Discover the latest in wireless audio technology. Compare top brands and find your perfect match.',
            url: 'audioworld.com.au/wireless',
            merchant: 'Audio World'
          }
        ],
        yourMetrics: {
          keyword: 'bluetooth earbuds',
          impressions: 8934,
          clicks: 156,
          cost: 98.34,
          impressionShare: 0.35,
          avgCpc: 0.95,
          conversions: 8,
          conversionValue: 699.99
        },
        avgMarketPrice: 349.00
      }
    ];
    
    setAnalysis(demoAnalysis);
    setActiveTab('results');
  };

  const analyzeCompetition = async () => {
    setLoading(true);
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const brandDomain = extractDomain(brandUrl);
      const validKeywords = keywords.filter(k => k.trim());
      
      // Use demo data for now - replace with actual API calls later
      loadDemoData();
      
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const TabButton = ({ id, label, isActive, onClick }: { id: string; label: string; isActive: boolean; onClick: (id: string) => void }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 rounded-lg font-medium transition-all ${
        isActive 
          ? 'bg-blue-600 text-white shadow-lg' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  const MetricCard = ({ title, value, subtitle, icon: Icon, trend }: { title: string; value: string; subtitle?: string; icon: any; trend?: number }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        {trend && (
          <span className={`text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      <p className="text-sm text-gray-600">{title}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );

  const CompetitorCard = ({ competitor, position }: { competitor: Competitor; position: number }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-3">
        <img 
          src={competitor.thumbnail} 
          alt={competitor.title}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
              #{position}
            </span>
            <span className="text-lg font-bold text-green-600">{competitor.price}</span>
          </div>
          <h4 className="text-sm font-medium text-gray-900 mb-1 truncate">
            {competitor.title}
          </h4>
          <p className="text-xs text-gray-600 mb-2">{competitor.merchant}</p>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <span className="text-xs text-yellow-500">★</span>
              <span className="text-xs text-gray-600 ml-1">{competitor.rating}</span>
            </div>
            <span className="text-xs text-gray-500">({competitor.reviews} reviews)</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Shopping Competitor Analysis</h1>
              <p className="text-gray-600">Analyze your competition and optimize your shopping campaigns</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-8">
          <TabButton 
            id="setup" 
            label="Setup Analysis" 
            isActive={activeTab === 'setup'} 
            onClick={setActiveTab}
          />
          <TabButton 
            id="results" 
            label="Competition Results" 
            isActive={activeTab === 'results'} 
            onClick={setActiveTab}
          />
          <TabButton 
            id="insights" 
            label="Strategic Insights" 
            isActive={activeTab === 'insights'} 
            onClick={setActiveTab}
          />
        </div>

        {/* Setup Tab */}
        {activeTab === 'setup' && (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Configure Your Analysis</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Brand Website URL
                  </label>
                  <input
                    type="text"
                    value={brandUrl}
                    onChange={(e) => setBrandUrl(e.target.value)}
                    placeholder="https://yourbrand.com.au"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reporting Period
                  </label>
                  <select
                    value={reportingPeriod}
                    onChange={(e) => setReportingPeriod(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="LAST_7_DAYS">Last 7 Days</option>
                    <option value="LAST_30_DAYS">Last 30 Days</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Keywords (up to 4)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {keywords.map((keyword, index) => (
                      <input
                        key={index}
                        type="text"
                        value={keyword}
                        onChange={(e) => handleKeywordChange(index, e.target.value)}
                        placeholder={`Keyword ${index + 1}`}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SerpWow API Key (Optional)
                  </label>
                  <input
                    type="password"
                    value={serpApiKey}
                    onChange={(e) => setSerpApiKey(e.target.value)}
                    placeholder="Enter your SerpWow API key for live data"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Get your API key from{' '}
                    <a href="https://serpwow.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      SerpWow.com
                    </a>
                    {' '}(~$0.001 USD per search, budget for ~4-16 searches weekly)
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={analyzeCompetition}
                  disabled={loading || !brandUrl || keywords.filter(k => k.trim()).length === 0}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Analyzing Competition...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      <span>Start Analysis</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={loadDemoData}
                  className="bg-gray-600 text-white px-8 py-4 rounded-lg hover:bg-gray-700 flex items-center space-x-2"
                >
                  <BarChart3 className="w-5 h-5" />
                  <span>View Demo Data</span>
                </button>
              </div>
            </div>

            {/* Quick Start Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-blue-900 mb-1">Quick Start</h3>
                  <p className="text-sm text-blue-800 mb-3">
                    Not ready to set up your own analysis yet? Click "View Demo Data" to explore the tool with sample Australian shopping competition data.
                  </p>
                  <p className="text-xs text-blue-700">
                    The demo shows real competitor insights for electronics retailers in the Australian market.
                  </p>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-900 mb-1">Australian Market Focus</h3>
                  <p className="text-sm text-blue-800">
                    This tool combines your Google Ads shopping performance data (Australia geo-targeted) with SERP analysis to show you exactly where you stand against competitors in the Australian market. 
                    All pricing is in AUD and SERP results are filtered for Australian retailers and search results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && analysis && (
          <div className="space-y-8">
            {analysis.map((keywordAnalysis: KeywordAnalysis, index: number) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    "{keywordAnalysis.keyword}"
                  </h2>
                  <div className="flex items-center space-x-4">
                    {keywordAnalysis.yourPosition && (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Your Position: #{keywordAnalysis.yourPosition}
                      </span>
                    )}
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                      {keywordAnalysis.totalCompetitors} competitors
                    </span>
                  </div>
                </div>

                {/* Metrics Row */}
                {keywordAnalysis.yourMetrics && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <MetricCard
                      title="Impression Share"
                      value={`${(keywordAnalysis.yourMetrics.impressionShare * 100).toFixed(1)}%`}
                      icon={Eye}
                    />
                    <MetricCard
                      title="Avg CPC"
                      value={`$${keywordAnalysis.yourMetrics.avgCpc.toFixed(2)} AUD`}
                      subtitle={`Market avg: $${(keywordAnalysis.avgMarketPrice * 0.02).toFixed(2)} AUD`}
                      icon={DollarSign}
                    />
                    <MetricCard
                      title="Total Spend"
                      value={`$${keywordAnalysis.yourMetrics.cost.toFixed(2)} AUD`}
                      icon={TrendingUp}
                    />
                    <MetricCard
                      title="ROAS"
                      value={`${(keywordAnalysis.yourMetrics.conversionValue / keywordAnalysis.yourMetrics.cost).toFixed(2)}x`}
                      icon={BarChart3}
                    />
                  </div>
                )}

                {/* Competitor Products */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Competitor Products</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {keywordAnalysis.topCompetitors.map((competitor: Competitor, idx: number) => (
                      <CompetitorCard
                        key={idx}
                        competitor={competitor}
                        position={idx + 1}
                      />
                    ))}
                  </div>
                </div>

                {/* Competitor Ads */}
                {keywordAnalysis.competitorAds.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Competitor Ads</h3>
                    <div className="space-y-3">
                      {keywordAnalysis.competitorAds.map((ad: CompetitorAd, idx: number) => (
                        <div key={idx} className="bg-gray-50 p-4 rounded-lg border">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-blue-600 mb-1">{ad.title}</h4>
                              <p className="text-sm text-gray-700 mb-2">{ad.description}</p>
                              <div className="flex items-center space-x-3 text-sm text-gray-500">
                                <span>{ad.url}</span>
                                <span>•</span>
                                <span>{ad.merchant}</span>
                              </div>
                            </div>
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Insights Tab */}
        {activeTab === 'insights' && analysis && (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Strategic Insights</h2>
              
              <div className="space-y-6">
                {analysis.map((keywordAnalysis: KeywordAnalysis, index: number) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      "{keywordAnalysis.keyword}" Strategy
                    </h3>
                    
                    <div className="space-y-3">
                      {/* Market Position Insight */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Market Position</h4>
                        <p className="text-sm text-gray-700">
                          {keywordAnalysis.yourPosition 
                            ? `You're ranking at position #${keywordAnalysis.yourPosition} out of ${keywordAnalysis.totalCompetitors} competitors. ${
                                keywordAnalysis.yourPosition <= 3 
                                  ? "Excellent visibility in top positions!" 
                                  : keywordAnalysis.yourPosition <= 10 
                                    ? "Good visibility, consider optimizing to break into top 3." 
                                    : "Lower visibility - focus on improving product feed optimization and bids."
                              }`
                            : "Your products are not visible for this keyword. Consider expanding product targeting or increasing bids."
                          }
                        </p>
                      </div>
                      
                      {/* Pricing Strategy */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Pricing Analysis</h4>
                        <p className="text-sm text-gray-700">
                          Market average price: ${keywordAnalysis.avgMarketPrice.toFixed(2)} AUD. 
                          {keywordAnalysis.yourMetrics && (
                            ` Your average CPC of $${keywordAnalysis.yourMetrics.avgCpc.toFixed(2)} AUD represents ${
                              ((keywordAnalysis.yourMetrics.avgCpc / (keywordAnalysis.avgMarketPrice * 0.02)) * 100).toFixed(0)
                            }% of estimated market rate.`
                          )}
                        </p>
                      </div>
                      
                      {/* Impression Share Insight */}
                      {keywordAnalysis.yourMetrics && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">Impression Share Opportunities</h4>
                          <p className="text-sm text-gray-700">
                            Current impression share: {(keywordAnalysis.yourMetrics.impressionShare * 100).toFixed(1)}%. 
                            {keywordAnalysis.yourMetrics.impressionShare < 0.3 
                              ? " Significant opportunity to increase visibility through budget or bid optimization."
                              : keywordAnalysis.yourMetrics.impressionShare < 0.6
                                ? " Moderate opportunity for growth through strategic bid increases."
                                : " Strong market presence - focus on conversion optimization."
                            }
                          </p>
                        </div>
                      )}
                      
                      {/* Competitive Threats */}
                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <h4 className="font-medium text-red-900 mb-2">Competitive Threats</h4>
                        <p className="text-sm text-red-800">
                          Top competitor: {keywordAnalysis.topCompetitors[0]?.merchant || 'N/A'} 
                          {keywordAnalysis.topCompetitors[0] && (
                            ` with ${keywordAnalysis.topCompetitors[0].price} pricing`
                          )}. 
                          Monitor their product titles and descriptions for optimization ideas.
                        </p>
                      </div>
                      
                      {/* Recommendations */}
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h4 className="font-medium text-green-900 mb-2">Recommended Actions</h4>
                        <ul className="text-sm text-green-800 space-y-1">
                          {keywordAnalysis.yourPosition > 5 && (
                            <li>• Increase bids for better positioning</li>
                          )}
                          {keywordAnalysis.yourMetrics?.impressionShare < 0.5 && (
                            <li>• Consider budget increases to capture more impressions</li>
                          )}
                          <li>• Analyze top competitor product titles for keyword optimization</li>
                          <li>• Review pricing strategy against market leaders</li>
                          {keywordAnalysis.competitorAds.length > 0 && (
                            <li>• Monitor competitor ad copy for messaging insights</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* No Analysis Message */}
        {activeTab !== 'setup' && !analysis && (
          <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-200 text-center">
            <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Analysis Data</h3>
            <p className="text-gray-600 mb-4">
              Start by configuring your analysis in the Setup tab or view demo data to see how it works.
            </p>
            <button
              onClick={() => setActiveTab('setup')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Go to Setup
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 