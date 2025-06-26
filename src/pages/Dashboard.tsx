import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ModelCard } from '@/components/ModelCard';
import { SearchFilters } from '@/components/SearchFilters';
import { ScrapingStatus } from '@/components/ScrapingStatus';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Model {
  id: string;
  external_id: string;
  name: string;
  display_name: string;
  description: string;
  model_type: string;
  license: string;
  stars: number;
  downloads: number;
  forks: number;
  parameter_count: number;
  model_size_gb: number;
  architecture: string;
  source_url: string;
  paper_url: string;
  demo_url: string;
  overall_score: number;
  popularity_score: number;
  quality_score: number;
  recency_score: number;
  published_date: string;
  scraped_at: string;
  institutions: { name: string } | null;
  data_sources: { name: string };
}

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modelTypeFilter, setModelTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('overall_score');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(0);
  const pageSize = 20;

  // Fetch models with filters
  const { data: modelsData, isLoading, error, refetch } = useQuery({
    queryKey: ['models', searchTerm, modelTypeFilter, sortBy, sortOrder, page],
    queryFn: async () => {
      let query = supabase
        .from('models')
        .select(`
          *,
          institutions:institution_id(name),
          data_sources:data_source_id(name)
        `)
        .range(page * pageSize, (page + 1) * pageSize - 1);

      // Apply search filter
      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,display_name.ilike.%${searchTerm}%`);
      }

      // Apply model type filter - only apply if not 'all'
      if (modelTypeFilter !== 'all') {
        query = query.eq('model_type', modelTypeFilter);
      }

      // Apply sorting
      query = query.order(sortBy, { ascending: sortOrder === 'asc' });

      const { data, error } = await query;
      if (error) throw error;
      return data as Model[];
    },
  });

  // Fetch summary statistics
  const { data: stats } = useQuery({
    queryKey: ['model-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('models')
        .select('model_type, data_source_id');

      if (error) throw error;
      
      // Get total count
      const { count: totalModels } = await supabase
        .from('models')
        .select('*', { count: 'exact', head: true });

      // Get count by type
      const typeStats = data.reduce((acc: Record<string, number>, model) => {
        acc[model.model_type] = (acc[model.model_type] || 0) + 1;
        return acc;
      }, {});

      // Get data source stats
      const { data: sourcesData } = await supabase
        .from('data_sources')
        .select('name, id');

      return {
        totalModels,
        typeStats,
        sourcesData: sourcesData || []
      };
    },
  });

  // Set up real-time subscription for model updates
  useEffect(() => {
    const channel = supabase
      .channel('model-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'models'
        },
        (payload) => {
          console.log('Model update received:', payload);
          refetch();
          toast({
            title: "Model Updated",
            description: "The model data has been updated in real-time."
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  const handleRefresh = () => {
    refetch();
    toast({
      title: "Data Refreshed",
      description: "Model data has been refreshed successfully."
    });
  };

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <p className="text-red-800">Error loading models: {error.message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Model Intelligence Dashboard</h1>
          <p className="text-gray-600 mt-1">Discover and analyze AI models from multiple sources</p>
        </div>
        <Button onClick={handleRefresh} variant="outline" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Models</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalModels?.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Language Models</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.typeStats?.language_model || 0}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Vision Models</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.typeStats?.vision_model || 0}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Multimodal Models</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.typeStats?.multimodal_model || 0}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Scraping Status */}
      <ScrapingStatus />

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search models by name, description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={modelTypeFilter} onValueChange={setModelTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Model Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="language_model">Language Model</SelectItem>
                <SelectItem value="vision_model">Vision Model</SelectItem>
                <SelectItem value="multimodal_model">Multimodal</SelectItem>
                <SelectItem value="audio_model">Audio Model</SelectItem>
                <SelectItem value="reinforcement_learning">RL Model</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overall_score">Overall Score</SelectItem>
                <SelectItem value="popularity_score">Popularity</SelectItem>
                <SelectItem value="quality_score">Quality</SelectItem>
                <SelectItem value="stars">Stars</SelectItem>
                <SelectItem value="downloads">Downloads</SelectItem>
                <SelectItem value="scraped_at">Recently Scraped</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Desc</SelectItem>
                <SelectItem value="asc">Asc</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Models Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {modelsData?.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
          
          {modelsData && modelsData.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-gray-500">No models found matching your criteria.</p>
              </CardContent>
            </Card>
          )}
          
          {/* Pagination */}
          {modelsData && modelsData.length === pageSize && (
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
