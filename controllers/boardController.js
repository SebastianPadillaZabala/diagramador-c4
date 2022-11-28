const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const conection = require("../database/db");
const { promisify } = require("util");

exports.registerBoard = async (req, res) => {
    try {
      const name = req.body.name;
      const nivel = req.body.nivel;
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      let numeros = '0123456789'
      let letras = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      let todo = numeros+letras
      let password = '';
      for(let x = 0; x < 15; x++){
      let aleatorio = Math.floor(Math.random() * todo.length)
      password += todo.charAt(aleatorio)
      }
       conection.query(
        "INSERT INTO boards(name, passw, nivel, id_user) VALUES($1, $2, $3, $4)",
        [ name, password, nivel, decodificada.id],
        (error, result) => {
          if (error) {
            console.log(error);
          }
          res.redirect('/personal')
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  exports.registerShare = async (req, res) => {
    try {
      const pass = req.body.pass;
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
       conection.query(
        "SELECT id_board FROM boards WHERE passw = $1",
        [pass],
        (error, result) => {
          if (error) {
            console.log(error);
          }else{
            conection.query(
              "INSERT INTO boardshares(id_user, id_board) VALUES($1, $2)",
              [ decodificada.id, result.rows[0].id_board],
              (error, result2) => {
                if (error) {
                  console.log(error);
                }
                res.redirect('/compartidos')
              }
            );
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
