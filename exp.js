//requirements
const sql = require('mssql');
const express = require('express');
const app = express();
const port = 3000;
const appUrl = 'http://127.0.0.1:5500';
const cors = require('cors');
//database config
var dbConfig = {
  server:'localhost\\SQLEXPRESS',
  user: 'sa',
  password: 'Velislavozz7',
  database: 'Test',
  "options": {
    "encrypt": true,
    "enableArithAbort": true
    }
};
const conn = new sql.ConnectionPool(dbConfig);

//corsOptions
var corsOptions = {
  origin: appUrl,
  optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions));

//get
app.get('/display', (req, res) => {
  var reqDis = new sql.Request(conn);

  conn.connect(function(err){
    if (err) {
      console.log(err);
      return;
    }
    else{
      console.log("Connection successful!")
      reqDis.query('select * from MyUsers', function (err, recordset) {
            
        if (err) {
          console.log(err)
        }
        else {
          res.send(recordset);
        }
      });
    }
   
  });
})
//create
app.post('/create', (req, res) => {
  let bodyParse = JSON.parse(req.body);
  const Username = bodyParse.username;
  const Password = bodyParse.password;
  console.log(Password + " -> " + Username);
});

//delete
app.delete('/delete/:id', (req, res) => {
  let reqDel = new sql.Request(conn);
  let id = req.params.id;
  
  conn.connect(function(err){
    if (err) {
      console.log(err);
      return;
    }
    else{
      id = parseInt(id, 10); 
      conn.query('DELETE FROM MyUsers WHERE Id = ' + id +';',function (err, recordset) {      
        if (err) {
          console.log(err)
        }
        else {
          res.send(recordset);
        }
      });
    }
  });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})





