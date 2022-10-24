import { Category } from "./Category";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export const CategoryList = () => {
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
      fetch(`http://localhost:8088/categories?sort=label+asc`)
        .then((response) => response.json())
        .then((categoryArray) => {
          setCategory(categoryArray);
        });
    }, []);

    return (
        <>
          <article className="categories">
            <h2 className="CategoryList__details">Categories</h2>
            {category.map((category) => (
              <Category
                key={`category--${category.id}`}
                id={category.id}
                label={category.label}
              />
            ))}
          </article>
          <Button
            variant="dark"
            className="back__button"
            onClick={() => navigate(`/`)}
          >
            Back
          </Button>
        </>
      );
    };