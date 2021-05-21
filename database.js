
const sqlite3 = require('sqlite3').verbose();

export function befAndAftEach() {
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
  }
  
  export function startDataBase() {
    let db = new sqlite3.Database('tut8.db', sqlite3.OPEN_READWRITE, (err) => {
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