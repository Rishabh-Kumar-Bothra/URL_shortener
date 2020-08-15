const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const atob = require('atob');
const btoa = require('btoa');
const shorturl = require('./models/shortUrl');

const app = express();
const PORT = process.env.PORT;

const uri = "mongodb+srv://shorturl:short123@short.on2xw.mongodb.net/short?retryWrites=true&w=majority";

mongoose.connect(uri,{useUnifiedTopology:true, useNewUrlParser: true })
.then(()=>{
    console.log("mongo connection success !");
    app.listen(PORT || 3000, ()=>{
        console.log(`server started on port number ${PORT || 3000}`);
    })
})
.catch((err)=>{
    console.log('mongo connection unsuccessfull error: ',err);
})


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine', 'ejs');


// testing mongo connection by saving data
app.post('/', (req,res)=>{
    console.log(req.body);
    let encoded = btoa(req.body.long_url);
    const new_set = new shorturl({
        full: req.body.long_url,
        short: encoded
    })
    new_set.save();
    console.log(atob('aHR0cDovL2hlcm9rdWFwcC5jb20='))
    res.send('success!')
})



app.get('/',(req,res)=>{
    res.send('hello check');
})










// app.listen(process.env.PORT || 3000,()=>{
//     console.log(`server started on ${process.env.PORT} || 3000`)
// });