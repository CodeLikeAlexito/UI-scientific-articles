import React from 'react';
import {useNavigate} from "react-router-dom";


const ArticleCard = ({ article }) => {

    const navigate = useNavigate();
    const isApproved = article.status === 'APPROVED' ? true : false;
    

    const redirectToArticleInfo = (id) => {
        navigate(`/articles/${id}`);
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
                    onClick={() => redirectToArticleInfo(article.articleId)}
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