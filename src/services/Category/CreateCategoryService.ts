import prisma from "../../prisma";

interface CategoryRequest{
  name: string;
}



class CreateCategoryService {
  async execute({name}: CategoryRequest){
    if(name === " "){
      throw new Error("Nome invalido")
    }
    const categoryAlreadyExists = await prisma.category.findFirst({
      where:{
        name: name
      }
    })
    if (categoryAlreadyExists){
      throw new Error("Categoria ja existe")
    }
    const category = await prisma.category.create({
      data:{
        name: name
      },
      select:{
        id: true,
        name: true
      }
    })
    return category;
  }
}

export {CreateCategoryService};