const express = require('express')
const router = express.Router()
var path = require('path');


const conection = require('../database/db')

const authController = require('../controllers/authController')
const boardController = require('../controllers/boardController');
const { Connection } = require('pg');

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

router.get('/', authController.isAuthenticated, (req,res)=>{
    res.render('index', {user:req.user})
})

router.get('/login', (req,res)=>{
    res.render('login', {alert:false})
})

router.get('/register', (req,res)=>{
    res.render('register')
})

router.get('/registerBoard', (req,res)=>{
    res.render('registerBoard')
})

router.get('/personal', authController.isAuthenticated, (req,res)=>{
    conection.query('SELECT * FROM boards WHERE id_user = $1', [req.user.id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('table', {results:results.rows, user:req.user})
        }
    })
})

router.get('/compartidos', authController.isAuthenticated, (req,res)=>{
 conection.query('SELECT * FROM boards INNER JOIN boardshares ON boardshares.id_board = boards.id_board AND boardshares.id_user = $1',
  [req.user.id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('tableShare', {results:results.rows, user:req.user})
        }
    })
})

router.get('/join', (req,res)=>{
    res.render('join')
})

/*
router.get('/lienzo', (req,res)=>{
    res.sendFile(path.resolve('./public/p5/index.html'));
})*/

//Segunda manera de enviarlo en formato ejs

router.get('/lienzo/:id', authController.isAuthenticated, (req,res)=>{
    const id_board = req.params.id
    conection.query('SELECT * FROM boards WHERE id_board = $1', [id_board], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render(path.resolve('./public/p5/index.ejs'), {user:req.user, board:results.rows[0]});
        }
    })
})


router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.post('/registerBoardd', boardController.registerBoard)
router.post('/Join', boardController.registerShare)

module.exports = router