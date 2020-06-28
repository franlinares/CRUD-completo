var express = require('express');
var router = express.Router();

let connection = require('../config/db.js')

/* GET users listing.*/

router.get('/', function(req, res) {
 
    res.render('user')

});

/* GET users listing. ---READ---- */

router.get('/Listado', function(req, res) {

  let sql = `SELECT * FROM user, phone WHERE user.phone_id = phone.phone_id`;

  connection.query(sql, function(err, results){
    if(err){
      throw err;
    }
    res.render('Listado', {results});

  })

});

//POST users list ------------------ CREATE --------

router.post('/guardar', function(req, res){

  let model = req.body.model;
  let color = req.body.color;
  let name = req.body.name;
  let last_name = req.body.last_name;

  let sqlPhone = `INSERT INTO phone (model, color) VALUES ('${model}', '${color}')`

  connection.query(sqlPhone, function(err, result){

    let phone_id = result.insertId;
    if(err){
      throw err;
    }
    let sql = `INSERT INTO user (name, last_name, phone_id) VALUES ('${name}', '${last_name}', ${phone_id})`
   
    connection.query(sql, function(err, results){
      if (err) {
        throw err;
      } 
        res.redirect('Listado')
    })
    
  })

})


// GET users eliminar ---------- DELETE -------

router.get('/eliminar/:user_id', function(req, res) {
  // RECOGEMOS EL ID DEL USUARIO CON EL req.p
    console.log(req.params)
    //req.body vs req.params 
    //req.body recoge los datos del body/formulario
    //req.params recoge los parametros (variables) de la URL
    let user_id = req.params.user_id;
    let sql = `DELETE FROM user  WHERE user_id = ${user_id} `

    connection.query(sql, function(err, result){
      if(err){
        throw err;
      }
      res.redirect('/users/Listado')
    })
    
})


// Get users/perfil para ver el perfil individual y para iniciar la edicion

router.get('/perfil/:user_id', function(req, res){
  console.log(req.params)
  let user_id = req.params.user_id;
  let sql = `SELECT * FROM user, phone WHERE user.phone_id = phone.phone_id AND user_id = ${user_id}`;

  connection.query(sql, function(err, result){
    if(err)throw err;
    res.render('userProfile', {result})
  })
  
})

//GET y POST users Editar  ----- EDIT----------

router.get('/edit/:user_id', function(req, res){
  console.log(req.params)
  let user_id = req.params.user_id;
  let sql = `SELECT * FROM user, phone WHERE user.phone_id = phone.phone_id AND user_id = ${user_id}`;

  connection.query(sql, function(err, result){
    if(err)throw err;
    res.render('edit', {result});
  })

})

router.post('/update/:user_id', function(req, res) {
  console.log(req.params);
  let user_id = req.params.user_id;
  console.log(req.body);
  let name = req.body.name;
  let last_name = req.body.last_name;
  let model = req.body.model;
  let color = req.body.color;
  // let name = req.body.name;
  let sql = `UPDATE  user SET name = '${name}', last_name = '${last_name}' WHERE user_id= ${user_id}`;
  connection.query(sql, function(err, result) {
    if (err) throw err;
  })
  let sqlPhone = `UPDATE phone SET model = '${model}', color = '${color}' WHERE phone_id = (SELECT phone_id FROM user WHERE user_id = ${user_id}) `
  connection.query(sqlPhone, function(err, results){
    if (err) throw err;
    res.redirect('/users/Listado')
  })
})

module.exports = router;
