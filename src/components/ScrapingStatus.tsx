
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { PlayCircle, PauseCircle, RefreshCw, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ScrapingJob {
  id: string;
  status: string;
  started_at: string;
  completed_at: string;
  total_models: number;
  processed_models: number;
  failed_models: number;
  error_message: string;
  data_sources: { name: string };
  created_at: string;
}

export const ScrapingStatus: React.FC = () => {
  const { data: jobs, refetch } = useQuery({
    queryKey: ['scraping-jobs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('scraping_jobs')
        .select(`
          *,
          data_sources:data_source_id(name)
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data as ScrapingJob[];
    },
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  // Set up real-time subscription for job status updates
  useEffect(() => {
    const channel = supabase
      .channel('scraping-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'scraping_jobs'
        },
        (payload) => {
          console.log('Scraping job update:', payload);
          refetch();
          
          if (payload.eventType === 'UPDATE') {
            const job = payload.new as ScrapingJob;
            if (job.status === 'completed') {
              toast({
                title: "Scraping Completed",
                description: `Successfully scraped ${job.processed_models} models from ${job.data_sources?.name || 'source'}`
              });
            } else if (job.status === 'failed') {
              toast({
                variant: "destructive",
                title: "Scraping Failed",
                description: job.error_message || "An error occurred during scraping"
              });
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_progress': return <RefreshCw className="h-4 w-4 animate-spin" />;
      case 'failed': return <AlertCircle className="h-4 w-4" />;
      case 'paused': return <PauseCircle className="h-4 w-4" />;
      default: return <PlayCircle className="h-4 w-4" />;
    }
  };

  const calculateProgress = (job: ScrapingJob) => {
    if (job.total_models === 0) return 0;
    return (job.processed_models / job.total_models) * 100;
  };

  if (!jobs || jobs.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Scraping Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-4">No scraping jobs found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          Scraping Status
          <Badge variant="outline" className="ml-auto">
            {jobs.filter(job => job.status === 'in_progress').length} active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(job.status)}
                  <span className="font-medium">{job.data_sources.name}</span>
                </div>
                <Badge className={getStatusColor(job.status)}>
                  {job.status.replace('_', ' ')}
                </Badge>
              </div>
              
              {job.status === 'in_progress' && (
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{job.processed_models} / {job.total_models}</span>
                  </div>
                  <Progress value={calculateProgress(job)} className="h-2" />
                </div>
              )}
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Processed</div>
                  <div className="font-medium">{job.processed_models.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-gray-600">Failed</div>
                  <div className="font-medium text-red-600">{job.failed_models}</div>
                </div>
                <div>
                  <div className="text-gray-600">Started</div>
                  <div className="font-medium">
                    {job.started_at ? new Date(job.started_at).toLocaleString() : 'Not started'}
                  </div>
                </div>
              </div>
              
              {job.error_message && (
                <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-800">
                  {job.error_message}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
