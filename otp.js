import express from 'express';
const app = express();
app.use('view engine','ejs');
app.get('/',(req,res)=>{
    res.send('Hello')
})
app.listen(3000,()=>{
    console.log("server is listening on port 3000")
})