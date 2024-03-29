import React from 'react';
import {ArticleCard} from './ArticleCard'
import SearchIcon from './search.svg';
import {useState, useEffect, useContext} from 'react';
import "./Article.css";
import {NavigationBar} from '../NavigationBar';
import AuthContext from '../../util/auth-context';;

const Articles = () => {

  const authCtx = useContext(AuthContext);

  const defaultSelectedDropdownListValue = 'title';

  const [selectedValue, setSelectedValue] = useState(defaultSelectedDropdownListValue);
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('', selectedValue); //TODO Fix searching to be by keywords/title/fieldOfScience

  const searchArticles = async (searchString, searchCriteria) => {

    let URL;
    
    if(searchCriteria === 'title')
      URL = "/v1/api/article/";

    if(searchCriteria === 'keyword'){

      if(typeof searchString === 'string' && searchString.trim().length === 0) {
        URL = "/v1/api/article/";
      } else {
        URL = "/v1/api/article/keyword-search/";
      }
    }
      

    if(searchCriteria === 'fieldOfScience') {

      if(typeof searchString === 'string' && searchString.trim().length === 0) {
        URL = "/v1/api/article/";
      } else {
        URL = "/v1/api/article/science/";
      }

    }

    const response = await fetch(`${URL}${searchString}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authCtx.token}`,
      },
    });
    
    const data = await response.json();
    console.log(JSON.stringify(data))
    setArticles(data); 
  }

  useEffect(() => {
    searchArticles('', defaultSelectedDropdownListValue);
  }, []);

  const handleSelectDropdownChange = (event) => {
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