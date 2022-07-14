const createuser = require('../database')
const modifyuser=require('../database')
const searchuserid=require('../database')
const searchusername=require('../database')


//este constante esta vacia para las instancias
const usuario = {}


usuario.register= (req,res)=>{
    try{
createuser.createuser(req,res);
   

}catch(e){
    console.log(e);
}


}



usuario.modify= (req,res) => {
try{
    modifyuser.modifyuser(req,res);
   
}catch(e){
    console.log(e)
}

};

usuario.searchiduser=(req,res)=>{
    try{
        searchuserid.searchuserid(req,res);
      
    }catch(e){
        console.log(e)
    }

}

usuario.searchuser=(req,res)=>{
    try{
        searchusername.searchusername(req,res);
       
    }catch(e){
        console.log(e)
    }
}













module.exports = usuario