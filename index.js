const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

const productRouter = require('./src/routers/product.router');
app.use('/', productRouter);

const authRouter = require('./src/routers/auth.router');
app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});