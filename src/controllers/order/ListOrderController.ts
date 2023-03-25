import { Response, Request } from "express";
import { ListOrderService } from "../../services/Order/ListOrderService";

class ListOrderController{
  async handle(req: Request, res:Response){
    const listOrderService = new ListOrderService();
    const orders = await listOrderService.execute();
    res.json(orders)
  }
}

export {ListOrderController}