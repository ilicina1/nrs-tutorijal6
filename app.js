
const express = require('express')
const app = express()
const sqlite3 = require('sqlite3').verbose();
const port = 3001


export function befAndAftEach() {
  let db = new sqlite3.Database('./db/baza.db', sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
          console.error(err.message);
      }
      console.log('Connected to the baza database.');
  });


  db.serialize(() => {
      db.all(`SELECT NAZIV
                   FROM grad`, (err, rows, fields) => {
          if (err) {
              console.error(err.message);
          }

          res.json(JSON.stringify(rows));


      });
  });


  // close the database connection
  db.close((err) => {
      if (err) {
          return console.error(err.message);
      }
      console.log('Close the database connection.');
  });
}

export function startDataBase() {
  let db = new sqlite3.Database('./db/baza.db', sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
          console.error(err.message);
      }
      console.log('Connected to the baza database.');
  });
}

export function closeDataBase() {
  // close the database connection
  db.close((err) => {
      if (err) {
          return console.error(err.message);
      }
      console.log('Close the database connection.');
  });
}


app.get('/gradovi', (req, res) => {
    const gradovi = [];
    // code to retrieve an article...
    let db = new sqlite3.Database('tut8.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the baza database.');
    });


    db.serialize(() => {
        db.all(`SELECT NAZIV
                 FROM grad`, (err, rows, fields) => {
            if (err) {
                console.error(err.message);
            }

            res.json(JSON.stringify(rows));


        });
    });


    // close the database connection
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
});

app.post('/grad', (req, res) => {

    let db = new sqlite3.Database('tut8.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the baza database.');
    });


    db.run(`INSERT INTO grad VALUES (4, 'Sarajevo', 12345)`, function (err) {
        if (err) {
            return console.log(err.message);
        }

        console.log(`A row has been inserted - rowid ${this.lastID}`);
    });


    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close database connection.');
    });


    res.send("Successfull post");
});

app.put('/gradovi/:id', (req, res) => {
    const { id } = req.params;
    // code to update an article...
    let db = new sqlite3.Database('tut8.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });


    db.serialize(() => {
        db.each(`UPDATE grad
        SET NAZIV = ?
        WHERE ID = ?`, [ id], function (err) {
            if (err) {
                return console.error(err.message);
            }
            console.log(`Row(s) updated: ${this.changes}`);

        });
    });

    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
    res.send("Successfull put");
});

app.get('/gradovi/:id', (req, res) => {
    const { id } = req.params;

    let db = new sqlite3.Database('tut8.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the baza database.');
    });


    db.serialize(() => {
        db.each(`SELECT NAZIV
                 FROM grad 
                 WHERE ID = ?`, [id], (err, row) => {
            if (err) {
                console.error(err.message);
            }

            res.json(JSON.stringify(row));


        });
    });


    // close the database connection
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
});



app.delete('/gradovi/:id', (req, res) => {
    const { id } = req.params;
    // code to delete an article...
    let db = new sqlite3.Database('tut8.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the baza database.');
    });


    db.serialize(() => {
        db.all(`DELETE
                 FROM grad
                 WHERE ID = ? `, [id], (err, row) => {
            if (err) {
                console.error(err.message);
            }

            res.json("Successfull delete");


        });
    });


    // close the database connection
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
});

app.use(express.static("public"));
app.use(express.static(__dirname));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/" + "index.html");
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

var server = app.listen(3000)
module.exports = server