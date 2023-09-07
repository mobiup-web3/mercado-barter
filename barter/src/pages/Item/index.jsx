import { Container } from "./styles";
import { useParams, Link } from 'react-router-dom';
import NavbarExtend from "../../components/NavbarExtend";

export const Item = () => {
  const { item } = useParams();
  
  return (
    <>
    <NavbarExtend />
    <Container>
      <div className="container">
        <h2 className="fw-bold">{item}</h2>
      </div>
    </Container>
    </>
  );
};
