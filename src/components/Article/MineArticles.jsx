import React from 'react';
import {NavigationBar} from '../NavigationBar';
import {useState, useEffect, useContext} from 'react';
import {ArticleCard} from './ArticleCard';
import AuthContext from "../../util/auth-context";

const MineArticles = () => {

    const authCtx = useContext(AuthContext);
    const URL = `/v1/api/article/username/`;

    const [articles, setArticles] = useState([]);

    const fetchArticles = async (username) => {
        
        const response = await fetch(`${URL}${username}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authCtx.token}`,
          }
        });
        const data = await response.json();
        if(response.ok) {
          setArticles(data);
        }
        
    };

    useEffect(() => {
        
        if(localStorage.getItem('username')) {
          fetchArticles(localStorage.getItem('username'));
        }
    }, [localStorage.getItem('username')]);

    return (
        <>
        <div><NavigationBar /></div>
        <br></br>
        <div className='container'><h2>Articles published by me</h2></div>
        {articles?.length > 0 ? (
            <div className="container">
              {articles.map((article) => (
                  <ArticleCard article = {article} key = {article.articleId}/>
                ))}
            </div>
          ) : (
            <>
            <div className="empty">
              <h2>User {authCtx.username} still hasn't posted an article yet.</h2>
            </div>
            <br></br>
            <div className='container-sm text-center'>
                <h3>Publish your first article now!</h3>
                <a href="/new-article" className="btn btn-info text-center">PUBLISH ARTICLE</a>  
              </div>
            </>
          )}
        </>
    );
}

export {MineArticles}