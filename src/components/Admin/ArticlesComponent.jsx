import React, { useEffect, useState, useContext } from 'react';
import {useNavigate} from "react-router-dom";
import AuthContext from '../../util/auth-context';
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ArticlesComponent = () => {

    const URL = '/v1/api/article/';
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    const handleArticles = async () => {
        const response = await fetch(`${URL}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authCtx.token}`,
            },

        });

        const data = await response.json();
        if(response.ok) {
            setArticles(data);
        }
    }

    useEffect(() => {
        handleArticles([]);
    }, [])

    const redirectEdit = (id) => {
        navigate(`/admin/article/${id}`);
    }

    const handleDelete = async (id) => {
        const response = await fetch(`${URL}${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authCtx.token}`,
            },
        });
        const data = await response.json();
        if(response.ok) {
            toast.success("Successfully deleted article!");
            setTimeout(() => {
                handleArticles();
            }, 1000)
        }
    }

    const DisplayData = articles.map(
        (article) => {
            return (
                <tr key={article.articleId}>
                    <td>{article.title}</td>
                    <td>{article.yearPublished}</td>
                    <td>{article.authors}</td>
                    <td>{article.keywords}</td>
                    <td>{article.abstractDescription}</td>
                    <td>{article.academicJournal}</td>
                    <td>{article.fieldOfScience}</td>
                    <td>{article.creator}</td>
                    <td>{article.status}</td>
                    <td scope="col">
                    <ToastContainer 
                    draggable={false}
                    transition={Zoom}
                    autoClose={1000}
                    position={toast.POSITION.TOP_CENTER}
                    />
                        <button className='btn btn-danger' onClick={()=> handleDelete(article.articleId)}>
                            Delete
                        </button>
                        </td>
                    <td scope="col"><button className='btn btn-warning' onClick={() => redirectEdit(article.articleId)}>Edit</button></td>
                </tr>
            )
        }
    )

    return(
        <div className='container-xxl border'>
            <br></br>
            <h1>Articles</h1>
            <br></br>
            <table className="table">
                <thead>
                    <tr>
                    {/* <th scope="col">Id</th> */}
                    <th scope="col">Title</th>
                    <th scope="col">Published</th>
                    <th scope="col">Authors</th>
                    <th scope="col">Keywords</th>
                    {/* <th scope="col">Cover page image</th> */}
                    {/* <th scope="col">Pdf</th> */}
                    <th scope="col">Abstract description</th>
                    <th scope="col">Academic journal</th>
                    <th scope="col">Field of science</th>
                    <th scope="col">Creator</th>
                    <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {DisplayData}
                </tbody>
            </table>
        </div>
    );
}

export {ArticlesComponent};