
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Code, Database, Globe, Cpu, FileText, Settings } from "lucide-react";

const ScraperStructure = () => {
  const scraperComponents = [
    {
      name: "Core Scraper Engine",
      files: ["scraper_engine.py", "rate_limiter.py", "request_handler.py"],
      description: "Main scraping logic with rate limiting and request management",
      icon: <Cpu className="h-5 w-5" />
    },
    {
      name: "Data Sources",
      files: ["huggingface_scraper.py", "paperswithcode_scraper.py", "github_api.py", "arxiv_scraper.py"],
      description: "Individual scrapers for each data source",
      icon: <Globe className="h-5 w-5" />
    },
    {
      name: "Data Models",
      files: ["model_schema.py", "database_manager.py", "data_validator.py"],
      description: "Database schema, ORM models, and data validation",
      icon: <Database className="h-5 w-5" />
    },
    {
      name: "Processing Pipeline",
      files: ["text_processor.py", "capability_classifier.py", "score_calculator.py"],
      description: "Data processing, capability inference, and scoring algorithms",
      icon: <Code className="h-5 w-5" />
    },
    {
      name: "Export & API",
      files: ["csv_exporter.py", "api_server.py", "report_generator.py"],
      description: "Data export, REST API, and reporting functionality",
      icon: <FileText className="h-5 w-5" />
    },
    {
      name: "Configuration",
      files: ["config.py", "logging_config.py", "requirements.txt"],
      description: "Configuration management and dependencies",
      icon: <Settings className="h-5 w-5" />
    }
  ];

  const keyFeatures = [
    "Async/await for concurrent scraping",
    "Respect robots.txt and rate limits",
    "Comprehensive error handling",
    "Data deduplication across sources",
    "Real-time progress tracking",
    "Configurable capability inference",
    "Multiple export formats (CSV, SQLite, JSON)",
    "RESTful API for web interface integration"
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-white/90 backdrop-blur border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-6 w-6" />
            Python Scraper Architecture
          </CardTitle>
          <CardDescription>
            Recommended structure for your AI Model Intelligence Scraper implementation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scraperComponents.map((component) => (
              <Card key={component.name} className="border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    {component.icon}
                    {component.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-muted-foreground">{component.description}</p>
                  <div className="space-y-1">
                    {component.files.map((file) => (
                      <Badge key={file} variant="outline" className="text-xs mr-1 mb-1">
                        {file}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-3">Key Implementation Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {keyFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Getting Started</h3>
            <ol className="text-sm space-y-1 list-decimal list-inside text-muted-foreground">
              <li>Set up Python environment with required packages</li>
              <li>Configure API keys for GitHub, Hugging Face, etc.</li>
              <li>Initialize database schema and tables</li>
              <li>Start with a single source scraper (e.g., Hugging Face)</li>
              <li>Implement data validation and deduplication</li>
              <li>Add scoring algorithms and capability classification</li>
              <li>Create web API endpoints for this dashboard</li>
              <li>Scale to additional data sources</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScraperStructure;
