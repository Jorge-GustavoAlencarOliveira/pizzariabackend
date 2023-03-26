var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve2, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve2(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/routes.ts
var routes_exports = {};
__export(routes_exports, {
  router: () => router
});
module.exports = __toCommonJS(routes_exports);
var import_express = require("express");
var import_multer2 = __toESM(require("multer"));

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prisma_default = prisma;

// src/services/user/CreateUserServices.ts
var import_bcryptjs = require("bcryptjs");
var CreateUserService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ name, email, password }) {
      if (!email) {
        throw new Error("Email inv\xE1lido");
      }
      const emailAlreadyExists = yield prisma_default.user.findFirst({
        where: {
          email
        }
      });
      if (emailAlreadyExists) {
        throw new Error("Email j\xE1 existe");
      }
      const passwordHash = yield (0, import_bcryptjs.hash)(password, 8);
      const user = yield prisma_default.user.create({
        data: {
          name,
          email,
          password: passwordHash
        },
        select: {
          name: true,
          email: true,
          id: true
        }
      });
      return user;
    });
  }
};

// src/controllers/user/CreateUserController.ts
var CreateUserController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { name, email, password } = req.body;
      const createUserService = new CreateUserService();
      const user = yield createUserService.execute({
        name,
        email,
        password
      });
      return res.json(user);
    });
  }
};

// src/services/user/AuthUserService.ts
var import_bcryptjs2 = require("bcryptjs");
var import_jsonwebtoken = require("jsonwebtoken");
var AuthUserService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ email, password }) {
      const user = yield prisma_default.user.findFirst({
        where: {
          email
        }
      });
      if (!user) {
        throw new Error("usuario n\xE3o existe");
      }
      ;
      const passwordMatch = yield (0, import_bcryptjs2.compare)(password, user.password);
      if (!passwordMatch) {
        throw new Error("usuario n\xE3o existe");
      }
      const token = (0, import_jsonwebtoken.sign)(
        {
          name: user.name,
          email: user.email
        },
        process.env.JWT_SECRET,
        {
          subject: user.id,
          expiresIn: "30d"
        }
      );
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        token
      };
    });
  }
};

// src/controllers/user/AuthUserController.ts
var AuthUserController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { email, password } = req.body;
      const authUserService = new AuthUserService();
      const auth = yield authUserService.execute({
        email,
        password
      });
      return res.json(auth);
    });
  }
};

// src/services/user/DetailUserService.ts
var DetailUserService = class {
  execute(user_id) {
    return __async(this, null, function* () {
      const user = yield prisma_default.user.findFirst({
        where: {
          id: user_id
        },
        select: {
          id: true,
          name: true,
          email: true
        }
      });
      return { user };
    });
  }
};

// src/controllers/user/DetailUserController.ts
var DetailUserController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const user_id = req.user_id;
      const detailUserService = new DetailUserService();
      const user = yield detailUserService.execute(user_id);
      return res.json(user);
    });
  }
};

// src/middlewares/isAuthenticated.ts
var import_jsonwebtoken2 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).end();
  }
  const [, token] = authToken.split(" ");
  try {
    const { sub } = (0, import_jsonwebtoken2.verify)(
      token,
      process.env.JWT_SECRET
    );
    req.user_id = sub;
    return next();
  } catch (err) {
    return res.status(401).end();
  }
}

// src/services/Category/CreateCategoryService.ts
var CreateCategoryService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ name }) {
      if (name === " ") {
        throw new Error("Nome invalido");
      }
      const categoryAlreadyExists = yield prisma_default.category.findFirst({
        where: {
          name
        }
      });
      if (categoryAlreadyExists) {
        throw new Error("Categoria ja existe");
      }
      const category = yield prisma_default.category.create({
        data: {
          name
        },
        select: {
          id: true,
          name: true
        }
      });
      return category;
    });
  }
};

// src/controllers/category/CreateCategoryController.ts
var CreateCategoryController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { name } = req.body;
      const createCategoryService = new CreateCategoryService();
      const category = yield createCategoryService.execute({
        name
      });
      return res.json(category);
    });
  }
};

// src/services/Category/ListCategoryService.ts
var ListCategoryService = class {
  execute() {
    return __async(this, null, function* () {
      const categorias = yield prisma_default.category.findMany({
        select: {
          name: true,
          id: true
        }
      });
      return { categorias };
    });
  }
};

// src/controllers/category/ListCategoryController.ts
var ListCategoryController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const listCategoryService = new ListCategoryService();
      const categorias = yield listCategoryService.execute();
      return res.json(categorias);
    });
  }
};

// src/services/Product/CreateProductService.ts
var CreateProductService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ name, price, description, banner, category_id }) {
      const product = yield prisma_default.product.create({
        data: {
          name,
          price,
          description,
          banner,
          category_id
        }
      });
      return product;
    });
  }
};

// src/controllers/product/CreateProductController.ts
var CreateProductController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { name, price, description, category_id } = req.body;
      const createProductService = new CreateProductService();
      if (!req.file) {
        throw new Error("error upload file");
      } else {
        const { originalname, filename: banner } = req.file;
        const product = yield createProductService.execute({
          name,
          price,
          description,
          banner,
          category_id
        });
        return res.json(product);
      }
    });
  }
};

// src/config/multer.ts
var import_crypto = __toESM(require("crypto"));
var import_multer = __toESM(require("multer"));
var import_path = require("path");
var multer_default = {
  upload(folder) {
    return {
      storage: import_multer.default.diskStorage({
        destination: (0, import_path.resolve)(__dirname, "..", "..", folder),
        filename: (request, file, callback) => {
          const fileHash = import_crypto.default.randomBytes(16).toString("hex");
          const fileName = `${fileHash}-${file.originalname}`;
          return callback(null, fileName);
        }
      })
    };
  }
};

