import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { createRequestType, putParamsType, showParamsType } from '@/commons/types/todo.type'

const prisma = new PrismaClient();

// LISTAR todas TASK
export async function list(req: Request, res: Response) {
  
  try {
    
    const listTodo = await prisma.task.findMany();

    if (!listTodo) return res.status(404).json({ message: 'Tasks não encontradas'})

    return res.status(200).json({ message: 'Pesquisas encontradas', data: listTodo })

  } catch (error: any) {
    return res.status(500).json({ message: { error: error.message } })  
  }

  
};

// LISTAR TASK
export async function show(req: Request<showParamsType>, res: Response) {
  const { id } = req.params

  try {
    
    if (!id) throw new Error("Params not found");

    const showTodo = await prisma.task.findFirst({ where: { id } });

    if (!showTodo) return res.status(404).json({ message: 'Task não encontrada'})

    return res.status(200).json({ message: 'Task encontrada', data: showTodo })

  } catch (error: any) {
    return res.status(500).json({ message: { error: error.message } })  
  }

  
};

// CRIAR TASK
export async function create(req: Request<any, any, createRequestType>, res: Response) {
  const { description, title } = req.body

  try {
    
    if (!description || !title) throw new Error("Params not found");

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

// CANCELAR E COMPLETAR UMA TASK
export async function edit(req: Request<putParamsType>, res: Response) {
  const { status, id } = req.params

  try {
    
    if (!status || !id) throw new Error("Params not found");

    if (!(status === 'CANCELED' || status === 'COMPLETED')) throw new Error("Params not found");

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