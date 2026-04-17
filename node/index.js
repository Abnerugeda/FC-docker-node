const express = require("express");
const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

const mysql = require("mysql2");

const sqlCreateTable = `CREATE TABLE IF NOT EXISTS people(id int auto_increment, name varchar(200), linkedin varchar(200), primary key(id));`;

const sql = `INSERT INTO people(name, linkedin) values ("ABNER UGEDA", "https://www.linkedin.com/in/abner-ugeda/");`;

const connection = mysql.createConnection(config);
connection.query(sqlCreateTable, (err) => {
  if (err) return res.status(500).send(err.message);
});

app.get("/", (_req, res) => {
  connection.query(sql, (err) => {
    if (err) return res.status(500).send(err.message);
    
    connection.query("SELECT * FROM people", (err, results) => {
      if (err) return res.status(500).send(err.message);
      let html = `<h1>Full Cycle Rocks!</h1><ul>`
      results.map((result) => {
        html += `
            <li>Meu nome é ${result.name}, Add no linkedin: ${result.linkedin}</li>
        `
      })

      html += `</ul>`
      res.send(html);
    });
  });
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
