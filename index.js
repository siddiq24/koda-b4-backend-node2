const express = require('express');
const app = express();
const port = 3000;
const router = require('./src/routers');

app.use(express.json());
app.use(express.urlencoded());

app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});