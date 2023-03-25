import prisma from '../../prisma';

class DetailOrderService{
  async execute({order_id}){
    const order = await prisma.item.findMany({
      where:{
        order_id: order_id
      },
      include:{
        product: true,
        order: true
      }
    })
    return order
  }
}

export {DetailOrderService}


