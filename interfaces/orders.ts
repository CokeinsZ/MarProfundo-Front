export interface OrderDTO {
    user_id:string
    payment_method:string
    products:ProductOrderDto[]

}

export type ProductOrderDto = {
  id: number;
  quantity: number;
};
