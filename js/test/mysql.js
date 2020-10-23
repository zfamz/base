let mysql = require('mysql');
let fs = require('fs');
let connection = mysql.createConnection({
  host: '10.3.2.151',
  user: 'root',
  password: 'root',
  database: 'nfdw_obs'
});

connection.connect();
connection.query('select * from mcmenu', function (error, results, fields) {
  if (error) {
    console.error(error.message);
  }
  fs.writeFileSync('menu-tempdata.js', JSON.stringify(results, null, 2));
});
connection.end();
