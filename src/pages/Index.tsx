
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, 
  Database, 
  Activity, 
  Star, 
  Download, 
  GitBranch, 
  Clock, 
  Cpu, 
  Brain,
  Play,
  Pause,
  Settings,
  Filter,
  TrendingUp,
  Eye,
  Heart,
  ExternalLink
} from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [scrapingStatus, setScrapingStatus] = useState("idle");

  // Mock data for demonstration
  const scrapingStats = {
    totalModels: 15847,
    scrapedToday: 324,
    activeSources: 5,
    lastUpdate: "2 minutes ago",
    progress: 78
  };

  const recentModels = [
    {
      id: "meta-llama/Llama-2-70b-chat-hf",
      name: "Llama 2 70B Chat",
      type: "Language Model",
      category: "Natural Language Processing Component",
      stars: 12500,
      downloads: 890000,
      institution: "Meta",
      size: "70B parameters",
      license: "Custom License",
      description: "A 70 billion parameter language model fine-tuned for chat use cases.",
      overallScore: 92
    },
    {
      id: "openai/clip-vit-large-patch14",
      name: "CLIP ViT-Large",
      type: "Vision-Language Model",
      category: "Multimodal Component",
      stars: 8900,
      downloads: 450000,
      institution: "OpenAI",
      size: "427M parameters",
      license: "MIT",
      description: "Contrastive Language-Image Pre-training model for zero-shot image classification.",
      overallScore: 89
    },
    {
      id: "facebook/detr-resnet-50",
      name: "DETR ResNet-50",
      type: "Object Detection",
      category: "Computer Vision Component",
      stars: 5600,
      downloads: 230000,
      institution: "Facebook AI",
      size: "41M parameters",
      license: "Apache 2.0",
      description: "End-to-End Object Detection with Transformers using ResNet-50 backbone.",
      overallScore: 85
    }
  ];

  const sources = [
    { name: "Hugging Face", status: "active", models: 8924 },
    { name: "Papers With Code", status: "active", models: 3451 },
    { name: "GitHub", status: "active", models: 2876 },
    { name: "ArXiv", status: "idle", models: 567 },
    { name: "Semantic Scholar", status: "active", models: 1029 }
  ];

  const capabilities = [
    "Natural Language Processing Component",
    "Computer Vision Component", 
    "Audio Component",
    "Multimodal Component",
    "Reinforcement Learning Component",
    "Cognitive (Reasoning) Component",
    "Memory / Recall Component",
    "Attention / Focus Component"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="h-12 w-12 text-blue-600" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Model Intelligence Scraper
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive metadata collection and recommendation system for machine learning models
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Models</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{scrapingStats.totalModels.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Across all sources</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scraped Today</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{scrapingStats.scrapedToday}</div>
              <p className="text-xs text-muted-foreground">New models added</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Sources</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{scrapingStats.activeSources}</div>
              <p className="text-xs text-muted-foreground">Currently scraping</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Update</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{scrapingStats.lastUpdate}</div>
              <p className="text-xs text-muted-foreground">Data freshness</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="models">Model Browser</TabsTrigger>
            <TabsTrigger value="scraping">Scraping Jobs</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Scraping Progress */}
              <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Scraping Progress
                  </CardTitle>
                  <CardDescription>Current data collection status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>{scrapingStats.progress}%</span>
                    </div>
                    <Progress value={scrapingStats.progress} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    {sources.map((source) => (
                      <div key={source.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            source.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                          }`} />
                          <span className="text-sm font-medium">{source.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {source.models.toLocaleString()} models
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Categories */}
              <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Top Capabilities
                  </CardTitle>
                  <CardDescription>Most common model capabilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {capabilities.map((capability, index) => (
                        <div key={capability} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{capability}</span>
                          <Badge variant="secondary" className="text-xs">
                            {Math.floor(Math.random() * 5000) + 500}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Recent Models */}
            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Recently Discovered Models
                </CardTitle>
                <CardDescription>Latest high-quality models added to the database</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentModels.map((model) => (
                    <div key={model.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="space-y-1">
                          <h3 className="font-semibold text-lg">{model.name}</h3>
                          <p className="text-sm text-muted-foreground">{model.description}</p>
                        </div>
                        <Badge variant="outline" className="ml-4">
                          Score: {model.overallScore}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="secondary">{model.category}</Badge>
                        <Badge variant="outline">{model.type}</Badge>
                        <Badge variant="outline">{model.license}</Badge>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          {model.stars.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          {model.downloads.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Cpu className="h-4 w-4" />
                          {model.size}
                        </div>
                        <div className="flex items-center gap-1">
                          <GitBranch className="h-4 w-4" />
                          {model.institution}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Model Browser Tab */}
          <TabsContent value="models" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Model Browser
                </CardTitle>
                <CardDescription>Search and filter through all scraped models</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search models by name, description, or institution..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </div>
                
                <div className="text-center py-12 text-muted-foreground">
                  <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Model browser interface would be implemented here</p>
                  <p className="text-sm mt-2">Connect to your Python scraper backend to populate this view</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scraping Jobs Tab */}
          <TabsContent value="scraping" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Scraping Job Management
                </CardTitle>
                <CardDescription>Monitor and control data collection processes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 mb-6">
                  <Button className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Start Scraping
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Pause className="h-4 w-4" />
                    Pause All
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Configure
                  </Button>
                </div>

                <div className="text-center py-12 text-muted-foreground">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Scraping job management interface would be implemented here</p>
                  <p className="text-sm mt-2">Control your Python scraper processes and monitor their status</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Model Recommendations
                </CardTitle>
                <CardDescription>AI-powered model recommendations based on your requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-12 text-muted-foreground">
                  <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Recommendation engine interface would be implemented here</p>
                  <p className="text-sm mt-2">Get personalized model recommendations based on capability scores</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
