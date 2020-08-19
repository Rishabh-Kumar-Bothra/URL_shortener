const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cryptoRandom = require('crypto-random-string');
const cors = require('cors');
const path = require('path')
const helmet = require('helmet');
const shorturl = require('./models/shortUrl');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(helmet());

mongoose.connect(process.env.dbURI,{useUnifiedTopology:true, useNewUrlParser: true })
.then(()=>{
    console.log("mongo connection success !");
    app.listen(PORT || 3000, ()=>{
        console.log(`server started on port number ${PORT || 3000}`);
    })
})
.catch((err)=>{
    console.log('mongo connection unsuccessfull error: ',err);
})

app.use(express.static(path.join(__dirname , 'static/')))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine', 'ejs');


// testing mongo connection by saving data
// app.post('/', async (req,res)=>{
//     let phele_ka = await shorturl.findOne({full: req.body.long_url});
//     console.log(phele_ka);
//     // phele_ka.then((data)=>{
//     //     if(data)
//     //         console.log("phele se pda hai")
//     //     else
//     //         console.log("nahi pda")
//     // })
//     // .catch((err)=>{
//     //     console.log(err)
//     // })
//     // let new_set = new shorturl({
//     //     full: req.body.long_url,
//     //     short: encoded
//     // })
//     // new_set.save();
//     // console.log(btoa('5f37d4f8a7130a386ba607a3'))
//     // console.log(atob('aHR0cDovL2hlcm9rdWFwcC5jb20='))
//     console.log("yedekho",await shorturl.find({full:req.body.long_url}).countDocuments() > 0)
//     // console.log(cryptoRandom({length: 8, type: 'base64'}))
//     res.send('success!')
// })



app.get('/',async (req,res)=>{
    const shortUrls = await shorturl.find();
    res.render('index',{shortUrls: shortUrls});
})

app.get('/:short',async (req,res)=>{
    // console.log(req.params.short)
    let url = await shorturl.findOne({short:req.params.short});
    if(url){
        url.clicks++;
        await url.save();
        res.redirect(url.full);
    }
    else{
        res.redirect('/')
    }
    // console.log('url',url)
})

app.post('/addUrl',async (req,res)=>{

    const url = req.body.full;
    console.log(url);
    let already_exists = await shorturl.findOne({full: url});
    if(already_exists){
        res.redirect('/');
    } 

    else{

        let short_url = cryptoRandom({length: 7, type: 'base64'});
        let checker = await shorturl.find({short:short_url}).countDocuments() > 0 

        while(checker){

            short_url = cryptoRandom({length: 7, type: 'base64'});

            checker = await shorturl.find({short:short_url}).countDocuments() > 0;
        }

        let new_pair = new shorturl({
            full: url,
            short:short_url,
            clicks:0
        })

        await new_pair.save();

        res.redirect('/');
    }

})