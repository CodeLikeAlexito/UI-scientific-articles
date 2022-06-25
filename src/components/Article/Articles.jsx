import React from 'react';
import {ArticleCard} from './ArticleCard'
import SearchIcon from './search.svg';
import {useState, useEffect} from 'react'
import "./Article.css"
import {NavigationBar} from '../NavigationBar'
import { Button } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";

const Articles = () => {

  const URL = "http://localhost:4002/v1/api/article/";

  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  

  const searchArticles = async (title) => {
    const response = await fetch(`${URL}${title}`);
    const data = await response.json();
    setArticles(data);
  }

  useEffect(() => {
    searchArticles('');
  }, []);

  const handleNewArticleClick = () => {
    navigate("/new-article")
  }

  return (
    <>
    <div><NavigationBar /></div>
    <div className="app">
      <h1>Scientific Articles</h1>
      <Button 
        variant="primary"
        onClick={handleNewArticleClick}  
      >
        New article
      </Button>{' '}

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search for articles'
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchArticles(searchTerm)}
        />
      </div>
      

      {articles?.length > 0 ? (
            <div className="container">
              {articles.map((article) => (
                  <ArticleCard article = {article}/>
                ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No articles found</h2>
            </div>
          )} 
    </div>
    </>
  );
};

export {Articles};