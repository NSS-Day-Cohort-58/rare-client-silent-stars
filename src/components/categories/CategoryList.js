import { Category } from "./Category";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./Categories.css"
import { getAllCategories } from "../../managers/categoriesManager";

export const CategoryList = () => {
    const [categories, setCategory] = useState([]);
    
    useEffect(() => {
      getAllCategories().then(data => setCategory(data))
    }, []
    )

    return (
        <>
          <article className="categories">
            <h2 className="CategoryList__details">Categories:</h2>
            {
                categories.map(category => {
                  return <div key={`category--${category.id}`} className="category">
                  <ul>{category.label}</ul>
                  
                  <div><Button variant="dark" className="category_edit">Edit</Button></div>
                  
                  <div>
                    <Button variant="dark" className="back__button">Delete</Button>
                  </div>
                  </div>
                  
                })
            }
          </article>
          
        </>
      );
    };