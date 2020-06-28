
const mysql = require('mysql');


let connection = mysql.createConnection({
  //host = localhost = trabajo en local => en produccion cambia
  host     : 'localhost',
  //user = usuario de la base de datos
  user     : 'root',
  
  password : 'root',
  //database = base de datos a la que nos conectamos
  database : 'phones'
});

connection.connect(
  function(error){
    if(error){
      throw error;
    } else {
      console.log('Conexión correcta')
    }
  }
);

module.exports = connection;