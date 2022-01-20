const express = require('express')
const app = express()
const articleRouter = require('./routers/article')
const mongoose = require('mongoose')
const Articles = require('./modules/article')
const methodoverride = require('method-override')
// mongoose.createConnection('mongodb://localhost/blog')

mongoose 
 .connect('mongodb://localhost/blog', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
         })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

app.set('view engine', 'ejs')



app.use(express.urlencoded({ extended: true }))
app.use(methodoverride('_method'))

app.get('/', async (req,res)=>{
    const articles = await Articles.find().sort({
        createdAt: 'desc'
    });
    res.render('articles/index', {articles : articles})
})

app.use('/articles',articleRouter)

app.listen(5000)