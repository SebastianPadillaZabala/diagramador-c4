const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const conection = require("../database/db");
const { promisify } = require("util");

//procedimiento para registrarnos
exports.register = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const pass = req.body.pass;
    const passHash = await bcrypt.hash(pass, 8);
     conection.query(
      "INSERT INTO users(name, email, password) VALUES($1, $2, $3)",
      [ name, email, passHash ],
      (error, result) => {
        if (error) {
          console.log(error);
        }
      }
    );
     conection.query(
        "SELECT * FROM users WHERE email = $1",
        [email],
        async (error, results) => {
            //inicio de sesion OK
            const id = results.rows[0].id;
            const token = jwt.sign({ id: id }, process.env.JWT_SECRETO, {
              expiresIn: process.env.JWT_TIEMPO_EXPIRA,
            });
            console.log("token: " + token + " para el usuario: " + email);
            const cookiesOptions = {
                expire: new Date(
                  Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
                ),
                httpOnly: true,
              };
              res.cookie("jwt", token, cookiesOptions);
            res.redirect('/')
        }
      );
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const pass = req.body.pass;

    if (!email || !pass) {
      res.render("login", {
        alert: true,
        alertTitle: "Advertencia",
        alertMessage: "Ingrese un email y password",
        alertIcon: "info",
        showConfirmButton: true,
        timer: 2000,
        ruta: "login",
      });
    } else {
      conection.query(
        "SELECT * FROM users WHERE email = $1",
        [email],
        async (error, results) => {
          if (
            results.length == 0 ||
            !(await bcrypt.compare(pass, results.rows[0].password))
          ) {
            res.render("login", {
              alert: true,
              alertTitle: "Error",
              alertMessage: "Email y/o Password incorrectas",
              alertIcon: "error",
              showConfirmButton: true,
              timer: 2000,
              ruta: "login",
            });
          } else {
            //inicio de sesion OK
            const id = results.rows[0].id;
            const token = jwt.sign({ id: id }, process.env.JWT_SECRETO, {
              expiresIn: process.env.JWT_TIEMPO_EXPIRA,
            });
            module.exports = token
            console.log("token: " + token + " para el usuario: " + email);

            const cookiesOptions = {
              expire: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
              ),
              httpOnly: true,
            };
            res.cookie("jwt", token, cookiesOptions);
            res.render("login", {
              alert: true,
              alertTitle: "Conexion exitosa",
              alertMessage: "LOGIN CORRECTO!",
              alertIcon: "success",
              showConfirmButton: false,
              timer: 1000,
              ruta: "",
            });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

exports.isAuthenticated = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
       const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      conection.query(
        "SELECT * FROM users WHERE Id = $1",
        [decodificada.id],
        (error, results) => {
          if (!results) {
            return next();
          }
          req.user = results.rows[0];
          return next();
        }
      );
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    res.redirect("/login");
  }
};

exports.logout = (req, res)=>{
    res.clearCookie('jwt')
    return res.redirect('/')
};

