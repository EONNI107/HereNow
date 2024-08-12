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
          content: string
          createdAt: string
          feedId: number
          id: number
          userId: string
        }
        Insert: {
          content: string
          createdAt?: string
          feedId: number
          id?: number
          userId?: string
        }
        Update: {
          content?: string
          createdAt?: string
          feedId?: number
          id?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "FeedComments_feedId_fkey"
            columns: ["feedId"]
            isOneToOne: false
            referencedRelation: "Feeds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FeedComments_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      FeedLikes: {
        Row: {
          feedId: number
          id: number
          userId: string
        }
        Insert: {
          feedId: number
          id?: number
          userId?: string
        }
        Update: {
          feedId?: number
          id?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "FeedLikes_feedId_fkey"
            columns: ["feedId"]
            isOneToOne: false
            referencedRelation: "Feeds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FeedLikes_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      Feeds: {
        Row: {
          commentsCount: number
          content: string
          createdAt: string
          id: number
          image: string | null
          likesCount: number
          region: string | null
          sigungu: string | null
          title: string
          userId: string
        }
        Insert: {
          commentsCount?: number
          content: string
          createdAt?: string
          id?: number
          image?: string | null
          likesCount?: number
          region?: string | null
          sigungu?: string | null
          title: string
          userId?: string
        }
        Update: {
          commentsCount?: number
          content?: string
          createdAt?: string
          id?: number
          image?: string | null
          likesCount?: number
          region?: string | null
          sigungu?: string | null
          title?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Feeds_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      PlaceComments: {
        Row: {
          content: string
          createdAt: string
          id: number
          placeId: string
          userId: string
        }
        Insert: {
          content: string
          createdAt: string
          id?: number
          placeId: string
          userId?: string
        }
        Update: {
          content?: string
          createdAt?: string
          id?: number
          placeId?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "PlaceComments_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      PlaceLikes: {
        Row: {
          id: number
          imageUrl: string | null
          placeId: string
          userId: string
        }
        Insert: {
          id?: number
          imageUrl?: string | null
          placeId: string
          userId?: string
        }
        Update: {
          id?: number
          imageUrl?: string | null
          placeId?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "PlaceLikes_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      Users: {
        Row: {
          createdAt: string
          email: string
          id: string
          nickname: string | null
          profileImage: string | null
          provider: string
        }
        Insert: {
          createdAt?: string
          email: string
          id?: string
          nickname?: string | null
          profileImage?: string | null
          provider?: string
        }
        Update: {
          createdAt?: string
          email?: string
          id?: string
          nickname?: string | null
          profileImage?: string | null
          provider?: string
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
