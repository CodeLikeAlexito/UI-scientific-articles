import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";

const ArticlesComponent = () => {

    const URL = 'http://localhost:4002/v1/api/article/';
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();

    const handleArticles = async () => {
        const response = await fetch(`${URL}`);
        const data = await response.json();
        setArticles(data);
        console.log(data);
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
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        handleArticles();
    }

    // console.log(articles);
    const DisplayData = articles.map(
        (article) => {
            return (
                <tr key={article.articleId}>
                    <td>{article.articleId}</td>
                    <td>{article.title}</td>
                    <td>{article.yearPublished}</td>
                    <td>{article.authors}</td>
                    <td>{article.keywords}</td>
                    {/* <td>{article.coverPageImage}</td> */}
                    {/* <td>{article.articlePdf}</td> */}
                    <td>{article.abstractDescription}</td>
                    <td>{article.academicJournal}</td>
                    <td>{article.fieldOfScience}</td>
                    <td>{article.creator}</td>
                    <td>{article.status}</td>
                    <td scope="col"><button onClick={()=> handleDelete(article.articleId)}>Delete</button></td>
                    <td scope="col"><button onClick={() => redirectEdit(article.articleId)}>Edit</button></td>
                </tr>
            )
        }
    )

    return(
        <div className='container border'>
            <h1>Articles</h1>
            <br></br>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Id</th>
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