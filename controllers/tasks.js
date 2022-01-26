const Task = require ('../models/task.js')
const asyncWrapper = require('../middleware/async')
const {createCustomError}=require('../errors/custom-error')
const 
//Gets all tasks from database 
const getAllTasks = asyncWrapper(async (req,res)=>{
        const tasks= await Task.find({})
        res.status(200).json({tasks})    
    
})

//Create task and update in database
const createTask = asyncWrapper(async (req,res) => {
        const task = await Task.create(req.body)
        res.status(201).json({task})  
})

//Get a single task from database
const getTask = asyncWrapper(async (req,res,next) => {
    
        const{id:taskID} = req.params
        const task= await Task.findOne({_id:taskID})
        if (!task){
            return next(createCustomError(`No task with id :${taskID} `,404))
      //      return res.status(404).json({msg:`No task with id :${taskID} `})
        }
        res.status(200).json({task})
    
})


//Find and update a single task from database
const updateTask = asyncWrapper(async (req,res) => {
  
        const {id:taskID}=req.params
        
        const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
            new:true,
            runValidators:true})
         
        if(!task)
        {
            return res.status(404).json({msg:`No task with id : ${taskID}`})
        }
        res.status(200).json({task})
    
 
})



//Find and delete a task from databse

const deleteTask = asyncWrapper(async (req,res) => {
    
        const {id:taskID}=req.params
        const task = await Task.findOneAndDelete({_id:taskID})
        if(!task)
        {
            return res.status(404).json({msg:`No task with id : ${taskID}`})
        }
        res.status(200).json({task})
   
 
})




module.exports = {
    getAllTasks,createTask,getTask,updateTask,deleteTask}