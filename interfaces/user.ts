export interface UserDTO{
  name:string
  email:string
  address:string
  phone:string
  
  
}

export interface UserDAO extends UserDTO {
  id_user: string
  state_id: string
  
}