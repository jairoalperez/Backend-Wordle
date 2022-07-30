const db=require('../database')
const points={}

points.create=(req,res)=>{
    try {
        db.createpoints(req,res)
    } catch (e) {
        console.log(e)
    }
}

points.searchp=(req,res)=>{
    try {
        db.searchpoints
    } catch (e) {
        console.log(e)
    }
}







module.exports= points