import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { createRequestType, putParamsType } from '@/commons/types/todo.type'

const prisma = new PrismaClient();

// contar tarefas concluídas
export async function count(req: Request, res: Response) {
  try {
    const completedTasks = await prisma.task.count({
      where: {
        status: 'COMPLETED'
      }
    });

    if (!completedTasks || completedTasks === 0) {
      return res.status(200).json({ message: 'Nenhuma tarefa encontrada', data: 0 });
    }

    return res.status(200).json({ message: 'Contagem de tarefas concluídas', data: completedTasks });

  } catch (error: any) {
    return res.status(500).json({ message: { error: error.message } });
  }
}

// listar tarefas com o status created
export async function show(req: Request, res: Response) {
  try {
    const listTodo = await prisma.task.findMany({
      where: {
        status: 'CREATED'
      }
    });
    if (!listTodo || listTodo.length === 0) {
      return res.status(200).json({ message: 'Nenhuma tarefa com status "created" encontrada' });
    }

    return res.status(200).json({ message: 'Tarefas encontradas', data: listTodo });

  } catch (error: any) {
    return res.status(500).json({ message: { error: error.message } });
  }
};

// criar tasks
export async function create(req: Request<any, any, createRequestType>, res: Response) {
  const { description, title } = req.body

  try {

    if (!description || !title) throw new Error("Parâmetros não encontrados");

    const createTodo = await prisma.task.create({
      data: {
        title,
        description,
        status: 'CREATED'
      }
    })

    if (!createTodo) throw new Error("Erro ao criar task");

    return res.status(200).json({ message: 'Criado com sucesso', data: createTodo })

  } catch (error: any) {
    return res.status(500).json({ message: { error: error.message } })
  }
};

// cancelar e completar uma task
export async function edit(req: Request<putParamsType>, res: Response) {
  const { status, id } = req.params

  try {

    if (!status || !id) throw new Error("Params not found");

    if (!(status === 'CANCELED' || status === 'COMPLETED')) throw new Error("Parâmetros não encontrados");

    const updateTodo = await prisma.task.update({
      where: {
        id,
        status: {
          notIn: ['CANCELED', 'COMPLETED']
        }
      },
      data: {
        status
      }
    })

    if (!updateTodo) throw new Error("Erro ao atualizar task");

    return res.status(200).json({ message: 'Atualizado com sucesso', data: updateTodo })

  } catch (error: any) {
    return res.status(500).json({ message: 'Ocorreu um erro ao atualizar.', error: error.message })
  }
};