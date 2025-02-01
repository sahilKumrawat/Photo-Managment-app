const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const dotenv = require('dotenv')

dotenv.config();
require('./Models/db');
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin:  "*",
    credential : true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}

app.get('/work', (req, res) => {
    res.send('working server....');
});

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
