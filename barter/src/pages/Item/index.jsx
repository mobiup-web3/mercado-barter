import { Container } from "./styles";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import NavbarExtend from "../../components/NavbarExtend";

const findDataByParam = (param) => {
  const mockData = [
    {
      param: 'eclipse-cross-hipe',
      name: 'Eclipse Cross Hipe',
      description: 'Descrição X',
      value: 'R$ 210.990,00',
      cryptoValue: [
        { currency: 'cofbr', price: 100 },
        { currency: 'milbr', price: 2000 },
      ],
      image: 'https://cdn.motor1.com/images/mgl/3WWyL6/s1/mitsubishi-eclipse-cross-hpe-s-awc-2023.jpg',
    },
    {
      param: 'rootex-fertilizante',
      name: 'Rootex Fertilizante',
      description: 'Descrição Y',
      value: 'R$ 5555,00',
      cryptoValue: [
        { currency: 'cofbr', price: 200 },
        { currency: 'milbr', price: 4000 },
      ],
      image: 'https://cdn.motor1.com/images/mgl/3WWyL6/s1/mitsubishi-eclipse-cross-hpe-s-awc-2023.jpg',
    }
  ];

  return mockData.find((data) => data.param === param);
};

export const Item = () => {
  const { item } = useParams();
  const navigate = useNavigate(); 
  const itemData = findDataByParam(item);

  useEffect(() => {
    if (!itemData) {
      navigate('/404');
    }
  }, [itemData, navigate]);

  if (!itemData) {
    return null;
  }

  return (
    <>
      <Container>
        <NavbarExtend />
        <div className="container">
          <div className="bg-white">
            <nav className="py-3" aria-label="breadcrumb">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="">Home</Link></li>
                <li className="breadcrumb-item"><Link to="">Marketplace</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Data</li>
              </ol>
            </nav>
            {itemData ? (
              <>
                <h2 className="fw-bold">Nome: {itemData.name}</h2>
                <h2 className="fw-bold">Descrição: {itemData.description}</h2>
                <h2 className="fw-bold">Valor: {itemData.value}</h2>
                <h2 className="fw-bold">Valor em cofbr: {itemData.cryptoValue.find(entry => entry.currency === 'cofbr').price}</h2>
                <h2 className="fw-bold">Valor em milbr: {itemData.cryptoValue.find(entry => entry.currency === 'milbr').price}</h2>
                <img className="img-fluid" src={itemData.image} alt={itemData.name} />
              </>
            ) : (
              <h2 className="fw-bold">Item não encontrado</h2>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};
