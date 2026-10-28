# MySQL JavaScript Examples

These files are standalone Node.js examples for each MySQL concept from the W3Schools tutorial.

Run them with Node.js, for example:

```bash
node 01_mysql_get_started.js
```

Each file uses the pattern below:

```javascript
var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
```

Files included:

1. `01_mysql_get_started.js`
2. `02_mysql_create_database.js`
3. `03_mysql_create_table.js`
4. `04_mysql_insert_into.js`
5. `05_mysql_select_from.js`
6. `06_mysql_where.js`
7. `07_mysql_order_by.js`
8. `08_mysql_delete.js`
9. `09_mysql_drop_table.js`
10. `10_mysql_update.js`
11. `11_mysql_limit.js`
12. `12_mysql_join.js`
