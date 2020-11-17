const sql = require('mssql');
const express = require('express');
const app = express();
const port = 3000;
const appUrl = 'http://127.0.0.1:5500';
const cors = require('cors');

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

var corsOptions = {
  origin: appUrl,
  optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions));

//get
app.get('/display', (req, res) => {
  const conn = new sql.ConnectionPool(dbConfig);
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

//delete
app.post('/delete/', (req, res) => {
  const conn = new sql.ConnectionPool(dbConfig);
  var reqDel = new sql.Request(conn);
  console.log(req.body);
  var { id } = req.params.id;
  

  conn.connect(function(err){
    if (err) {
      console.log(err);
      return;
    }
    else{
      id = parseInt(id, 10); 
     
      reqDel.query('DELETE FROM MyUsers WHERE Id = ?'[id],function (err, recordset) {      
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





