const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

require('./connection')

const PORT = 5001;

app.listen(PORT,()=>{
    console.log('listening on port ',PORT);
});