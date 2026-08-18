// Hand-written to match supabase/migrations/0001_init.sql exactly.
// If the schema changes, update this file in the same commit.
// (Shaped the same way `supabase gen types typescript` output is, including
// the otherwise-empty Views/Functions/Enums/CompositeTypes/Relationships
// keys — the supabase-js query builder's generics need the full shape to
// infer select()/insert() types correctly, even when there's nothing in
// those sections yet.)

export type Database = {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string;
          price: number | null;
          currency: string;
          property_type: string;
          operation: string;
          zone: string | null;
          location: string;
          address: string | null;
          surface_total: number | null;
          surface_covered: number | null;
          bedrooms: number | null;
          bathrooms: number | null;
          rooms: number | null;
          features: string[];
          featured: boolean;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          description?: string;
          price?: number | null;
          currency?: string;
          property_type: string;
          operation: string;
          zone?: string | null;
          location?: string;
          address?: string | null;
          surface_total?: number | null;
          surface_covered?: number | null;
          bedrooms?: number | null;
          bathrooms?: number | null;
          rooms?: number | null;
          features?: string[];
          featured?: boolean;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["properties"]["Insert"]>;
        Relationships: [];
      };
      property_images: {
        Row: {
          id: string;
          property_id: string;
          storage_path: string;
          position: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          property_id: string;
          storage_path: string;
          position?: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["property_images"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "property_images_property_id_fkey";
            columns: ["property_id"];
            isOneToOne: false;
            referencedRelation: "properties";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type PropertyRow = Database["public"]["Tables"]["properties"]["Row"];
export type PropertyInsert = Database["public"]["Tables"]["properties"]["Insert"];
export type PropertyImageRow = Database["public"]["Tables"]["property_images"]["Row"];
