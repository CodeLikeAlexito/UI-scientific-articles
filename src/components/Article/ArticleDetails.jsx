import React from 'react';
import "./Article.css"
import { NavigationBar } from '../NavigationBar';
import { useParams } from 'react-router-dom';
import {useState, useEffect, useContext} from 'react';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import Base64Downloader from 'common-base64-downloader-react';
import AuthContext from '../../util/auth-context';
// import { FacebookButton, FacebookCount } from "react-social";

const ArticleDetails = () => {

    const authCtx = useContext(AuthContext);

    const URL = "/v1/api/article/id/";
    const citedArticleUrl = "/v1/api/article/reference/count/";

    const { id } = useParams();
    const [article, setArticle] = useState('');
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [ countReference, setCountReference ] = useState();
    const [title, setTitle] = useState('');
    const [articleFetched, setArtticleFetched] = useState(false);

    // const getArticleById = async (id) => {
    //     const response = await fetch(`${URL}${id}`, {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': `Bearer ${authCtx.token}`,
    //         }
    //     });
    //     const data = await response.json();
    //     setArticle(data);
    // }

    // const getCountReferenceNumber = async (title) => {
    //     const response = await fetch(`${citedArticleUrl}${title}`, {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': `Bearer ${authCtx.token}`,
    //         }
    //     });
    //     const data = await response.json();
    //     setCountReference(data);
    // }

    const getArticleById = async (id) => {
        const articlesResponse = await fetch(`${URL}${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authCtx.token}`,
            }
        });
        const articleData = await articlesResponse.json();
        setArticle(articleData);

        // console.log("title "+ article.title);
        // console.log("title1 " + title);

        setArtticleFetched(true);
    }

    const getCountArticleReferences = async (title) => {
        const countReferencesResponse = await fetch(`${citedArticleUrl}${article.title}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authCtx.token}`,
            }
        });
        const countReferences = await countReferencesResponse.json();
        setCountReference(countReferences);
    }

    useEffect(() => {
        getArticleById(id);
    }, []);



    useEffect(() => {
        if(articleFetched) {
            getCountArticleReferences(article.title);
        } else {
            setCountReference(0);
        }
    }, [])

    // useEffect(() => {
    //     getCountReferenceNumber(article.title);
    // }, [])

    return (
        <>
        <div><NavigationBar /></div>
        <br></br>
        <div className="container-sm border border-dark" key={article.articleId}>
            <br></br>
            <div className="row">
                <div className="col">
                    <br></br>
                    <img src={article.coverPage !== "" ? `${article.coverPage}` : 'https://via.placeholder.com/400'}  
                        alt={article.title}
                        width="150" height="150"/>
                </div>
                <div className="col text-center ">
                    <br></br>
                    <h1 className="text-uppercase fw-bolder">{article.title} </h1>
                    <span>Academic research paper on <b>{article.fieldOfScience}</b></span>
                    <h5><b>Author/s:</b> {article.authors}</h5>
                </div>
                <div className='col'></div>
            </div>
            <br></br>
            <div className="container-sm border">
                <br></br>
                <div className="row">
                    <div className="col">
                        <h5 className='fw-bolder'>ACADEMIC JOURNAL</h5>
                        <p>{article.academicJournal}</p>
                        <p>{article.yearPublished}</p>
                    </div>
                    <div className="col">
                        <h5 className='fw-bolder'>FIELD OF SCIENCE</h5>
                        <p>{article.fieldOfScience}</p>
                    </div>
                </div>
            </div>
            <br></br>
            <div className='container-sm border'>
                <br></br>
                <div className='row'>
                    <div className='col'>
                        <h5 className='fw-bolder'>KEYWORDS</h5>
                        <p>{article.keywords}</p>
                        
                    </div>
                </div>
                <br></br>
            </div>
            <br></br>
            <div className='container-sm border'>
                <br></br>
                <div className='row'>
                    <h5 className='fw-bolder text-uppercase'>Total number of references</h5>
                    {/* <p>{countReference !== 'undefined' ? JSON.parse(countReference['count']) : 0}</p> */}
                    <p>{JSON.stringify(countReference)}</p>
                </div>
                <br></br>
            </div>
            <br></br>
            <div className='container-sm border'>
                <br></br>
                <div className='row'>
                    <div className='col'>
                        <Base64Downloader base64={article.articlePdf} downloadName={article.title} className='btn text-uppercase fw-bolder'>
                            Download PDF
                        </Base64Downloader>
                    </div>
                </div>
                <br></br>
            </div>
            <br></br>
            <div className='container' id='pdfViewr'>
                <label><h5>View PDF</h5></label>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
                    {article.articlePdf&&<Viewer fileUrl={article.articlePdf} plugins={[defaultLayoutPluginInstance]}></Viewer>}
                </Worker>
                {/* render this if we have pdfFile state null   */}
                {!article.articlePdf&&<h5>No file is selected yet</h5>}
            </div>
        <br></br>
        </div>
        </>
    );
};

export {ArticleDetails};