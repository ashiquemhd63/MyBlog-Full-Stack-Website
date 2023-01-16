
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { articles } from "./article-content";
import NotFoundPage from "./NotFoundPage";
import axios from 'axios';
import CommentsLsit from "../components/CommentsList";
import AddCoomentForm from "../components/AddCommentForm";
const ArticlesPage = () => {
    const params = useParams();
    const articleId = params.articlesId
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
    useEffect(() => {
        const loadArticleInfo = async () => {
            const response = await axios.get(`/api/articles/${articleId}`);
            console.log('from response')
            console.log(response)
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo)

        }

        loadArticleInfo();

    }, []);



    //Finding the article content
    const article = articles.find(article => article.name === articleId);
    const addUpvote = async () => {
        const response = await axios.put(`/api/articles/${articleId}/upvote`);
        const newArticleInfo = response.data;
        console.log('add upvote')
        console.log(newArticleInfo)
        setArticleInfo(newArticleInfo);
    }
    if (!article) {
        return <NotFoundPage />
    }
    return (
        <>
            <h1>{article.title}</h1>
            <div className="upvotes-section">
                <button onClick={addUpvote}>Upvote</button>
            </div>
            <p>this artcles has {articleInfo.upvotes} upvotes</p>
            {article.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
            ))}
            <AddCoomentForm
                articleName={articleId} 
                onArticleUpdated = {updatedArticle => setArticleInfo(updatedArticle)}
            />
            <CommentsLsit comments={articleInfo.comments} />
        </>


    )
}

export default ArticlesPage;
