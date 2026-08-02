export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      app_versions: {
        Row: {
          apk_url: string
          created_at: string
          id: string
          mandatory: boolean
          published: boolean
          release_notes: string
          updated_at: string
          version_code: number
          version_name: string
        }
        Insert: {
          apk_url: string
          created_at?: string
          id?: string
          mandatory?: boolean
          published?: boolean
          release_notes?: string
          updated_at?: string
          version_code: number
          version_name: string
        }
        Update: {
          apk_url?: string
          created_at?: string
          id?: string
          mandatory?: boolean
          published?: boolean
          release_notes?: string
          updated_at?: string
          version_code?: number
          version_name?: string
        }
        Relationships: []
      }
      blocks: {
        Row: {
          blocked_device_id: string
          blocker_device_id: string
          created_at: string
          id: string
        }
        Insert: {
          blocked_device_id: string
          blocker_device_id: string
          created_at?: string
          id?: string
        }
        Update: {
          blocked_device_id?: string
          blocker_device_id?: string
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      community_comments: {
        Row: {
          author_name: string
          body: string
          created_at: string
          device_id: string
          id: string
          post_id: string
        }
        Insert: {
          author_name?: string
          body: string
          created_at?: string
          device_id: string
          id?: string
          post_id: string
        }
        Update: {
          author_name?: string
          body?: string
          created_at?: string
          device_id?: string
          id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_likes: {
        Row: {
          created_at: string
          device_id: string
          id: string
          post_id: string
        }
        Insert: {
          created_at?: string
          device_id: string
          id?: string
          post_id: string
        }
        Update: {
          created_at?: string
          device_id?: string
          id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_posts: {
        Row: {
          author_name: string
          created_at: string
          description: string
          device_id: string
          id: string
          media_type: string
          media_url: string | null
          steps: string[]
          title: string
          updated_at: string
        }
        Insert: {
          author_name?: string
          created_at?: string
          description?: string
          device_id: string
          id?: string
          media_type?: string
          media_url?: string | null
          steps?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          author_name?: string
          created_at?: string
          description?: string
          device_id?: string
          id?: string
          media_type?: string
          media_url?: string | null
          steps?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      dishes: {
        Row: {
          active: boolean
          created_at: string
          id: string
          image_key: string
          name_en: string
          name_hi: string
          name_ml: string
          rating: number
          slug: string
          sort_order: number
          sub_en: string
          sub_hi: string
          sub_ml: string
          tag_en: string
          tag_hi: string
          tag_kind: string
          tag_ml: string
          time_label: string
          veg: boolean
        }
        Insert: {
          active?: boolean
          created_at?: string
          id?: string
          image_key: string
          name_en: string
          name_hi: string
          name_ml: string
          rating?: number
          slug: string
          sort_order?: number
          sub_en: string
          sub_hi: string
          sub_ml: string
          tag_en: string
          tag_hi: string
          tag_kind?: string
          tag_ml: string
          time_label?: string
          veg?: boolean
        }
        Update: {
          active?: boolean
          created_at?: string
          id?: string
          image_key?: string
          name_en?: string
          name_hi?: string
          name_ml?: string
          rating?: number
          slug?: string
          sort_order?: number
          sub_en?: string
          sub_hi?: string
          sub_ml?: string
          tag_en?: string
          tag_hi?: string
          tag_kind?: string
          tag_ml?: string
          time_label?: string
          veg?: boolean
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string
          device_id: string
          dish_slug: string
          id: string
        }
        Insert: {
          created_at?: string
          device_id: string
          dish_slug: string
          id?: string
        }
        Update: {
          created_at?: string
          device_id?: string
          dish_slug?: string
          id?: string
        }
        Relationships: []
      }
      follows: {
        Row: {
          created_at: string
          follower_device_id: string
          following_device_id: string
          id: string
        }
        Insert: {
          created_at?: string
          follower_device_id: string
          following_device_id: string
          id?: string
        }
        Update: {
          created_at?: string
          follower_device_id?: string
          following_device_id?: string
          id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          body: string
          created_at: string
          id: string
          media_url: string | null
          recipient_device_id: string
          sender_device_id: string
        }
        Insert: {
          body?: string
          created_at?: string
          id?: string
          media_url?: string | null
          recipient_device_id: string
          sender_device_id: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          media_url?: string | null
          recipient_device_id?: string
          sender_device_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string
          created_at: string
          device_id: string
          display_name: string
          name_changed_at: string | null
          preferred_lang: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string
          created_at?: string
          device_id: string
          display_name?: string
          name_changed_at?: string | null
          preferred_lang?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string
          created_at?: string
          device_id?: string
          display_name?: string
          name_changed_at?: string | null
          preferred_lang?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_conversation: {
        Args: { _me: string; _other: string }
        Returns: {
          body: string
          created_at: string
          id: string
          media_url: string
          recipient_device_id: string
          sender_device_id: string
        }[]
      }
      get_inbox: {
        Args: { _me: string }
        Returns: {
          last_body: string
          last_created_at: string
          other_device_id: string
        }[]
      }
      rename_profile: {
        Args: { _device_id: string; _new_name: string }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
