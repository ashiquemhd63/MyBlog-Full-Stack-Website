import express from 'express';

let articlesInfo = [{
    name: 'learn-react',
    upvotes: 0,
    comments: []
}, {
    name: 'learn-node',
    upvotes: 0,
    comments: []
}, {
    name: 'mongodb',
    upvotes: 0,
    comments: []
}];

const app = express();
//Getting post data values
//if you not used express.json() it will show undefined on req.body
app.use(express.json());

app.put('/api/articles/:name/upvote', (req, res) => {
    const { name } = req.params;
    const article = articlesInfo.find(a => a.name === name);
    if (article) {
        article.upvotes += 1;
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