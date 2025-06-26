
-- Create enum types for better data integrity
CREATE TYPE public.model_type AS ENUM (
  'language_model',
  'vision_model',
  'multimodal_model',
  'audio_model',
  'reinforcement_learning',
  'other'
);

CREATE TYPE public.license_type AS ENUM (
  'mit',
  'apache_2_0',
  'gpl_3_0',
  'bsd_3_clause',
  'custom',
  'proprietary',
  'unknown'
);

CREATE TYPE public.capability_category AS ENUM (
  'natural_language_processing',
  'computer_vision',
  'audio_processing',
  'multimodal',
  'reinforcement_learning',
  'cognitive_reasoning',
  'memory_recall',
  'attention_focus'
);

CREATE TYPE public.scraping_status AS ENUM (
  'pending',
  'in_progress',
  'completed',
  'failed',
  'paused'
);

-- Create institutions table
CREATE TABLE public.institutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  website TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create data sources table
CREATE TABLE public.data_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  base_url TEXT NOT NULL,
  api_endpoint TEXT,
  rate_limit_per_minute INTEGER DEFAULT 60,
  is_active BOOLEAN DEFAULT true,
  last_scraped_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create main models table
CREATE TABLE public.models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id TEXT NOT NULL, -- The ID from the source (e.g., Hugging Face model ID)
  name TEXT NOT NULL,
  display_name TEXT,
  description TEXT,
  model_type model_type NOT NULL,
  license license_type DEFAULT 'unknown',
  institution_id UUID REFERENCES public.institutions(id),
  data_source_id UUID REFERENCES public.data_sources(id) NOT NULL,
  
  -- Metrics
  stars INTEGER DEFAULT 0,
  downloads INTEGER DEFAULT 0,
  forks INTEGER DEFAULT 0,
  
  -- Model details
  parameter_count BIGINT,
  model_size_gb DECIMAL(10,2),
  architecture TEXT,
  training_dataset TEXT,
  
  -- URLs and references
  source_url TEXT NOT NULL,
  paper_url TEXT,
  demo_url TEXT,
  documentation_url TEXT,
  
  -- Scoring
  overall_score INTEGER DEFAULT 0 CHECK (overall_score >= 0 AND overall_score <= 100),
  popularity_score INTEGER DEFAULT 0 CHECK (popularity_score >= 0 AND popularity_score <= 100),
  quality_score INTEGER DEFAULT 0 CHECK (quality_score >= 0 AND quality_score <= 100),
  recency_score INTEGER DEFAULT 0 CHECK (recency_score >= 0 AND recency_score <= 100),
  
  -- Timestamps
  published_date TIMESTAMP WITH TIME ZONE,
  last_updated_at TIMESTAMP WITH TIME ZONE,
  scraped_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Ensure uniqueness per source
  UNIQUE(external_id, data_source_id)
);

-- Create model capabilities table for many-to-many relationship
CREATE TABLE public.model_capabilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID REFERENCES public.models(id) ON DELETE CASCADE NOT NULL,
  capability capability_category NOT NULL,
  confidence_score DECIMAL(3,2) DEFAULT 0.0 CHECK (confidence_score >= 0.0 AND confidence_score <= 1.0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  UNIQUE(model_id, capability)
);

-- Create model tags table for flexible tagging
CREATE TABLE public.model_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID REFERENCES public.models(id) ON DELETE CASCADE NOT NULL,
  tag TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  UNIQUE(model_id, tag)
);

-- Create scraping jobs table for tracking scraping progress
CREATE TABLE public.scraping_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data_source_id UUID REFERENCES public.data_sources(id) NOT NULL,
  status scraping_status DEFAULT 'pending',
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  total_models INTEGER DEFAULT 0,
  processed_models INTEGER DEFAULT 0,
  failed_models INTEGER DEFAULT 0,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create scraping logs table for detailed logging
CREATE TABLE public.scraping_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES public.scraping_jobs(id) ON DELETE CASCADE,
  model_id UUID REFERENCES public.models(id) ON DELETE SET NULL,
  level TEXT NOT NULL DEFAULT 'info', -- info, warning, error
  message TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create model recommendations table
