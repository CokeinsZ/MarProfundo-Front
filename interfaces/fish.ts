export interface Fish {
    fish_id:number
    common_name:string
    scientific_name:string
    habitat:string
    mean_size:number
    mean_weight:number
    diet:string
    img:string
}

export enum Origin {
  FISHING = 'fishing',
  STORE = 'store',
}
export interface UserFish {
  user_id: number;
  fish_id: number;
  origin: Origin;
  size?: string;
  weight?: string;
  is_favorite: boolean;
}