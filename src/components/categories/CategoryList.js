import { Category } from "./Category";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./Categories.css"

export const CategoryList = () => {
    const [categories, setCategory] = useState([]);
    

    useEffect(() => {
      fetch(`http://localhost:8088/categories`)
        .then((response) => response.json())
        .then((categoryArray) => {
          setCategory(categoryArray);
        });
    }, []);

    return (
        <>
          <article className="categories">
            <h2 className="CategoryList__details">Categories:</h2>
            {
                categories.map(category => {
                  return <>
                  
                  <ul>{category.label}</ul>
                  
                  <div><Button variant="dark" className="category_edit">Edit</Button></div>
                  
                  <div>
                    <Button variant="dark" className="back__button">Delete</Button>
                  </div>
                  </>
                })
            }
          </article>
          
        </>
      );
    };