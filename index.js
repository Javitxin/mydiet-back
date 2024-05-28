const express = require('express')

const app= express();
const dotenv = require('dotenv')
const cors = require('cors')
const router = require('./src/routes/dietRoutes.js')
dotenv.config();

const PORT = process.env.PORT || 3000



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);


app.listen(PORT, () =>{
    console.log(`Express listening on http://localhost:${PORT}`)
})