import express from 'express';
import cors from 'cors';
import economy from './economy.json'
import technology from './technology.json'
import world from './world.json'

// criado devido um retorno que tras todas as noticias
const GROUP_NEWS = {
    economy,
    technology,
    world
}

//definindo para montar o servidor
const app = express()
const PORT = process.env.PORT || 3000;

//definindo que a aplicação usa cors que pode ter uma chamada
app.use(cors())

app.get('/api', function (req, res) {
    res.json({
        economy,
        technology,
        world
    })
})

app.get('/api/:subject', function (req, res) {
    const { subject } = req.params
    res.json(GROUP_NEWS[subject])
})

app.get('/api/:subject/:id', function (req, res) {
    const { subject, id } = req.params
    const allNews = GROUP_NEWS[subject]
    const news = allNews.value.find(news => news.id === id)
    res.json(news)
})

app.listen(PORT, function () {
    console.log(`Server running on ${PORT} PORT`)
})