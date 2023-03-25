import prisma from "../../prisma";

interface OrderRequest{
  order_id: string;
}
class CloseOrderService{
  async execute({order_id}:OrderRequest){
    const order = await prisma.order.update({
      where:{
        id: order_id
      },
      data:{
        status: true
      }
    }
    )
    return order;
  }
}

export {CloseOrderService}