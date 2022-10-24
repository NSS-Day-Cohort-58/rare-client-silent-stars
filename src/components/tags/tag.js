import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Tag = ({ label }) => {
    const navigate = useNavigate();
    return <>
        <h2>Label: {label}</h2>
        <Button
            variant="dark"
            className="back__button"
            onClick={() => navigate(`/`)}
            >
            Edit
          </Button>
          <Button
            variant="dark"
            className="back__button"
            onClick={() => navigate(`/`)}
            >
            Delete
          </Button>
    </>
}