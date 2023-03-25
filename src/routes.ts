import { Router } from 'express';
import multer from 'multer';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';
import uploadConfig from './config/multer';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { DeleteOrderController } from './controllers/order/DeleteOrderController';
import { AddItemController } from './controllers/order/AddItemController';
import { DeleteItemController } from './controllers/order/DeleteItemController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrderController } from './controllers/order/ListOrderController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { CloseOrderController } from './controllers/order/CloseOrderController';

const router = Router();
const upload = multer(uploadConfig.upload('./tmp'));

// ROTAS USER
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated ,new DetailUserController().handle)

// ROTAS CATEGORIAS
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/category', isAuthenticated, new ListCategoryController().handle)

//ROTAS PRODUTOS
router.post('/products', isAuthenticated, upload.single('file'), new CreateProductController().handle);
router.get('/products', isAuthenticated, new ListByCategoryController().handle)

//ROTAS ORDENS
router.post('/orders', isAuthenticated, new CreateOrderController().handle)
router.delete('/orders/delete', isAuthenticated, new DeleteOrderController().handle)
router.post('/orders/items', isAuthenticated, new AddItemController().handle)
router.delete('/orders/items/delete', isAuthenticated, new DeleteItemController().handle)
router.put('/orders/update', isAuthenticated, new SendOrderController().handle)
router.get('/orders/list', isAuthenticated, new ListOrderController().handle)
router.get('/orders/detail', isAuthenticated, new DetailOrderController().handle)
router.put('/orders/close', isAuthenticated, new CloseOrderController().handle)

export {router};

