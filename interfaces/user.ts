export interface User {
  user_id:number
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

export interface RegisterDTO extends User {
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
export interface LoginDTO extends User{
  email: string
  password: string
}