import prisma from "../../prisma";

interface CategoryRequest{
  category_id: string;
}

class ListByCategoryService{
  async execute({category_id}:CategoryRequest){
    const products = await prisma.product.findMany({
      where:{
        category_id: category_id
      },
      select:{
        id: true,
        name: true
      }
    })
    
    return products
  }
}

export {ListByCategoryService}