// src/services/Product/ListByCategoryService.ts
var ListByCategoryService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ category_id }) {
      const products = yield prisma_default.product.findMany({
        where: {
          category_id
        },
        select: {
          id: true,
          name: true
        }
      });
      return products;
    });
  }
};

// src/controllers/product/ListByCategoryController.ts
var ListByCategoryController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const category_id = req.query.category_id;
      const listByCategoryService = new ListByCategoryService();
      const products = yield listByCategoryService.execute({
        category_id
      });
      return res.json(products);
    });
  }
};

// src/services/Order/CreateOrderService.ts
var CreateOrderService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ table, name }) {
      const order = yield prisma_default.order.create({
        data: {
          table,
          name
        }
      });
      return order;
    });
  }
};

// src/controllers/order/CreateOrderController.ts
var CreateOrderController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { table, name } = req.body;
      const createOrderService = new CreateOrderService();
      const order = yield createOrderService.execute({
        table,
        name
      });
      return res.json(order);
    });
  }
};

// src/services/Order/DeleteOrderService.ts
var DeleteOrderService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ order_id }) {
      const order = yield prisma_default.order.delete({
        where: {
          id: order_id
        }
      });
      return order;
    });
  }
};

// src/controllers/order/DeleteOrderController.ts
var DeleteOrderController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const order_id = req.query.order_id;
      const deleteOrderService = new DeleteOrderService();
      const order = yield deleteOrderService.execute({
        order_id
      });
      return res.json(order);
    });
  }
};

// src/services/Order/AddItemService.ts
var AddItemService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ order_id, product_id, amount }) {
      const order = yield prisma_default.item.create({
        data: {
          order_id,
          product_id,
          amount
        }
      });
      return order;
    });
  }
};

// src/controllers/order/AddItemController.ts
var AddItemController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { order_id, product_id, amount } = req.body;
      const addItemService = new AddItemService();
      const order = yield addItemService.execute({
        order_id,
        product_id,
        amount
      });
      return res.json(order);
    });
  }
};

// src/services/Order/DeleteItemService.ts
var DeleteItemService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ item_id }) {
      const item = yield prisma_default.item.delete({
        where: {
          id: item_id
        }
      });
      return item;
    });
  }
};

// src/controllers/order/DeleteItemController.ts
var DeleteItemController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const item_id = req.query.item_id;
      const deleteItemService = new DeleteItemService();
      const item = yield deleteItemService.execute({
        item_id
      });
      return res.json(item);
    });
  }
};

// src/services/Order/SendOrderService.ts
var SendOrderService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ order_id }) {
      const order = yield prisma_default.order.update({
        where: {
          id: order_id
        },
        data: {
          draft: true
        }
      });
      return order;
    });
  }
};

// src/controllers/order/SendOrderController.ts
var SendOrderController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { order_id } = req.body;
      const sendOrderService = new SendOrderService();
      const order = yield sendOrderService.execute({
        order_id
      });
      return res.json(order);
    });
  }
};

// src/services/Order/ListOrderService.ts
var ListOrderService = class {
  execute() {
    return __async(this, null, function* () {
      const orders = yield prisma_default.order.findMany({
        where: {
          draft: true,
          status: false
        }
      });
      return orders;
    });
  }
};

// src/controllers/order/ListOrderController.ts
var ListOrderController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const listOrderService = new ListOrderService();
      const orders = yield listOrderService.execute();
      res.json(orders);
    });
  }
};

// src/services/Order/DetailOrderService.ts
var DetailOrderService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ order_id }) {
      const order = yield prisma_default.item.findMany({
        where: {
          order_id
        },
        include: {
          product: true,
          order: true
        }
      });
      return order;
    });
  }
};

// src/controllers/order/DetailOrderController.ts
var DetailOrderController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const order_id = req.query.order_id;
      const detailOrderService = new DetailOrderService();
      const order = yield detailOrderService.execute({
        order_id
      });
      return res.json(order);
    });
  }
};

// src/services/Order/CloseOrderService.ts
var CloseOrderService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ order_id }) {
      const order = yield prisma_default.order.update(
        {
          where: {
            id: order_id
          },
          data: {
            status: true
          }
        }
      );
      return order;
    });
  }
};

// src/controllers/order/CloseOrderController.ts
var CloseOrderController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { order_id } = req.body;
      const closeOrderService = new CloseOrderService();
      const closeOrder = yield closeOrderService.execute({
        order_id
      });
      return res.json(closeOrder);
    });
  }
};

// src/routes.ts
var router = (0, import_express.Router)();
var upload = (0, import_multer2.default)(multer_default.upload("./tmp"));
router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);
router.post("/category", isAuthenticated, new CreateCategoryController().handle);
router.get("/category", isAuthenticated, new ListCategoryController().handle);
router.post("/products", isAuthenticated, upload.single("file"), new CreateProductController().handle);
router.get("/products", isAuthenticated, new ListByCategoryController().handle);
router.post("/orders", isAuthenticated, new CreateOrderController().handle);
router.delete("/orders/delete", isAuthenticated, new DeleteOrderController().handle);
router.post("/orders/items", isAuthenticated, new AddItemController().handle);
router.delete("/orders/items/delete", isAuthenticated, new DeleteItemController().handle);
router.put("/orders/update", isAuthenticated, new SendOrderController().handle);
router.get("/orders/list", isAuthenticated, new ListOrderController().handle);
router.get("/orders/detail", isAuthenticated, new DetailOrderController().handle);
router.put("/orders/close", isAuthenticated, new CloseOrderController().handle);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  router
});
