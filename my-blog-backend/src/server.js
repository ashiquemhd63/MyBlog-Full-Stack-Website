import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
//Getting post data values
//if you not used express.json() it will show undefined on req.body
app.use(express.json());

app.get('/api/articles/:name', async (req, res) => {
    const { name }= req.params;

    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    const db = client.db('react-blog-db'); //use react-blog-db
    const article = await db.collection('articles').findOne({name})
    console.log(article)
    if (article) {
        res.send(article)
    } else {
        res.send("Invalid content")
    }

})

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
    console.log(name)
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    const db = client.db('react-blog-db');
    await db.collection('articles').updateOne({ name }, {
        $inc : { upvotes : 1}
    });

    const article = await db.collection('articles').findOne({ name });
    console.log(article)

    // const article = articlesInfo.find(a => a.name === name);
    if (article) {
        
        res.send(`The ${name} article now has ${article.upvotes} upvotes`)
    } else{
        res.send('The article doesn\'t exist');
    }

});

app.post('/api/articles/:name/comments', (req, res) => {
    console.log("hello")
    const { name } = req.params;
    console.log(name)
    const { postedBy, text } = req.body;
    const article = articlesInfo.find(a => a.name === name);
    if (article) {
        article.comments.push({postedBy, text})
        res.send(article)
        
    } else{
        res.send('That article doesn\'t exist')
    }


})

app.listen(80, () => {
    console.log('Server is listening on port 80');
});