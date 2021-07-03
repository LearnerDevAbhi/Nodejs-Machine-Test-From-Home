const mongoose = require("mongoose");

const studentSchema=new mongoose.Schema({
name:{
    type: String,
        trim: true,
        required: true,
},
email:{
    type: String,
        unique:true,
        required: true,
        lowercase: true,
        trim: true,

},
address:{
    type: String,
    lowercase: true,

}
})
const scoreSchema=new mongoose.Schema({
    first_round:{
     type:Number,
     max:10
    },
    second_round:{
         type:Number,
         max:10
    },
     third_round:{
         type:Number,
         max:10
    },
    studentBelong:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
})
const studentModel=mongoose.model('candidate',studentSchema)
const scores=mongoose.model('test_score',scoreSchema)
module.exports={
    studentModel,
    scores
}