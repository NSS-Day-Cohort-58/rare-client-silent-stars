import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col } from "react-bootstrap";

export const Category = ({ id, label }) => {
    return (
      <>
        <div className="category">
          <Container className="mb-5">
            <Col className="category__col">
              <p>
                Category: <Link to={`/categorys/${id}`}> {label}</Link>
              </p>
              
            </Col>
          </Container>
        </div>
      </>
    );
  };
  