import React, {useState} from 'react'

// Import Worker
import { Worker } from '@react-pdf-viewer/core';
// Import the main Viewer component
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// default layout plugin
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles of default layout plugin
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { NavigationBar } from '../NavigationBar';

import {
    MDBJumbotron,
    MDBCardText,
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol
  } from "mdbreact";

    const NewArticle = () => {

        // creating new plugin instance
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    // pdf file onChange state
    const [pdfFile, setPdfFile]=useState(null);

    // pdf file error state
    const [pdfError, setPdfError]=useState('');

    // for submit event
  const [viewPdf, setViewPdf]=useState(null);


    // handle file onChange event
    const allowedFiles = ['application/pdf'];
    const handleFile = (e) =>{
        let selectedFile = e.target.files[0];
        // console.log(selectedFile.type);
        if(selectedFile){
        if(selectedFile&&allowedFiles.includes(selectedFile.type)){
            let reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend=(e)=>{
            setPdfError('');
            setPdfFile(e.target.result);
            }
        }
        else{
            setPdfError('Not a valid pdf: Please select only PDF');
            setPdfFile('');
        }
        }
        else{
        console.log('please select a PDF');
        }
    }

      // form submit
    const handlePdfFileSubmit=(e)=>{
        e.preventDefault();
        if(pdfFile!==null){
        setViewPdf(pdfFile);
        }
        else{
        setViewPdf(null);
        }
    }


    return (
        <>
            <div><NavigationBar /></div>
            <MDBJumbotron>
                <div className='lead display-3 text-center'>Create new article</div>
                <br />
                <MDBCardText className='text-center'>Here you can add and create new article. Please notice that after creation, your article won't be automatically posted.</MDBCardText>
                <MDBCardText className='text-center'>Administrator needs to review what you've posted and if everything is okay, your article will be publsihed.</MDBCardText>
            </MDBJumbotron>
            <div className="container">

            {/* Upload PDF */}
            <form className='form-group' onSubmit={handlePdfFileSubmit}>

                <label><h5>Upload PDF</h5></label>
                <br></br>

                <input type='file' className="form-control"
                onChange={handleFile}></input>

                {/* we will display error message in case user select some file
                other than pdf */}
                {pdfError&&<span className='text-danger'>{pdfError}</span>}

            </form>
            <br></br>
            <h4>View PDF</h4>
            <div className="pdf-container">

                {/* render this if we have a pdf file */}
                {pdfFile&&(
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
                    <div >
                        <Viewer fileUrl={pdfFile}
                    plugins={[defaultLayoutPluginInstance]}></Viewer>
                    </div>
                    
                </Worker>
                )}

                {/* render this if we have pdfFile state null   */}
                {!pdfFile&&<>No file is selected yet</>}

            </div>

            </div>
            </>
    );
}

export {NewArticle};