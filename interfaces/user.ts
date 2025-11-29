export interface User {
  user_id: number;
  name: string;
  last_name: string;
  national_id: string;
  email: string;
  password?: string;
  phone: string;
  address: string;
  status: string | 'not_verified' | 'active' | 'inactive' | 'banned';
  role: string |'user' | 'admin';
  created_at?: string;
  updated_at?: string;
}

export interface UserRegister {
  name: string;
  last_name: string;
  national_id: string;
  email: string;
  password?: string;
  phone: string;
  address: string;
}

export interface UserListItem {
  user_id: number;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  status: 'not_verified' | 'active' | 'inactive' | 'banned';
  role: 'user' | 'admin';
  created_at?: string;
}

export interface RegisterDTO {
  name:string
  last_name:string
  national_id:string
  email:string
  password:string
  phone:string
  address:string
  status?:string
  rol?:string
}
export interface LoginDTO{
  email: string
  password: string
}