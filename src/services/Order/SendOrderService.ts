import prisma from "../../prisma";

interface OrderRequest{
  order_id: string
}

class SendOrderService{
  async execute({order_id}: OrderRequest){
    const order = await prisma.order.update({
      where:{
        id: order_id
      },
      data:{
        draft: true
      }
    })
    return order;
  }
}

export {SendOrderService}

