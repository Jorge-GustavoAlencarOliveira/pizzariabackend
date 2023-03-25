import { Response, Request } from "express";
import { CloseOrderService } from "../../services/Order/CloseOrderService";

class CloseOrderController{
  async handle(req: Request, res: Response){
    const {order_id} = req.body;
    const closeOrderService = new CloseOrderService();
    const closeOrder = await closeOrderService.execute({
      order_id
    })
    return res.json(closeOrder)
  }
}
export {CloseOrderController}