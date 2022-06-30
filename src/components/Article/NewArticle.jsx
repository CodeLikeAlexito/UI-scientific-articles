import React, {useState, useContext, FC} from 'react'

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
import AuthContext from "../../util/auth-context";
import { useMutation } from 'react-query';
import {useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
    MDBJumbotron,
    MDBCardText
  } from "mdbreact";

const NewArticle = () => {

  const validationSchema = z.object({
    title: z.string({ invalid_type_error: "Please enter article title." }),
    yearPublished: z.string({ invalid_type_error: "Please enter article year of publish." }),
    authors: z.string(),
    coverPageImage: z.instanceof(FileList),
    articlePdf: z.instanceof(FileList),
    abstractDescription: z.string(),
    fieldOfScience: z.string(),
    creator: z.string(),
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(validationSchema)
  });

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();
  // const[isLoading, setIsLoading] = useState(false);

  const [pdfFile, setPdfFile]=useState(null);
  const [pdfError, setPdfError]=useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState('');
  const [articleId, setArticleId] = useState("");
  const [title, setTitle] = useState("");
  const [yearPublished, setYearPublished] = useState("");
  const [authors, setAuthors] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [status, setStatus] = useState('');
//   const [coverPageImage, setCoverPageImage] = useState("");
//   const [articlePdf, setArticlePdf] = useState("");
  const [abstractDescription, setAbstractDescription] = useState("");
  const [academicJournal, setAcademicJournal] = useState("");
  const [fieldOfScience, setFieldOfScience] = useState("");
  const [creator, setCreator] = useState(authCtx.username);

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
          console.log(e.target);
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

  // handle cover image onChange event
  const allowedImageFormats = ['image/jpeg', 'image/jpg', 'image/png'];
  const handleImage = (e) => {
    let selectedImage = e.target.files[0];
    if(selectedImage) {
      if(selectedImage&&allowedImageFormats.includes(selectedImage.type)){
        let image = new FileReader();
        image.readAsDataURL(selectedImage);
        image.onloadend=(e)=>{
            setImageError('');
            setImageFile(e.target.result);
            console.log(e.target);
        }   
      } else {
        setImageError('Not a valid jpg, png or jpeg: Please select only JPG, PNG or JPEG');
        setImageFile('');
      }
    } else {
      console.log('please select a image');
    }
  }

  // const handleAuthors = (e) => {
  //     const authorsString = e.target.value;
  //     const authorsStringArr = authorsString.trim().split(",");
  //     setAuthors(authorsStringArr);
  // }

  // I will need to change it to be api gateway
  const API = 'http://localhost:4002/v1/api/article/';  

  const createArticle = async () => {

    const ArticleRequestDto = {
      // articleId: articleId,
      title: title,
      yearPublished: yearPublished,
      authors: authors,
      keywords: keywords,
      coverPageImage: imageFile,
      articlePdf: pdfFile,
      abstractDescription: abstractDescription,
      academicJournal: academicJournal,
      fieldOfScience: fieldOfScience,
      status: status,
      creator: creator
    };

    const response = await fetch(API, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ArticleRequestDto)
    });
    const { article } = await response.json();
    console.log(response.json());
    return article;      
  }

  //TODO refactor the returns
  const { mutate, isLoading } = useMutation(createArticle, {
    onSuccess: data => {
      console.log(data);
      const message = "success";
      alert(message);
      // navigate("/articles");
    },
    onError: (data) => {
      console.log(data);
      alert("There was an error");
      
    },
    onSettled: () => {
      console.log("Here");
    }
  });

  const handleCreate = () => {
    mutate();
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

      <form className='form' onSubmit={handleSubmit(handleCreate)}>
        <div className='form-group'>
            <label>Article title</label>
            <input
                type="text"
                {...register("title")}
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
            />
            {errors.title && (
              <p className="text-sm text-danger">{errors.title.message}</p>
            )}
        </div>
        <br></br>
        <div className='form-group'>
            <label>Year published</label>
            <input
                {...register("yearPublished")}
                type="text"
                name="yearPublished"
                value={yearPublished}
                onChange={(e) => setYearPublished(e.target.value)}
                className="form-control"
            />
            {errors.yearPublished && (
              <p className="text-sm text-danger">{errors.yearPublished.message}</p>
            )}
        </div>
        <br></br>
        <div className='form-group'>
            <label>Authors</label>
            <p className='text-danger'>Please enter authors separated by ,</p>
            <input
                {...register('authors')} 
                type="text"
                name="authors"
                value={authors}
                onChange={(e) => setAuthors(e.target.value)}
                className="form-control"
            />
            {errors.authors && (
              <p className="text-sm text-danger">{errors.authors.message}</p>
            )}
        </div>
        <br></br>
        <div className='form-group'>
            <label>Keywords</label>
            <p className='text-danger'>Please enter authors separated by ,</p>
            <input
                // {...register('authors')} 
                type="text"
                name="keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="form-control"
            />
            {/* {errors.authors && (
              <p className="text-sm text-danger">{errors.authors.message}</p>
            )} */}
        </div>
        <br></br>
        <div className='form-group'>
            <label>Abstract description</label>
            <textarea
                {...register("abstractDescription")} 
                type="text"
                name="abstractDescription"
                value={abstractDescription}
                onChange={(e) => setAbstractDescription(e.target.value)}
                className="form-control"
            />
        </div>
        <br></br>
        <div className='form-group'>
            <label>Academic journal</label>
            <input
                {...register("academicJournal")} 
                type="text"
                name="academicJournal"
                value={academicJournal}
                onChange={(e) => setAcademicJournal(e.target.value)}
                className="form-control"
            />
            {errors.academicJournal && (
              <p className="text-sm text-danger">{errors.academicJournal.message}</p>
            )}
        </div>
        <br></br>
        <div className='form-group'>
            <label>Field of science</label>
            <input
                {...register("fieldOfScience")} 
                type="text"
                name="fieldOfScience"
                value={fieldOfScience}
                onChange={(e) => setFieldOfScience(e.target.value)}
                className="form-control"
            />
            {errors.fieldOfScience && (
              <p className="text-sm text-danger">{errors.fieldOfScience.message}</p>
            )}
        </div>
        <br></br>
        <div className='form-group'>
            <label><h5>Upload cover image</h5></label>
            <input
                {...register("coverPageImage")} 
                type="file"
                name="imageFile"
                className='form-control'
                onChange={handleImage}
            />
            {imageError&&<span className='text-danger'>{imageError}</span>}
            {errors.coverPageImage && (
              <p className="text-sm text-danger">{errors.coverPageImage.message}</p>
            )}
        </div>
        <br></br>
        <div className='form-group'>
            <label><h5>Upload PDF</h5></label>
            <br></br>
            <input
                  {...register("articlePdf")}  
                  type='file'
                  name='pdfFile'
                  className="form-control"
                  onChange={handleFile}
            />
            {/* we will display error message in case user select some file
            other than pdf */}
            {pdfError&&<span className='text-danger'>{pdfError}</span>}
            {errors.articlePdf && (
              <p className="text-sm text-danger">{errors.articlePdf.message}</p>
            )}
            {/*View PDF */}
            {/* <div className='container' id="pdfViewer"> */}
            {/* <label><h5>View PDF</h5></label> */}
            {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js"> */}
                {/* {pdfFile&&<Viewer fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]}></Viewer>} */}
            {/* </Worker> */}
            {/* render this if we have pdfFile state null   */}
            {/* {!pdfFile&&<h5>No file is selected yet</h5>} */}
            {/* </div> */}
        </div>
        <input 
              type="hidden"
              name="creator"
              {...register("creator")}
              value={creator} 
              />
        <div className='footer'>
            <button type='submit' className='btn'>
                Create
            </button>
        </div>  
      </form>
    </div>
    </>
  );
}

export {NewArticle};