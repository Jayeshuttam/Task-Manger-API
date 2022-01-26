const errorHandlerMiddleware = (err,req,res,next) => {
    console.log(err)
    return res.status(err.status).json({message:err.message})
}
module.exports = errorHandlerMiddleware