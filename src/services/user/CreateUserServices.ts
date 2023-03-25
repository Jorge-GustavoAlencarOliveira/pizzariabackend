import prisma from "../../prisma";
import { hash } from "bcryptjs"

interface UserRequest{
  name: string;
  email: string;
  password: string;
}


class CreateUserService {
  async execute({name, email, password}: UserRequest){
    //Verificar se enviou o email
    if(!email){
      throw new Error('Email inválido')
    }
    //Verificar se email já existe
    const emailAlreadyExists = await prisma.user.findFirst({
      where:{
        email: email,
      }
    })
    if(emailAlreadyExists){
      throw new Error('Email já existe')
    }
    const passwordHash = await hash(password, 8)

    const user = await prisma.user.create({
      data:{
        name: name,
        email: email,
        password: passwordHash,
      },
      select:{
        name: true,
        email: true,
        id: true
      }

    })


    return user;
  }
}

export {CreateUserService};