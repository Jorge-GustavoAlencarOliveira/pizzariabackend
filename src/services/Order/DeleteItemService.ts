import prisma from "../../prisma";

interface itemRequest{
  item_id: string;
}

class DeleteItemService{
  async execute({item_id}: itemRequest) {
    const item = await prisma.item.delete({
      where:{
        id: item_id
      }
    })

    return item
    
  }
}

export {DeleteItemService}

