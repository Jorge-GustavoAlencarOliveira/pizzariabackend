import prisma from "../../prisma";

interface OrderRequest{
  name: string;
  table: number;
}

class CreateOrderService {
  async execute({table, name}:OrderRequest) {
    const order = await prisma.order.create({
      data:{
        table: table,
        name: name
      }
    })

    return order
    
  }
}

export {CreateOrderService}