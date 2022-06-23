import React from 'react';
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from 'react'


const ArticleCard = ({ article }) => {

    const navigate = useNavigate();
    const  [id, setId] = useState();
    

    const redirectToArticleInfo = (e) => {
        setId(article.articleId);
        id && navigate(`/articles/${id}`);
    }

    return (
        <div className="article" key={article.articleId}>

            <div>
                <p>{article.year}</p>
            </div>

            <div>
                <img src={article.coverPage !== "" ? `data:image/jpeg;base64,${article.coverPage}` : 'https://via.placeholder.com/400'}  
                    alt={article.title} onClick={redirectToArticleInfo} />
            </div>

            <div>
                <span>{article.genre}</span>
                <h3>{article.title}</h3>
            </div>

      </div>
    )
}

export {ArticleCard};