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
      FeedComments: {
        Row: {
          content: string | null
          createdAt: string | null
          feedId: number | null
          id: number
          userId: string
        }
        Insert: {
          content?: string | null
          createdAt?: string | null
          feedId?: number | null
          id?: number
          userId?: string
        }
        Update: {
          content?: string | null
          createdAt?: string | null
          feedId?: number | null
          id?: number
          userId?: string
        }
        Relationships: []
      }
      FeedLikes: {
        Row: {
          feedId: number
          id: number
          userId: string | null
        }
        Insert: {
          feedId: number
          id?: number
          userId?: string | null
        }
        Update: {
          feedId?: number
          id?: number
          userId?: string | null
        }
        Relationships: []
      }
      Feeds: {
        Row: {
          content: string | null
          createdAt: string | null
          id: number
          image: string | null
          region: number | null
          title: string | null
          userId: string
        }
        Insert: {
          content?: string | null
          createdAt?: string | null
          id?: number
          image?: string | null
          region?: number | null
          title?: string | null
          userId?: string
        }
        Update: {
          content?: string | null
          createdAt?: string | null
          id?: number
          image?: string | null
          region?: number | null
          title?: string | null
          userId?: string
        }
        Relationships: []
      }
      PlaceComments: {
        Row: {
          content: string | null
          createdAt: string
          id: number
          placeId: number | null
          userId: string | null
        }
        Insert: {
          content?: string | null
          createdAt: string
          id?: number
          placeId?: number | null
          userId?: string | null
        }
        Update: {
          content?: string | null
          createdAt?: string
          id?: number
          placeId?: number | null
          userId?: string | null
        }
        Relationships: []
      }
      PlaceLikes: {
        Row: {
          id: number
          placeId: number | null
          userId: string
        }
        Insert: {
          id?: number
          placeId?: number | null
          userId?: string
        }
        Update: {
          id?: number
          placeId?: number | null
          userId?: string
        }
        Relationships: []
      }
      Users: {
        Row: {
          createdAt: string
          email: string
          id: string
          nickname: string
          profileImage: string | null
          provider: string | null
        }
        Insert: {
          createdAt?: string
          email: string
          id?: string
          nickname: string
          profileImage?: string | null
          provider?: string | null
        }
        Update: {
          createdAt?: string
          email?: string
          id?: string
          nickname?: string
          profileImage?: string | null
          provider?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
