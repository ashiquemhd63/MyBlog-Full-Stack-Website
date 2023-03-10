import { useState } from "react";
import axios from "axios";

const AddCoomentForm = ({articleName, onArticleUpdated}) => {
    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');

    const addComment = async () => {
        console.log('hello')
        const response = await axios.post(`/api/articles/${articleName}/comments`,{
            postedBy : name,
            text: commentText
        });
        const updatedyArticle = response.data;
        onArticleUpdated(updatedyArticle);
        setCommentText('');
        setName('');
    }
    return (
        <div id='add-comment-form'>
            <h3>Add a comment</h3>
            <label>
                Name:
                <input
                    value = {name}
                    onChange = {e => setName(e.target.value)}
                    type="text" />
            </label>
            <label>
                Comment:
                <textarea
                    value={commentText}
                    onChange={e => {setCommentText(e.target.value)}}
                    rows="4" cols= "50">

                </textarea>
            </label>
            <button onClick={addComment}>Add Comment</button>


        </div>
    )
}

export default AddCoomentForm;