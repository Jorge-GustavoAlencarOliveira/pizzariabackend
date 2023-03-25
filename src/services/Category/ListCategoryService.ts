import prisma from "../../prisma";

class ListCategoryService{
  async execute(){
    const categorias = await prisma.category.findMany({
      select:{
        name: true,
        id: true,
      }
    })
    return {categorias}
  }
}

export {ListCategoryService}