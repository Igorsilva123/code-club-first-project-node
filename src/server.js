import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors'
const prisma = new PrismaClient()

const app = express()

app.use(express.json())
app.use(cors('http://localhost:5173'))
app.post('/usuarios', async (req, res) => {

  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    }
  })

  return res.status(201).json({ message: "usuario criado com sucesso! " })
})


app.get('/usuarios', async (req, res) => {
  const users = await prisma.user.findMany()

  res.status(202).json(users)
});


app.delete('/usuarios/:id', async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id
    }
  })
  return res.status(202).json({message: "usuario deletado com sucesso!"})
})
app.put('/usuarios/:id', async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    }

  })
  res.status(200).json({ message: 'Usuário Atualizado com sucesso!' })
})

app.listen(2030, () => {
  console.log("servido esta rodando!!")
})