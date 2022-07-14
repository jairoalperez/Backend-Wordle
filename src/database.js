const { Pool } = require('pg')
const  helpers  = require('./helpers')

const config={
    user:'postgres',
    host:'localhost',
    password:'123',
    database:'bd'
};
//funciones
const pool = new Pool(config);






//funcion create user
const createuser= async (req,res) =>{

    const{ nombre, username, correo, bio, direccion, birthday, clave} = req.body;
    const passwordencriptado = await helpers.encryptPassword(clave)
    const response = await pool.query('INSERT INTO usuarios (nombre, username, correo, bio, direccion, birthday, clave) VALUES($1, $2, $3, $4, $5, $6, $7)', [
        nombre, username, correo, bio, direccion, birthday, passwordencriptado])
    console.log(response);
    res.json(response.rows)
}

//funcion modify user
const modifyuser=async (req,res)=>{

    const{ nombre, username, correo, bio, direccion, birthday, clave,id_usuario} = req.body;
    const response = await pool.query('UPDATE usuarios SET nombre= $1 username= $2, correo=$3, bio =$4, direccion=$5, birthday=$6, clave=$7 WHERE id_usuario=$8', [nombre, username, correo, bio, direccion, birthday,clave,id_usuario])
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
module.exports = {
    createuser,
    modifyuser,
    searchuserid,
    searchusername
}