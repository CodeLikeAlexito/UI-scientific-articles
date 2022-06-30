import React from 'react';
import "./Article.css"
import { NavigationBar } from '../NavigationBar';
import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import Base64Downloader from 'common-base64-downloader-react';
// import { FacebookButton, FacebookCount } from "react-social";

const ArticleDetails = () => {

    const URL = "http://localhost:4002/v1/api/article/id/";

    const { id } = useParams();
    const [article, setArticle] = useState('');
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const getArticleById = async (id) => {
        const response = await fetch(`${URL}${id}`);
        const data = await response.json();
        setArticle(data);
        console.log(data);
    }

    useEffect(() => {
        getArticleById(id);
    }, []);

    // const sharePDF = async () => {
    //     const shareOptions = {
    //       title: 'Share PDF File',
    //       url: article.articlePdf,
    //     };
    
    //     try {
    //       const ShareResponse = await Share.open(shareOptions);
    //     } catch (error) {
    //       console.log('sharePdfBase64 Error =>', error);
    //     }
    //   };

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
                        {/* <p>{article.keywords.map(keyword => <p>{keyword}</p>)}</p> */}
                        
                    </div>
                </div>
                <br></br>
            </div>
            <br></br>
            <div className='container-sm border'>
                <br></br>
                <div className='row'>
                    <h5 className='fw-bolder text-uppercase'>Total number of references</h5>
                </div>
                <br></br>
            </div>
            <br></br>
            <div className='container-sm border'>
                <br></br>
                <div className='row'>
                    <div className='col'>
                        <h5 className='fw-bolder text-uppercase'>Share paper</h5>
                        {/* <FacebookButton url={article.articlePdf} appId={707211553718532}>
                            <FacebookCount url={article.articlePdf} />
                            {" Share " + article.articlePdf}
                        </FacebookButton> */}
                    </div>
                    <div className='col'>
                        {/* <h5 className='fw-bolder text-uppercase'>Download PDF</h5> */}
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