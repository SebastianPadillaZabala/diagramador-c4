const {Client} = require('pg')
//const mysql = require('mysql')

/*const client = new Client("postgres://postgres:Datufrend77@rds-diagc4.cwoo68mp5s5g.us-east-1.rds.amazonaws.com:5432/diagc4") 

const conection = new Client({
    connectionString: "postgres://postgres:Datufrend77@rds-diagc4.cwoo68mp5s5g.us-east-1.rds.amazonaws.com:5432/diagc4",
    ssl: {
      rejectUnauthorized: false
    }
  });*/

  /*
  const conection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'diagramador'
  })
  
  conection.connect((error)=>{
    if(error){
        console.log('El error de conexion es: '+error)
        return
    }
    console.log('Conectado a la BD MYSQL')
})*/

const conection = new Client({
  user: 'postgres', 
  password: '123', 
  host: 'localhost', 
  port: 5432, 
  database: 'diagramador', 
});

conection.connect()
  .then(() => {
    console.log('Conexión exitosa a la base de datos PostgreSQL en localhost');
  })
  .catch(error => {
    console.error('Error al conectar a la base de datos:', error);
  });

module.exports = conection