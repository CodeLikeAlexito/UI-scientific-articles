import React from 'react';
import {ArticleCard} from './ArticleCard'
import SearchIcon from './search.svg';
import {useState, useEffect} from 'react'
import "./Article.css"
import {NavigationBar} from '../NavigationBar'

const Articles = () => {

  //TODO check URLS everywhere

  const defaultSelectedDropdownListValue = 'title';

  const [selectedValue, setSelectedValue] = useState(defaultSelectedDropdownListValue);
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('', selectedValue); //TODO Fix searching to be by keywords/title/fieldOfScience

  const searchArticles = async (searchString, searchCriteria) => {

    let URL;
    console.log('Search string: '+ searchString);

    console.log("Search criteria: " + searchCriteria);
    
    if(searchCriteria === 'title')
      URL = "http://localhost:4002/v1/api/article/";

    if(searchCriteria === 'keyword'){

      if(typeof searchString === 'string' && searchString.trim().length === 0) {
        console.log('Here');
        URL = "http://localhost:4002/v1/api/article/";
      } else {
        URL = "http://localhost:4002/v1/api/article/keyword-search/";
      }
    }
      

    if(searchCriteria === 'fieldOfScience') {

      if(typeof searchString === 'string' && searchString.trim().length === 0) {
        console.log('Here');
        URL = "http://localhost:4002/v1/api/article/";
      } else {
        URL = "http://localhost:4002/v1/api/article/science/";
      }

    }
      

    console.log(`${URL}${searchString}`);

    const response = await fetch(`${URL}${searchString}`);
    const data = await response.json();
    setArticles(data);
    console.log(data);  
  }

  useEffect(() => {
    searchArticles('', defaultSelectedDropdownListValue);
  }, []);

  const handleSelectDropdownChange = (event) => {
    console.log(event.target.value);
    setSelectedValue(event.target.value);
  }

  return (
    <>
    <div><NavigationBar /></div>
    <div className="app">
      <h1>Scientific Articles</h1>
      <div>
        <p>Please select search criteria. The default search criteria is by <b>Title</b></p>
      </div>

      <select className="form-select" aria-label="Default select example" value={selectedValue} onChange={handleSelectDropdownChange}>
        <option value="title">Search by title</option>
        <option value="keyword">Search by keyword</option>
        <option value="fieldOfScience">Search by field of sceince</option>
      </select>

      <div className="search">
        {/* Todo - add button selection by what criteria to search - title / keywords / fieldOfScience. After that expect for searchTerm passed selected criteria as param in searchArticles */}
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search for articles'
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchArticles(searchTerm, selectedValue)}
        />
      </div>
      

      {articles?.length > 0 ? (
            <div className="container">
              {articles.map((article) => (
                  <ArticleCard article = {article} key = {article.articleId}/>
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