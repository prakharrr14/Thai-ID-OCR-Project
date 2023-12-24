const mongoose = require('mongoose');

const CitizenSchema = new mongoose.Schema({
    identification_number:{
        type:String,
        required:[true,"Can't be blank"]
    },
    name:{
        type:String,
        required:[true,"Can't be blank"],
    },
    last_name:{
        type:'string',
        required:[true,"Can't be blank"]

    },
    date_of_birth:{
        type:Date,
        required:[true,"Can't be blank"]
    },
    date_of_issue:{
        type:Date,
        required:[true,"Can't be blank"]
    },
    date_of_expiry:{
        type:Date,
        required:[true,"Can't be blank"]
    },
    status:{
        type:String,
        default:'ACTIVE'
    }
});

  

const Citizen = mongoose.model('Citizen',CitizenSchema);
module.exports = Citizen;

