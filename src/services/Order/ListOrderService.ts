import prisma from "../../prisma";

class ListOrderService{
  async execute(){
    const orders = await prisma.order.findMany({
      where:{
        draft: true,
        status: false
      }
    })
    return orders;    
  }
}

export {ListOrderService}