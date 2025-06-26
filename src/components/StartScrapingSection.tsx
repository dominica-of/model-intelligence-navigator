
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface DataSource {
  id: string;
  name: string;
  is_active: boolean;
  last_scraped_at: string | null;
}

export const StartScrapingSection: React.FC = () => {
  const [selectedDataSource, setSelectedDataSource] = useState<string>('');
  const queryClient = useQueryClient();

  // Fetch available data sources
  const { data: dataSources, isLoading: isLoadingDataSources } = useQuery({
    queryKey: ['data-sources'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('data_sources')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      return data as DataSource[];
    },
  });

  // Mutation to start a scraping job
  const startScrapingMutation = useMutation({
    mutationFn: async (dataSourceId: string) => {
      const { data, error } = await supabase
        .from('scraping_jobs')
        .insert({
          data_source_id: dataSourceId,
          status: 'pending',
          total_models: 0,
          processed_models: 0,
          failed_models: 0
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      toast({
        title: "Scraping Job Started",
        description: `Successfully started scraping job for the selected data source.`
      });
      queryClient.invalidateQueries({ queryKey: ['scraping-jobs'] });
      setSelectedDataSource('');
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Failed to Start Scraping",
        description: error.message || "An error occurred while starting the scraping job."
      });
    }
  });

  const handleStartScraping = () => {
    if (!selectedDataSource) {
      toast({
        variant: "destructive",
        title: "No Data Source Selected",
        description: "Please select a data source before starting the scraping job."
      });
      return;
    }
    startScrapingMutation.mutate(selectedDataSource);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Play className="h-5 w-5" />
          Start New Scraping Job
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Select value={selectedDataSource} onValueChange={setSelectedDataSource}>
              <SelectTrigger>
                <SelectValue placeholder="Select a data source to scrape" />
              </SelectTrigger>
              <SelectContent>
                {isLoadingDataSources ? (
                  <SelectItem value="loading" disabled>Loading data sources...</SelectItem>
                ) : dataSources && dataSources.length > 0 ? (
                  dataSources.map((source) => (
                    <SelectItem key={source.id} value={source.id}>
                      {source.name}
                      {source.last_scraped_at && (
                        <span className="text-xs text-gray-500 ml-2">
                          (Last: {new Date(source.last_scraped_at).toLocaleDateString()})
                        </span>
                      )}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>No active data sources available</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={handleStartScraping}
            disabled={!selectedDataSource || startScrapingMutation.isPending}
            className="flex items-center gap-2"
          >
            {startScrapingMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            {startScrapingMutation.isPending ? 'Starting...' : 'Start Scraping'}
          </Button>
        </div>
        
        {dataSources && dataSources.length > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            <p>Available data sources: {dataSources.map(s => s.name).join(', ')}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
</SelectItem>
