import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'

const port = 8000;

const app = express()
app.use(cors())
mongoose.connect('mongodb://localhost:27017/My_Todo',{}).then(()=>{
    console.log(`Connected`)
}).catch(()=>{
    console.log(`Not Connected`)
})

const TodoSchema = mongoose.Schema({
    title:{
        type:String,
        require:true,
    }
})

const Todo = mongoose.model('Todo',TodoSchema);

// 
app.get('/todos',async(req,res)=>{
    try{
        const todos =await Todo.find({});
        res.status(200).json(todos)
    }catch(e){
        console.log(e)
    }
})
app.use(express.json())
app.delete('/todo/:id',async(req,res)=>{
    try{
        const todo = await Todo.findByIdAndDelete(req.params.id)
        res.status(200).json(todo)
    }catch(e){
        console.log(e)
    }
})

app.post('/todo',async(req,res)=>{
    try{
        const todo = new Todo({title:req.body.title})
        const saveToDo = await todo.save()
        res.status(200).json(saveToDo)
    }catch(e){
        console.log(e)
    }
})

app.listen(port,()=>{
    console.log(`Server Started ${port}`)
})