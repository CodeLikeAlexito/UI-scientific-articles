import React from 'react';
import {ArticleCard} from './ArticleCard'
import SearchIcon from './search.svg';
import {useState, useEffect} from 'react'
import "./Article.css"
import {NavigationBar} from '../NavigationBar'

const Articles = () => {

  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  

  useEffect(() => {
    searchArticles("");
  }, []);

  const searchArticles = async (title) => {
    const response = await fetch(`http://localhost:4002/${title}`);
    const data = await response.json();

    console.log(data);
    setArticles(data);
  }

  return (
    <>
    <div><NavigationBar /></div>
    <div className="app">
      <h1>Scientific Articles</h1>

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
                  <ArticleCard article = {article} />
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