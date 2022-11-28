const {Client} = require('pg')

const client = new Client("postgres://postgres:Datufrend77@rds-diagc4.cwoo68mp5s5g.us-east-1.rds.amazonaws.com:5432/diagc4") 

const conection = new Client({
    connectionString: "postgres://postgres:Datufrend77@rds-diagc4.cwoo68mp5s5g.us-east-1.rds.amazonaws.com:5432/diagc4",
    ssl: {
      rejectUnauthorized: false
    }
  });
conection.connect((error)=>{
    if(error){
        console.log('El error de conexion es: '+error)
        return
    }
    console.log('Conectado a la BD Pg')
})

module.exports = conection