import { useParams } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import { NavigationBar } from '../NavigationBar';
import {useNavigate} from "react-router-dom";
import Base64Downloader from 'common-base64-downloader-react';
import AuthContext from '../../util/auth-context';
import { Button, Modal } from 'react-bootstrap';
import {
    MDBJumbotron,
    MDBCardText
  } from "mdbreact";

const EditArticle = () => {

    const authCtx = useContext(AuthContext);

    const getURL = '/v1/api/article/id/';
    const editURL = '/v1/api/article/';
    const navigate = useNavigate();
    const { id } = useParams();
    const [article, setArticle] = useState('');

    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const initialValues = {
        title: article.title,
        yearPublished: article.yearPublished,
        authors: article.authors,
        keywords: article.keywords,
        abstractDescription: article.abstractDescription,
        academicJournal: article.academicJournal,
        fieldOfScience: article.fieldOfScience
      };

      const [formValues, setFormValues] = useState(initialValues);
      const [formErrors, setFormErrors] = useState({});
      const[isSubmit, setIsSubmit] = useState(false);
      const[isLoading, setIsLoading] = useState(false);

    const [status, setStatus] = useState('');
    const [creator, setCreator] = useState('');
    const [coverPage, setCoverPage] = useState(null);
    const [coverPageError, setCoverPageError] = useState('');
    const [articlePdf, setArticlePdf]=useState(null);
    const [pdfError, setPdfError]=useState('');

    const getArticleById = async (id) => {
        const response = await fetch(`${getURL}${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authCtx.token}`,
            }
        });
        const data = await response.json();
        console.log("data");
        console.log(data);
        setArticle(data);
        setFormValues(data);
        setCoverPage(data.coverPage);
        setArticlePdf(data.articlePdf);
        setStatus(data.status);
        setCreator(data.creator);
    }

    // console.log(article);
    
    useEffect(() => {
        getArticleById(id);
    }, []);

    const handleSelectDropdownChange = (event) => {
        console.log(event.target.value);
        setStatus(event.target.value);
    }

    const sendRequest = async () => {

        setIsLoading(true);

        const ArticleRequestDto = {
            title: formValues.title,
            yearPublished: formValues.yearPublished,
            authors: formValues.authors,
            keywords: formValues.keywords,
            coverPageImage: coverPage,
            articlePdf: articlePdf,
            abstractDescription: formValues.abstractDescription,
            academicJournal: formValues.academicJournal,
            fieldOfScience: formValues.fieldOfScience,
            status: status,
            creator: creator
          };

        console.log(ArticleRequestDto);

        const response = await fetch(`${editURL}${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${authCtx.token}`,
            },
            body: JSON.stringify(ArticleRequestDto)
        });

        const { updArticle } = await response.json();
        console.log(updArticle);

        if(response.ok) {
            navigate("/admin");
            return updArticle;
        }

        let errorMessage = 'Registration failed!';
        if(updArticle && updArticle.message){
            errorMessage = updArticle.message;
        }
        
        alert(errorMessage);
        setIsLoading(false); 
    };

    const handleArticleEdit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        setShow(false);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({...formValues, [name]: value});
    }

    const validate = (values) => {
        const errors = {};
        if (!values.title) {
          errors.title = "Title is required!";
        }
    
        if (!values.yearPublished) {
          errors.yearPublished = "Year of published is required!";
        }
    
        if (!values.authors) {
          errors.authors = "Authors is required!";
        }
    
        if (!values.keywords) {
          errors.keywords = "Keywords is required!";
        }
    
        if (!values.abstractDescription) {
          errors.abstractDescription = "Abstract description is required!";
        }
    
        if (!values.academicJournal) {
          errors.academicJournal = "Academic journal is required!";
        }
    
        if (!values.fieldOfScience) {
          errors.fieldOfScience = "Field of science is required!";
        }
    
        return errors;
    }

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
          console.log(formValues);
          sendRequest();
        }
    }, [formErrors]);


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
                const { name, value } = e.target;
                setFormValues({...formValues, [name]: value});
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
    if(selectedFile){
      if(selectedFile&&allowedFiles.includes(selectedFile.type)){
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend=(e)=>{
          setPdfError('');
          setArticlePdf(e.target.result);
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
        <div className='form-group container'>
            <div className='row'>
                <div className='col'>
                    <img src={coverPage !== "" ? `${coverPage}` : 'https://via.placeholder.com/400'}  
                        alt={formValues.title}
                        width="150" height="150"/>
                </div>
                <div className='col'>
                    <Base64Downloader base64={articlePdf} downloadName={'Article'} className='btn text-uppercase fw-bolder'>
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
                type="text"
                name="abstractDescription"
                value={formValues.abstractDescription}
                onChange={handleChange}
                className="form-control"
            />
            <p className="text-sm text-danger">{formErrors.abstractDescription}</p>
        </div>
        <br></br>
        <div className='form-group'>
            <label>Academic journal</label>
            <input
                type="text"
                name="academicJournal"
                value={formValues.academicJournal}
                onChange={handleChange}
                className="form-control"
            />
            <p className="text-sm text-danger">{formErrors.academicJournal}</p>
        </div>
        <br></br>
        <div className='form-group'>
            <label>Authors</label>

            <input
                type="text"
                name="authors"
                value={formValues.authors}
                onChange={handleChange}
                className="form-control"
            /> 
            <p className="text-sm text-danger">{formErrors.authors}</p>
        </div>
        <br></br>
        <div className='form-group'>
            <label>Field of sceince</label>
            <input
                type="text"
                name="fieldOfScience"
                value={formValues.fieldOfScience}
                onChange={handleChange}
                className="form-control"
            />
            <p className="text-sm text-danger">{formErrors.fieldOfScience}</p>
        </div>
        <br></br>
        <div className='form-group'>
            <label>Keywords</label>
            <input
                type="text"
                name="keywords"
                value={formValues.keywords}
                onChange={handleChange}
                className="form-control"
            />
            <p className="text-sm text-danger">{formErrors.keywords}</p>
        </div>
        <br></br>
        <div className='form-group'>
            <label>Title</label>
            <input
                type="text"
                name="title"
                value={formValues.title}
                onChange={handleChange}
                className="form-control"
            />
            <p className="text-sm text-danger">{formErrors.title}</p>
        </div>
        <br></br>
        <div className='form-group'>
            <label>Status</label>
            <select className="form-select" aria-label="Default select example" value={status} onChange={handleSelectDropdownChange}>
                <option value="APPROVED">APPROVED</option>
                <option value="PENDING">PENDING</option>
                <option value="REJECTED">REJECTED</option>
            </select>
        </div>
        <br></br>
        <div className='form-group'>
            <label>Year published</label>
            <input
                type="text"
                name="yearPublished"
                value={formValues.yearPublished}
                onChange={handleChange}
                className="form-control"
            />
            <p className="text-sm text-danger">{formErrors.yearPublished}</p>
        </div>
        <div className='footer text-center'>
            <button type='button' className='btn btn-primary' onClick={() => setShow(true)}>
                Update
            </button>
        </div>  
        <br></br>
      </form>
    </div>
    <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Update article data</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure that you want to do this changes?</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleArticleEdit}>
                Save Changes
            </Button>
            </Modal.Footer>
      </Modal>
    </>
    )
}

export {EditArticle};