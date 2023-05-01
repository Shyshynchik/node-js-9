const express = require('express');
const app = express();

app.get('/', function (req: any, res: any) {
   res.send("Hello world");
});

app.listen(3000);