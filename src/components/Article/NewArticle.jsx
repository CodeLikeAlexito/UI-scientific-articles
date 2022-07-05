import React, {useState, useContext, useEffect} from 'react'
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { NavigationBar } from '../NavigationBar';
import AuthContext from "../../util/auth-context";
import {useNavigate} from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {
    MDBJumbotron,
    MDBCardText
  } from "mdbreact";

const NewArticle = () => {

  const API = '/v1/api/article/';  
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const [pdfFile, setPdfFile]=useState(null);
  const [pdfError, setPdfError]=useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState('');
  const [status, setStatus] = useState('');
  const [creator, setCreator] = useState(authCtx.username);

  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const initialValues = {
    title: "",
    yearPublished: "",
    authors: "",
    keywords: "",
    abstractDescription: "",
    academicJournal: "",
    fieldOfScience: ""
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const[isSubmit, setIsSubmit] = useState(false);
  const[isLoading, setIsLoading] = useState(false);

  // handle file onChange event
  const allowedFiles = ['application/pdf'];
  const handleFile = (e) =>{
    let selectedFile = e.target.files[0];
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
        }   
      } else {
        setImageError('Not a valid jpg, png or jpeg: Please select only JPG, PNG or JPEG');
        setImageFile('');
      }
    } else {
      console.log('please select a image');
    }
  }

  const sendRequest = async () => {

    setIsLoading(true);

    const ArticleRequestDto = {
      title: formValues.title,
      yearPublished: formValues.yearPublished,
      authors: formValues.authors,
      keywords: formValues.keywords,
      coverPageImage: imageFile,
      articlePdf: pdfFile,
      abstractDescription: formValues.abstractDescription,
      academicJournal: formValues.academicJournal,
      fieldOfScience: formValues.fieldOfScience,
      status: status,
      creator: creator
    };

    const response = await fetch(API, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${authCtx.token}`,
      },
      body: JSON.stringify(ArticleRequestDto)
    });
    const articleData = await response.json();

    if(response.ok) {
      toast.success("Successfully created new article!");
      setTimeout(() => {
        navigate("/");
      }, 2000)
      return articleData;
    }

    let errorMessage = 'Error while creating new article!';
    if(articleData && articleData.message){
      errorMessage = articleData.message;
    }

    toast.error(errorMessage);
    setIsLoading(false); 
  }

  const handleArticleCreation = (e) => {
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
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      sendRequest();
    }
  }, [formErrors]);

  return (
      <>
    <div><NavigationBar /></div>
    <MDBJumbotron>
        <div className='lead display-3 text-center'>Create new article</div>
          <ToastContainer 
          draggable={false}
          transition={Zoom}
          autoClose={2000}
          position={toast.POSITION.TOP_CENTER}
        />
        <br />
        <MDBCardText className='text-center'>Here you can add and create new article. Please notice that after creation, your article won't be automatically posted.</MDBCardText>
        <MDBCardText className='text-center'>Administrator needs to review what you've posted and if everything is okay, your article will be publsihed.</MDBCardText>
    </MDBJumbotron>
    <div className="container">

      <form className='form'>
        <div className='form-group'>
            <label>Article title</label>
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
        <br></br>
        <div className='form-group'>
            <label>Authors</label>
            <p className='text-danger'>Please enter authors separated by ,</p>
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
            <label>Keywords</label>
            <p className='text-danger'>Please enter authors separated by ,</p>
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
            <label>Abstract description</label>
            <textarea
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
            <label>Field of science</label>
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
            <label><h5>Upload cover image</h5></label>
            <input
                type="file"
                name="imageFile"
                className='form-control'
                onChange={handleImage}
            />
            {imageError&&<span className='text-danger'>{imageError}</span>}
        </div>
        <br></br>
        <div className='form-group'>
            <label><h5>Upload PDF</h5></label>
            <br></br>
            <input
                  type='file'
                  name='pdfFile'
                  className="form-control"
                  onChange={handleFile}
            />
            {pdfError&&<span className='text-danger'>{pdfError}</span>}
        </div>
        <div className='footer'>
            {!isLoading && <button type='button' className='btn' onClick={() => setShow(true)}> 
                Create
            </button>}
            {isLoading && <p>Sending request ....</p>}
        </div>  
      </form>
    </div>
    <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add new article</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure that you want to do add new article?</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleArticleCreation}>
                Save Changes
            </Button>
            </Modal.Footer>
      </Modal>
    </>
  );
}

export {NewArticle};