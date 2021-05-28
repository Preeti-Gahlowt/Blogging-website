const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const articleRouter = require('./routes/articles')
const Article = require('./models/article')
const app = express()


mongoose.connect('mongodb://localhost/blog', {
    useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true
})

app.set('view engine', 'ejs')

//this will help us to access parameter suuch as title, description
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))


app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
})
app.use('/articles', articleRouter)

app.listen(7000)
