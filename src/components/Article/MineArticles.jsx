import React from 'react';
import {NavigationBar} from '../NavigationBar';
import {useState, useEffect, useContext} from 'react';
import {ArticleCard} from './ArticleCard';
import AuthContext from "../../util/auth-context";

const MineArticles = () => {

    const authCtx = useContext(AuthContext);

    const [articles, setArticles] = useState([]);
    const URL = `http://localhost:4002/v1/api/article/username/${authCtx.username}`;

    const fetchArticles = async () => {
        const response = await fetch(`${URL}`);
        const data = await response.json();
        setArticles(data);
    };

    useEffect(() => {
        fetchArticles('');
      }, []);

    return (
        <>
        <div><NavigationBar /></div>
        <br></br>
        {articles?.length > 0 ? (
            <div className="container">
              {articles.map((article) => (
                  <ArticleCard article = {article} key = {article.articleId}/>
                ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No articles to be fetched</h2>
            </div>
          )}
        </>
    );
}

export {MineArticles}