CREATE TABLE public.model_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_model_id UUID REFERENCES public.models(id) ON DELETE CASCADE NOT NULL,
  recommended_model_id UUID REFERENCES public.models(id) ON DELETE CASCADE NOT NULL,
  similarity_score DECIMAL(3,2) DEFAULT 0.0 CHECK (similarity_score >= 0.0 AND similarity_score <= 1.0),
  recommendation_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  UNIQUE(source_model_id, recommended_model_id)
);

-- Insert initial data sources
INSERT INTO public.data_sources (name, base_url, api_endpoint, rate_limit_per_minute) VALUES
  ('Hugging Face', 'https://huggingface.co', 'https://huggingface.co/api', 100),
  ('Papers with Code', 'https://paperswithcode.com', 'https://paperswithcode.com/api/v1', 60),
  ('GitHub', 'https://github.com', 'https://api.github.com', 5000),
  ('ArXiv', 'https://arxiv.org', 'http://export.arxiv.org/api', 30),
  ('Semantic Scholar', 'https://www.semanticscholar.org', 'https://api.semanticscholar.org/graph/v1', 100);

-- Insert some sample institutions
INSERT INTO public.institutions (name, website, description) VALUES
  ('Meta AI', 'https://ai.facebook.com', 'Meta AI research division'),
  ('OpenAI', 'https://openai.com', 'AI research and deployment company'),
  ('Google Research', 'https://research.google', 'Google AI research division'),
  ('Microsoft Research', 'https://www.microsoft.com/en-us/research', 'Microsoft research division'),
  ('Anthropic', 'https://www.anthropic.com', 'AI safety company'),
  ('Stanford University', 'https://stanford.edu', 'Stanford University AI research'),
  ('MIT', 'https://mit.edu', 'Massachusetts Institute of Technology'),
  ('Carnegie Mellon University', 'https://cmu.edu', 'Carnegie Mellon University AI research');

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.model_capabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.model_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scraping_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scraping_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.model_recommendations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (allowing public read access for now, restrict as needed)
CREATE POLICY "Allow public read access" ON public.institutions FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.data_sources FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.models FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.model_capabilities FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.model_tags FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.scraping_jobs FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.scraping_logs FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.model_recommendations FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX idx_models_data_source_id ON public.models(data_source_id);
CREATE INDEX idx_models_institution_id ON public.models(institution_id);
CREATE INDEX idx_models_model_type ON public.models(model_type);
CREATE INDEX idx_models_overall_score ON public.models(overall_score DESC);
CREATE INDEX idx_models_stars ON public.models(stars DESC);
CREATE INDEX idx_models_downloads ON public.models(downloads DESC);
CREATE INDEX idx_models_scraped_at ON public.models(scraped_at DESC);
CREATE INDEX idx_model_capabilities_capability ON public.model_capabilities(capability);
CREATE INDEX idx_model_tags_tag ON public.model_tags(tag);
CREATE INDEX idx_scraping_jobs_status ON public.scraping_jobs(status);
CREATE INDEX idx_scraping_logs_job_id ON public.scraping_logs(job_id);
CREATE INDEX idx_scraping_logs_created_at ON public.scraping_logs(created_at DESC);

-- Enable real-time subscriptions
ALTER TABLE public.models REPLICA IDENTITY FULL;
ALTER TABLE public.scraping_jobs REPLICA IDENTITY FULL;
ALTER TABLE public.scraping_logs REPLICA IDENTITY FULL;
ALTER TABLE public.model_capabilities REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.models;
ALTER PUBLICATION supabase_realtime ADD TABLE public.scraping_jobs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.scraping_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.model_capabilities;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_institutions_updated_at BEFORE UPDATE ON public.institutions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_data_sources_updated_at BEFORE UPDATE ON public.data_sources FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_models_updated_at BEFORE UPDATE ON public.models FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_scraping_jobs_updated_at BEFORE UPDATE ON public.scraping_jobs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
