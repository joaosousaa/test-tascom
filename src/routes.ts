import { Router } from "express";

import { 
  show as showTodoController, 
  create as createTodoController, 
  edit as editTodoController,
  list as listTodoController,
} from '@/controllers/todo.controller'

const routes = Router();

routes.get("/todo/list", listTodoController);

routes.get("/todo/show/:id", showTodoController);

routes.put("/todo/edit/:id/:status", editTodoController);

routes.post("/todo/create", createTodoController);


export default routes;
