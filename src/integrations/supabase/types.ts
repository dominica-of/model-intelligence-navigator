export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      data_sources: {
        Row: {
          api_endpoint: string | null
          base_url: string
          created_at: string | null
          id: string
          is_active: boolean | null
          last_scraped_at: string | null
          name: string
          rate_limit_per_minute: number | null
          updated_at: string | null
        }
        Insert: {
          api_endpoint?: string | null
          base_url: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_scraped_at?: string | null
          name: string
          rate_limit_per_minute?: number | null
          updated_at?: string | null
        }
        Update: {
          api_endpoint?: string | null
          base_url?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_scraped_at?: string | null
          name?: string
          rate_limit_per_minute?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      institutions: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      model_capabilities: {
        Row: {
          capability: Database["public"]["Enums"]["capability_category"]
          confidence_score: number | null
          created_at: string | null
          id: string
          model_id: string
        }
        Insert: {
          capability: Database["public"]["Enums"]["capability_category"]
          confidence_score?: number | null
          created_at?: string | null
          id?: string
          model_id: string
        }
        Update: {
          capability?: Database["public"]["Enums"]["capability_category"]
          confidence_score?: number | null
          created_at?: string | null
          id?: string
          model_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "model_capabilities_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          },
        ]
      }
      model_recommendations: {
        Row: {
          created_at: string | null
          id: string
          recommendation_reason: string | null
          recommended_model_id: string
          similarity_score: number | null
          source_model_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          recommendation_reason?: string | null
          recommended_model_id: string
          similarity_score?: number | null
          source_model_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          recommendation_reason?: string | null
          recommended_model_id?: string
          similarity_score?: number | null
          source_model_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "model_recommendations_recommended_model_id_fkey"
            columns: ["recommended_model_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "model_recommendations_source_model_id_fkey"
            columns: ["source_model_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          },
        ]
      }
      model_tags: {
        Row: {
          created_at: string | null
          id: string
          model_id: string
          tag: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          model_id: string
          tag: string
        }
        Update: {
          created_at?: string | null
          id?: string
          model_id?: string
          tag?: string
        }
        Relationships: [
          {
            foreignKeyName: "model_tags_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          },
        ]
      }
      models: {
        Row: {
          architecture: string | null
          created_at: string | null
          data_source_id: string
          demo_url: string | null
          description: string | null
          display_name: string | null
          documentation_url: string | null
          downloads: number | null
          external_id: string
          forks: number | null
          id: string
          institution_id: string | null
          last_updated_at: string | null
          license: Database["public"]["Enums"]["license_type"] | null
          model_size_gb: number | null
          model_type: Database["public"]["Enums"]["model_type"]
          name: string
          overall_score: number | null
          paper_url: string | null
          parameter_count: number | null
          popularity_score: number | null
          published_date: string | null
          quality_score: number | null
          recency_score: number | null
          scraped_at: string | null
          source_url: string
          stars: number | null
          training_dataset: string | null
          updated_at: string | null
        }
        Insert: {
          architecture?: string | null
          created_at?: string | null
          data_source_id: string
          demo_url?: string | null
          description?: string | null
          display_name?: string | null
          documentation_url?: string | null
          downloads?: number | null
          external_id: string
          forks?: number | null
          id?: string
          institution_id?: string | null
          last_updated_at?: string | null
          license?: Database["public"]["Enums"]["license_type"] | null
          model_size_gb?: number | null
          model_type: Database["public"]["Enums"]["model_type"]
          name: string
          overall_score?: number | null
          paper_url?: string | null
          parameter_count?: number | null
          popularity_score?: number | null
          published_date?: string | null
          quality_score?: number | null
          recency_score?: number | null
          scraped_at?: string | null
          source_url: string
          stars?: number | null
          training_dataset?: string | null
          updated_at?: string | null
        }
        Update: {
          architecture?: string | null
          created_at?: string | null
          data_source_id?: string
          demo_url?: string | null
          description?: string | null
          display_name?: string | null
          documentation_url?: string | null
          downloads?: number | null
          external_id?: string
          forks?: number | null
          id?: string
          institution_id?: string | null
          last_updated_at?: string | null
          license?: Database["public"]["Enums"]["license_type"] | null
          model_size_gb?: number | null
          model_type?: Database["public"]["Enums"]["model_type"]
          name?: string
          overall_score?: number | null
          paper_url?: string | null
          parameter_count?: number | null
          popularity_score?: number | null
          published_date?: string | null
          quality_score?: number | null
          recency_score?: number | null
          scraped_at?: string | null
          source_url?: string
          stars?: number | null
          training_dataset?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "models_data_source_id_fkey"
            columns: ["data_source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "models_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      scraping_jobs: {
        Row: {
          completed_at: string | null
          created_at: string | null
          data_source_id: string
          error_message: string | null
          failed_models: number | null
          id: string
          processed_models: number | null
          started_at: string | null
          status: Database["public"]["Enums"]["scraping_status"] | null
          total_models: number | null
          updated_at: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          data_source_id: string
          error_message?: string | null
          failed_models?: number | null
          id?: string
          processed_models?: number | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["scraping_status"] | null
          total_models?: number | null
          updated_at?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          data_source_id?: string
          error_message?: string | null
          failed_models?: number | null
          id?: string
          processed_models?: number | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["scraping_status"] | null
          total_models?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scraping_jobs_data_source_id_fkey"
            columns: ["data_source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      scraping_logs: {
        Row: {
          created_at: string | null
          id: string
          job_id: string | null
          level: string
          message: string
          metadata: Json | null
          model_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          job_id?: string | null
          level?: string
          message: string
          metadata?: Json | null
          model_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          job_id?: string | null
          level?: string
          message?: string
          metadata?: Json | null
          model_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scraping_logs_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "scraping_jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scraping_logs_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      capability_category:
        | "natural_language_processing"
        | "computer_vision"
        | "audio_processing"
        | "multimodal"
        | "reinforcement_learning"
        | "cognitive_reasoning"
        | "memory_recall"
        | "attention_focus"
      license_type:
        | "mit"
        | "apache_2_0"
        | "gpl_3_0"
        | "bsd_3_clause"
        | "custom"
        | "proprietary"
        | "unknown"
      model_type:
        | "language_model"
        | "vision_model"
        | "multimodal_model"
        | "audio_model"
        | "reinforcement_learning"
        | "other"
      scraping_status:
        | "pending"
        | "in_progress"
        | "completed"
        | "failed"
        | "paused"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      capability_category: [
        "natural_language_processing",
        "computer_vision",
        "audio_processing",
        "multimodal",
        "reinforcement_learning",
        "cognitive_reasoning",
        "memory_recall",
        "attention_focus",
      ],
      license_type: [
        "mit",
        "apache_2_0",
        "gpl_3_0",
        "bsd_3_clause",
        "custom",
        "proprietary",
        "unknown",
      ],
      model_type: [
        "language_model",
        "vision_model",
        "multimodal_model",
        "audio_model",
        "reinforcement_learning",
        "other",
      ],
      scraping_status: [
        "pending",
        "in_progress",
        "completed",
        "failed",
        "paused",
      ],
    },
  },
} as const
