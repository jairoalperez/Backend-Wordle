const { Pool } = require('pg')
const  helpers  = require('./helpers')

const config={
    connectionString: process.env.DATABASE_URL,
    max:500,
    min:100,
    ssl:{rejectUnauthorized:false}
};
//funciones
const pool = new Pool(config);






//funcion create user
const createuser= async (req,res) =>{

    const{ nombre, username, correo,clave} = req.body;
    const passwordencriptado = await helpers.encryptPassword(clave)
    const response = await pool.query('INSERT INTO usuarios (nombre, username, correo,clave) VALUES($1, $2, $3, $4, $5, $6, $7)', [
        nombre, username, correo,passwordencriptado])
    console.log(response);
    res.json(response.rows)
}

//funcion modify user
const modifyuser=async (req,res)=>{

    const{ nombre, username, correo ,clave,id_usuario} = req.body;
    const response = await pool.query('UPDATE usuarios SET nombre= $1 username= $2, correo=$3, clave=$4 WHERE id_usuario=$5', [nombre, username, correo,clave,id_usuario])
    console.log(response);
    res.json(response.rows)

}

//funcion searchusername
const searchusername=async(req,res)=>{
    const username = req.params.username
    const response= await pool.query('SELECT * FROM usuarios WHERE username=$1 ', [username])
    console.log(response.rows);
    res.json(response.rows)
}


//funcion searchuserid
const searchuserid=async(req,res)=>{
    const id_usuario =req.params.id_usuario
    const response=await pool.query('SELECT * FROM usuarios WHERE id_usuario=$1', [id_usuario])
    console.log(response.rows);
    res.json(response.rows)
}

//createroom
const createroom= async(req,res)=>{
    const {id_room,rounds,tiempo,author}=req.body
    const result= await pool.query('INSERT INTO room(id_room,rounds,tiempo,author) VALUES($1,$2,$3,$4)', [
        id_room,rounds,tiempo,author ])
     console.log(result)
    res.json(result.rows)

}

//readroom
const readroom=async(req,res)=>{
    const result= await pool.query('SELECT*FROM room')
    res.json(result.rows);
}

//modifyroom
const modifyroom=async(req,res)=>{
    const {id_room,rounds,tiempo,author}=req.body
   
   const result= await pool.query('UPDATE room set id_room=$1, rounds=$2, tiempo=$3, author=4$',[
       id_room,rounds,tiempo,author
    ])
    console.log(result)
    res.json(result.rows)
}

//searchroom id
const searchroom=async(req,res)=>{
    const id_room=req.params.id_room
    const response=await pool.query('SELECT * FROM room WHERE id_room=$1',[id_room])
    console.log(response)
    res.json(response.rows)
}

//deleteroom
const deleteroom=async(req,res)=>{
    const {id_room}= req.body
    const result=await pool.query('DELETE FROM room where id_room=$1',[
        id_room
    ])
    console.log(result)
    res.json(result.rows)
}

//createpoints
const createpoints=async(req,res)=>{
const {id_usuario,id_room,points}=req.body
  const result= await pool.query('INSERT INTO points (id_usuario,id_room,points) values($1,$2,$3)',[
    id_usuario,id_room,points
  ])
 console.log(result)
 res.json(result.rows)
}
   //buscar puntos de un usuario
   const searchpoints=async(req,res)=>{
      const id_usuario= req.params.id_usuario
      const result= await pool.query('SELECT * FROM point WHERE  id_usuario=$1',[id_usuario])
      const user= result.rows[0]
      console.log(result)
      res.json(user.puntos)
    }

    const searchroomauthor=async(req,res)=>{
        const id_room=req.params.id_room
        const response=await pool.query('SELECT * FROM room WHERE id_room=$1',[id_room])
        const codigo= response.rows[0]
        res.json(codigo.author)
    
    }

    const searchroomrounds=async(req,res)=>{
        const id_room=req.params.id_room
        const response=await pool.query('SELECT * FROM room WHERE id_room=$1',[id_room])
        const codigo= response.rows[0]
        res.json(codigo.rounds)
    }

    const searchroomtiempo=async(req,res)=>{
        const id_room=req.params.id_room
        const response=await pool.query('SELECT * FROM room WHERE id_room=$1',[id_room])
        const codigo= response.rows[0]
        res.json(codigo.tiempo)
    }

module.exports = {
    createuser,
    modifyuser,
    searchuserid,
    searchusername,
    searchpoints,
    createpoints,
    deleteroom,
    searchroom,
    modifyroom,
    readroom,
    createroom,
    searchroomauthor,
    searchroomrounds,
    searchroomtiempo

}