import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { NavigationBar } from '../NavigationBar';
import {useNavigate} from "react-router-dom";
import Base64Downloader from 'common-base64-downloader-react';
import {
    MDBJumbotron,
    MDBCardText
  } from "mdbreact";

const EditArticle = () => {

    const getURL = 'http://localhost:4002/v1/api/article/id/';
    const editURL = 'http://localhost:4002/v1/api/article/';
    const navigate = useNavigate();
    const { id } = useParams();
    const [article, setArticle] = useState('');

    const [abstractDescription, setAbstractDescription] = useState('');
    const [academicJournal, setAcademicJournal] = useState('');
    const [authors, setAuthors] = useState([]);
    // const [author, setAuthor] = useState('');
    const [creator, setCreator] = useState('');
    const [fieldOfScience, setFieldOfScience] = useState('');
    const [keywords, setKeywords] = useState([]);
    const [status, setStatus] = useState('');
    const [title, setTitle] = useState('');
    const [yearPublished, setYearPublished] = useState('');
    const [coverPage, setCoverPage] = useState(null);
    const [coverPageError, setCoverPageError] = useState('');
    const [articlePdf, setArticlePdf]=useState(null);
    const [pdfError, setPdfError]=useState('');
    //articlePdf
    //coverImage
    //articleID

    const getArticleById = async (id) => {
        console.log(`${getURL}${id}`);
        const response = await fetch(`${getURL}${id}`);
        const data = await response.json();
        setArticle(data);
        console.log("DAta:")
        console.log(data);
        setCurrentArticle(data);
    }

    const setCurrentArticle = (data) => {
        if(data.abstractDescription !== null ) { setAbstractDescription(data.abstractDescription); }
        if(data.academicJournal !== null ) { setAcademicJournal(data.academicJournal); }
        if(data.authors !== null) { setAuthors(data.authors); }
        if(data.creator !== null) { setCreator(data.creator); }
        if(data.fieldOfScience !== null) { setFieldOfScience(data.fieldOfScience); }
        if(data.keywords !== null) { setKeywords(data.keywords); }
        if(data.status !== null) { setStatus(data.status); }
        if(data.title !== null) { setTitle(data.title); }
        if(data.yearPublished !== null) { setYearPublished(data.yearPublished); }
        if(data.coverPage !== null) { setCoverPage(data.coverPage) }
        if(data.articlePdf !== null) { setArticlePdf(data.articlePdf) }
        // authors.map(author => setAuthor(author));
    }
    

    useEffect(() => {
        console.log("here");
        getArticleById(id);
    }, []);

    const handleSelectDropdownChange = (event) => {
        console.log(event.target.value);
        setStatus(event.target.value);
    }

    // const handleAuthorsState = (event) => {
    //     let temp_authors = authors;
    //     console.log(temp_authors);
    //     console.log(event.target.value)
    //     const newState = authors.map( (author) => {
    //         // console.log(index);
    //         setAuthor(event.target.value);
    //         return {...authors, author: event.targe.value}
    //     });

    //     console.log(newState);
    // }

    const updateArticle = async () => {

        const ArticleRequestDto = {
            // articleId: articleId,
            title: title,
            yearPublished: yearPublished,
            authors: authors,
            keywords: keywords,
            coverPageImage: coverPage,
            articlePdf: articlePdf,
            abstractDescription: abstractDescription,
            academicJournal: academicJournal,
            fieldOfScience: fieldOfScience,
            status: status,
            creator: creator
          };

        // const updatedArticle = { abstractDescription, academicJournal, authors, creator, fieldOfScience, keywords, status, title,  yearPublished, articlePdf, coverPage};
        console.log(ArticleRequestDto);
        console.log(`${editURL}`);
        const response = await fetch(`${editURL}${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ArticleRequestDto)
        });
        const { updArticle } = await response.json();
        if(response.ok) {
            alert("Succesfully updated article");
            navigate("/admin");
            return updArticle;
        }
        
        console.log(response);
        console.log("Error updating");
    };

    const allowedImageFormats = ['image/jpeg', 'image/jpg', 'image/png'];
    const handleImage = (e) => {
        let selectedImage = e.target.files[0];
        if(selectedImage) {
        if(selectedImage&&allowedImageFormats.includes(selectedImage.type)){
            let image = new FileReader();
            image.readAsDataURL(selectedImage);
            image.onloadend=(e)=>{
                setCoverPageError('');
                setCoverPage(e.target.result);
                // console.log(e.target);
            }   
        } else {
            setCoverPageError('Not a valid jpg, png or jpeg: Please select only JPG, PNG or JPEG');
            setCoverPage('');
        }
        } else {
        console.log('please select a image');
        }
    }

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
          setArticlePdf(e.target.result);
        //   console.log(e.target);
        }
      }
      else{
        setPdfError('Not a valid pdf: Please select only PDF');
        setArticlePdf('');
      }
    }
    else{
      console.log('please select a PDF');
    }
  }

    return (
        <>
    <div><NavigationBar /></div>
    <MDBJumbotron>
        <div className='lead display-3 text-center'>View and update client</div>
        <br />
        <MDBCardText className='text-center'>Here you can add and create new article. Please notice that after creation, your article won't be automatically posted.</MDBCardText>
        <MDBCardText className='text-center'>Administrator needs to review what you've posted and if everything is okay, your article will be publsihed.</MDBCardText>
    </MDBJumbotron>
    <div className="container-sm border border-dark" key={article.articleId}>
      <br></br>
      <form className='form'>
        <input
            type="hidden"
            name="articleId"
            value={article.articleId}
        />
        <div className='form-group container'>
            <div className='row'>
                <div className='col'>
                    <img src={coverPage !== "" ? `${coverPage}` : 'https://via.placeholder.com/400'}  
                        alt={title}
                        width="150" height="150"/>
                </div>
                <div className='col'>
                    <Base64Downloader base64={articlePdf} downloadName={title} className='btn text-uppercase fw-bolder'>
                        Download PDF
                    </Base64Downloader>
                </div>
            </div>
        </div>
        <div className='form-group container'>
            <br></br>
            <div className='row'>
                <div className='col'>
                    <div className='form-group'>
                        <label><p>Change cover image</p></label>
                        <input
                            // {...register("coverPageImage")} 
                            type="file"
                            name="imageFile"
                            className='form-control'
                            onChange={handleImage}
                        />
                        {coverPageError&&<span className='text-danger'>{coverPageError}</span>}
                    </div>
                </div>
                <div className='col'>
                    <label><p>Change PDF</p></label>
                    <br></br>
                    <input
                        // {...register("articlePdf")}  
                        type='file'
                        name='pdfFile'
                        className="form-control"
                        onChange={handleFile}
                    />
                    {pdfError&&<span className='text-danger'>{pdfError}</span>}
                </div>
            </div>
        </div>
        <div className='form-group'>
            <label>Abstract description</label>
            <input
                // {...register("username")}
                type="text"
                name="abstractDescription"
                value={abstractDescription}
                onChange={(e) => setAbstractDescription(e.target.value)}
                className="form-control"
            />
            {/* {errors.yearPublished && (
              <p className="text-sm text-danger">{errors.yearPublished.message}</p>
            )} */}
        </div>
        <br></br>
        <div className='form-group'>
            <label>Academic journal</label>
            <input
                // {...register('firstName')} 
                type="text"
                name="academicJournal"
                value={academicJournal}
                onChange={(e) => setAcademicJournal(e.target.value)}
                className="form-control"
            />
            {/* {errors.authors && (
              <p className="text-sm text-danger">{errors.authors.message}</p>
            )} */}
        </div>
        <br></br>
        <div className='form-group'>
            <label>Authors</label>

            <input
                // {...register("lastName")}
                // key={index} 
                type="text"
                name="authors"
                value={authors}
                onChange={(e) => setAuthors(e.target.value)}
                className="form-control"
            /> 
            
            {/* {authors.map((author) => (

            ))} */}

        </div>
        <br></br>
        <div className='form-group'>
            <label>Creator</label>
            <input
                // {...register("email")} 
                type="text"
                name="creator"
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
                className="form-control"
            />
            {/* {errors.academicJournal && (
              <p className="text-sm text-danger">{errors.academicJournal.message}</p>
            )} */}
        </div>
        <br></br>
        <div className='form-group'>
            <label>Field of sceince</label>
            <input
                // {...register("city")} 
                type="text"
                name="fieldOfScience"
                value={fieldOfScience}
                onChange={(e) => setFieldOfScience(e.target.value)}
                className="form-control"
            />
            {/* {errors.fieldOfScience && (
              <p className="text-sm text-danger">{errors.fieldOfScience.message}</p>
            )} */}
        </div>
        <br></br>
        <div className='form-group'>
            <label>Keywords</label>
            <input
                // {...register("address")} 
                type="text"
                name="keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="form-control"
            />
            {/* {errors.fieldOfScience && (
              <p className="text-sm text-danger">{errors.fieldOfScience.message}</p>
            )} */}
        </div>
        <br></br>
        <div className='form-group'>
            <label>Title</label>
            <input
                // {...register("phone")} 
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
            />
            {/* {errors.fieldOfScience && (
              <p className="text-sm text-danger">{errors.fieldOfScience.message}</p>
            )} */}
        </div>
        <br></br>
        <div className='form-group'>
            <label>Status</label>
            <select className="form-select" aria-label="Default select example" value={status} onChange={handleSelectDropdownChange}>
                <option value="APPROVED">APPROVED</option>
                <option value="PENDING">PENDING</option>
                <option value="REJECTED">REJECTED</option>
            </select>
            {/* {errors.fieldOfScience && (
              <p className="text-sm text-danger">{errors.fieldOfScience.message}</p>
            )} */}
        </div>
        <br></br>
        <div className='form-group'>
            <label>Year published</label>
            <input
                // {...register("phone")} 
                type="text"
                name="yearPublished"
                value={yearPublished}
                onChange={(e) => setYearPublished(e.target.value)}
                className="form-control"
            />
            {/* {errors.fieldOfScience && (
              <p className="text-sm text-danger">{errors.fieldOfScience.message}</p>
            )} */}
        </div>
        <div className='footer'>
            <button type='button' className='btn' onClick={updateArticle}>
                Update
            </button>
        </div>  
        <br></br>
      </form>
    </div>
    </>
    )
}

export {EditArticle};