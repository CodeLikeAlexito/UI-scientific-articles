import React from 'react';

const ArticleCard = ({ article }) => {
    return (
        <div className="article" key={article.articleId}>

            <div>
                <p>{article.year}</p>
            </div>

            <div>
                <img src={article.coverPage !== "" ? `data:image/jpeg;base64,${article.coverPage}` : 'https://via.placeholder.com/400'}  alt={article.title}/>
            </div>

            <div>
                <span>{article.genre}</span>
                <h3>{article.title}</h3>
            </div>

      </div>
    )
}

export {ArticleCard};