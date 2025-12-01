export interface Manual {
  manual_id: number;
  title: string;
  thumbnail: string;
  created_at: string;
  updated_at: string;
}

export interface ManualBlock {
  block_id: number;
  manual_id: number;
  index: number;
  type: 'text' | 'image' | 'video' | 'gif' | 'h2' | 'h3' | 'list';
  content: string;
}
