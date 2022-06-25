import React from 'react';
import "./Article.css"
import { NavigationBar } from '../NavigationBar';
import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react';

const ArticleDetails = () => {

    const URL = "http://localhost:4002/v1/api/article/id/";

    const { id } = useParams();
    console.log(id);
    const [article, setArticle] = useState('');

    const getArticleById = async (id) => {
        const response = await fetch(`${URL}${id}`);
        const data = await response.json();
        console.log(data);
        setArticle(data);
    }

    useEffect(() => {
        getArticleById(id);
    }, []);

    return (
        <>
        <div><NavigationBar /></div>
        <div className='container' key={article.articleId}>
            <div>
            <img src={article.coverPage !== "" ? `data:image/jpeg;base64,${article.coverPage}` : 'https://via.placeholder.com/400'}  
                    alt={article.title}/>
            </div>
            <div>{article.title}</div>
            <div>{article.genre}</div>
            <div>{article.year}</div>
            <div>{article.authors}</div>
            
        </div>
        </>
        
    );
};

export {ArticleDetails};