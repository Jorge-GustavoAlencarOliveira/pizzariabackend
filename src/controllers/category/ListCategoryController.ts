import { Request, Response } from "express";
import { ListCategoryService } from "../../services/Category/ListCategoryService";

class ListCategoryController{
  async handle(req: Request, res:Response){
   const listCategoryService = new ListCategoryService();
   const categorias = await listCategoryService.execute();
   return res.json(categorias) 
  }
}

export {ListCategoryController}