   const express = require('express');
   require('./database/connectionDb');
      const {studentModel,scores}=require('./database/databse')
   const app = express()
   const port = 3000
   app.get('/', (req, res) => res.send('Welcome to node'))
   app.use(express.json())

   // to insert the document and assign the results
   app.post("/candidate",async (req,res)=>{
      var reqData=req.body;
      const student=new studentModel({name:reqData.name,email:reqData.email,address:reqData.address})
      try{
      var studentData= await student.save()
      res.send("data inserted")
      const studentScored=new scores({first_round:reqData.first_round,second_round:reqData.second_round,third_round:reqData.third_round,studentBelong:studentData._id});
      await studentScored.save()
   }catch(e){
      res.status(400).send(e)
      }
      
   })
   app.post('/gethighestscores',async(req,res )=>{
      try{
         var highestScore=0;
      var highestScorer;
      var fir_round=0
      var sec_round=0
      var thir_round=0
      var all_scorer=  await scores.find();
      const arrLength= all_scorer.length
      // res.send(all_scorer)
      // console.log(all_scorer)
      await all_scorer.forEach((value,index)=>{
         var sum=value.first_round+value.second_round+value.third_round
         if(sum>highestScore){
            highestScore=sum;
            highestScorer=value.studentBelong
         }
      })
const scorer= await studentModel.findById(highestScorer);
await all_scorer.forEach((value,index)=>{
    fir_round +=value.first_round ;
    sec_round +=value.second_round;
    thir_round +=value.third_round
})

 const averageScores ={
   ave_First_round:(fir_round/arrLength),
   ave_Second_round:(sec_round/arrLength),
   ave_Third_round:(thir_round/arrLength)
 }
res.send({
   Winner:scorer,
   AverageScoresofthestudent:averageScores
}  )
   
      }catch(e){
    res.send(e)
      }
      })
   app.listen(port, () => console.log(`Example app listening on port port! 3000`))