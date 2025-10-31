export interface User {
  user_id?:number
  name:string
  last_name:string
  national_id:string
  email:string
  password:string
  phone:string
  address:string
  status?:string
  role?:string
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