import React from 'react';
import {useNavigate} from "react-router-dom";
import {useState} from 'react'


const ArticleCard = ({ article }) => {

    const navigate = useNavigate();
    const [id, setId] = useState();
    const isApproved = article.status === 'APPROVED' ? true : false;
    console.log(isApproved);
    

    const redirectToArticleInfo = () => {
        console.log('test');
        console.log(article.coverPage);
        setId(article.articleId);
        console.log(article);
        
        id && navigate(`/articles/${id}`);
    }

    return (
        <>
        {isApproved ?
        <div className="article" key={article.articleId}>
            <div>
                <p>{article.yearPublished}</p>
            </div>

            <div>
                <img src={article.coverPage !== "" ? `${article.coverPage}` : 'https://via.placeholder.com/400'}  
                    alt={article.title}
                    onClick={redirectToArticleInfo}
                />
            </div>

            <div>
                <span>{article.fieldOfScience}</span>
                <h3>{article.title}</h3>
                <span>{article.status}</span>
            </div>
      </div>
      : <div className='article' key={article.articleId}>
            <div>
                <p>{article.yearPublished}</p>
            </div>

            <div>
                <img src={article.coverPage !== "" ? `${article.coverPage}` : 'https://via.placeholder.com/400'}  
                    alt={article.title}
                />
            </div>

            <div>
                <span>{article.fieldOfScience}</span>
                <h3>{article.title}</h3>
                <span>{article.status}</span>
            </div>

        </div>
    
    }

      </>
    )
}

export {ArticleCard};