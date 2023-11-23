const express = require("express");
const app = express();
const cors = require('cors');

const port = process.env.PORT || 5000;

const catagories = require('./data/catagories.json'); // it's catagories names
const news = require("./data/news.json")
app.use(cors());

app.get('/', (req, res) => {
    res.send('Dragon is running')
})

/**
 * 3 ta case e data load korte hobe 
 * 1. all news
 * 2. id wise news (jekono ekta news load hobe)
 * 3. category wise news load (catagory wise onekgula news load hobe, 1 catagory er onekgula news thakte pare.)
 * 
*/

app.get('/catagories', (req, res) => {
    res.send(catagories) // return catagories names
})

app.get("/news", (req, res) => {
    res.send(news) // returns all news
})

// id onujayi news paoa;
app.get("/news/:id", (req, res) => {
    // id ta ke pawa
    const id = req.params.id;
    console.log(id);
    // id onujayi news ta ke paowa
    const selectedNews = news.find(n => n._id === id);
    // tarpor send kore dewa
    res.send(selectedNews); // returns 1 news judging id
})

// returns catagory wise news
app.get('/catagories/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id === 0) {
        res.send(news);
    }
    else {    
        const catagoryNews = news.filter(n => parseInt(n.category_id) === id);
        res.send(catagoryNews);
    }

})

app.listen(port, () => {
    console.log(`DRAGON is running on port: ${port}`);
})