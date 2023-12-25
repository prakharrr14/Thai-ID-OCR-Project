const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const citizenRoutes = require('./routes/citizenRoutes')
require('./connection')
const detectText = require('./imageExtract')
const Citizen = require('./models/Citizen');

const app = express();
const multer = require('multer')

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.use('/citizens',citizenRoutes);


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images')
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname)
  }
})

const upload = multer({ storage: storage }).single('file')

app.post('/image', (req, res) => {
    upload(req, res, async (err) => {
        const uuid = uuidv4();
      if (err) {
        res.sendStatus(500);
      }
      let data = await detectText('./images/'+req.file.originalname);
      console.log(data);
      try{
        await Citizen.create(data);
        res.status(201).json({id:uuid});
    }
    catch(err){
        let msg;
        if(err.code == 11000){
            msg = "Citizen already exists";
        }
        else{
            msg = err.message;
        }
        console.log(err);
        res.status(400).json(msg);
    }
    });
  });

const PORT = 5001;

app.listen(PORT,()=>{
    console.log('listening on port ',PORT);
});