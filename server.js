import express from 'express';

const app = express();

const port = 5080;

app.use('/', express.static('./dist'));

// app.get(' ', (req,  res) => {
//     console.log(req.path);
//     res.statusCode = 200;
//     res.send('Requested path: '+ req.path);
//     res.end();
// });

app.listen(port);