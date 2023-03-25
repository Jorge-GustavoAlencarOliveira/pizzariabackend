import prisma from "../../prisma";

interface OrderRequest{
  order_id: string;
}

class DeleteOrderService{
  async execute({order_id}: OrderRequest) {
    const order = await prisma.order.delete({
      where:{
        id: order_id
      }
    })

    return order
    
  }
}

export {DeleteOrderService}