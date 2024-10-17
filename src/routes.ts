import { Router } from "express";

import { 
  show as showTodoController, 
  create as createTodoController, 
  edit as editTodoController,
  count as countCompletedTasks,
} from '@/controllers/todo.controller'

const routes = Router();

routes.get("/todo/count", countCompletedTasks);

routes.get("/todo/show", showTodoController);

routes.put("/todo/edit/:id/:status", editTodoController);

routes.post("/todo/create", createTodoController);


export default routes;
