import express from 'express';
import {db, connctToDb} from './db.js'

const app = express();
//Getting post data values
//if you not used express.json() it will show undefined on req.body
app.use(express.json());

app.get("/api/articles/:name", async (req, res) => {
  const { name } = req.params;

  const article = await db.collection("articles").findOne({ name });
  console.log(article);
  if (article) {
    res.send(article);
  } else {
    res.send("Invalid content");
  }
});

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
    console.log(name)
    
    await db.collection('articles').updateOne({ name }, {
        $inc : { upvotes : 1}
    });

    const article = await db.collection('articles').findOne({ name });
    console.log(article)

    // const article = articlesInfo.find(a => a.name === name);
    if (article) {
        
        res.json(article);
    } else{
        res.send('The article doesn\'t exist');
    }

});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;    
    const { postedBy, text } = req.body;
   
    await db.collection('articles').updateOne({name}, {
        $push: { comments: {postedBy, text}}
    });
    const article = await db.collection('articles').findOne({  name });
    if (article) {
        
        res.json(article)
        
    } else{
        res.send('That article doesn\'t exist')
    }


})
connctToDb(()=> {
    console.log('successfully connected to the database');
    app.listen(80, () => {
        console.log('Server is listening on port 80');
    });

});
