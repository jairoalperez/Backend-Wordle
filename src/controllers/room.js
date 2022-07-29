const bd = require('../database')



const room = {}

room.creates=(req,res)=>{
    try {bd.createroom(req,res)} catch (e) {
        console.log(e)
    }

}

room.modifyr=(req,res)=>{
    try {bd.modifyroom(req,res)} catch (e) {
        console.log(e) 
    }
}

room.searchidroom=(req,res)=>{
    try {
        bd.searchroom(req,res)
    } catch (e) {
        console.log(e)
    }
}

room.readroom=(req,res)=>{
try {
    bd.readroom(req,res)
} catch (e) {
    console.log(e)
}

}

room.deleteroom=(req,res)=>{
    try {
        bd.deleteroom(req,res)
    } catch (e) {
        console.log(e)
    }
}






module.exports= room