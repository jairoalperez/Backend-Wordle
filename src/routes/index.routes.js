const express = require('express')
const router = express.Router()
const usuario = require('../controllers/usuario')
const passport=require('passport')
const room= require('../controllers/room')
const points=require('../controllers/points')
const { passportAuth } = require('../middleware')


//Rutas para los users
router.post('/register', usuario.register) //
router.post('/login', passportAuth) //
router.put('/modify/:id', usuario.modify) //

//busqueda de usuarios por id
router.get('/search-user/:id_usuario',usuario.searchiduser) //

//busqueda de username
router.get('/search-username/:username',usuario.searchuser) //


//room

router.post('/create-room', room.creates)
router.get('/search-room/:id_room', room.searchidroom)
router.put('/modfy-room', room.modifyr)
router.get('/read-rooms',room.readroom)
router.delete('/delete-room',room.deleteroom)



router.get('/search-roomauthor/:id_room',room.searchauthor)
router.get('/search-roomrounds/:id_room',room.searchrounds)
router.get('/search-roomtiempo/:id_room',room.searchtiempo)

//point

router.get('/search-point/:id_usuario', points.searchp)
router.post('/create-point', points.create)










router.get('/perfil',(req,res)=>{
    res.send('perfil')
})


module.exports = router
