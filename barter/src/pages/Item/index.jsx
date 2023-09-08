import { Container } from "./styles";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import NavbarExtend from "../../components/NavbarExtend";
import GenericModal from "../../components/GenericModal";

// função para tratar parametro da url
const findDataByParam = (param) => {
  const mockData = [
    {
      param: 'eclipse-cross-hipe',
      name: 'Eclipse Cross Hipe',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis rem magnam adipisci non delectus culpa quo autem, at eos officiis tempora cupiditate consequuntur itaque magni!',
      value: 'R$ 210.990,00',
      creator: 'Concessionária XYZ',
      cryptoValue: [
        { currency: 'rd', price: '210990.50' },
        { currency: 'cprmil01', price: '229,045' },
      ],
      image: 'https://cdn.motor1.com/images/mgl/3WWyL6/s1/mitsubishi-eclipse-cross-hpe-s-awc-2023.jpg',
    },
    {
      param: 'rootex-fertilizante',
      name: 'Rootex Fertilizante',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis rem magnam adipisci non delectus culpa quo autem, at eos officiis tempora cupiditate consequuntur itaque magni!',
      value: 'R$ 2.708,10',
      creator: 'Rootex',
      cryptoValue: [
        { currency: 'rd', price: '2708.10' },
        { currency: 'cprmil01', price: '15.045' },
      ],
      image: 'https://http2.mlstatic.com/D_NQ_NP_970839-MLU69446511865_052023-O.webp',
    }
  ];

  return mockData.find((data) => data.param === param);
};

// custom select start 
const options = [
  // { value: 'RD', label: 'RD', icon: 'https://stonoex.mobiup.io/assets/img/cofbr.svg' },
  { value: 'CPRMIL01', label: 'CPRMIL01', icon: 'https://stonoex.mobiup.io/assets/img/cofbr.svg' },
];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '.5rem .5rem'
  }),
  optionLabel: {
    marginRight: '10px', // Espaço para o ícone
  },
  optionIcon: {
    width: '24px',
    height: '24px',
  },
};

const CustomOption = ({ children, innerProps, label, data }) => (
  <div {...innerProps} style={customStyles.option(data)}>
    <img src={data.icon} alt={label} style={customStyles.optionIcon} />
    <span style={customStyles.optionLabel}>{children}</span>
  </div>
);
// custom select end

export const Item = () => {
  const { item } = useParams();
  const navigate = useNavigate(); 
  const itemData = findDataByParam(item);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  }
  const handleShow = () => {
    setShow(true);
  }

  useEffect(() => {
    if (!itemData) {
      navigate('/404');
    }
  }, [itemData, navigate]);

  if (!itemData) {
    return null;
  }

  // validate form start
  const [selectedValue, setSelectedValue] = useState(null); // Estado para armazenar o valor selecionado
  const [offerValue, setOfferValue] = useState(''); // Estado para armazenar o valor da oferta
  const [error, setError] = useState({
    selectedValue: '',
    offerValue: '',
  });
  const [success, setSuccess] = useState({
    selectedValue: false,
    offerValue: false,
  });

  const handleSelectedValueChange = (selectedOption) => {
    setSelectedValue(selectedOption);
  
    // Remova o erro e defina o sucesso
    setError({ ...error, selectedValue: '' });
    setSuccess({ ...success, selectedValue: true });
  };

  const handleOfferValueChange = (e) => {
    const inputValue = e.target.value;
  
    // Verifica se o caractere inserido é um número ou um ponto decimal
    const regex = /^[0-9.]*$/;
  
    // Verifica se a entrada completa é válida
    if (regex.test(inputValue) || inputValue === '') {
      // Verifica se há mais de um ponto decimal na entrada completa
      const decimalCount = (inputValue.match(/\./g) || []).length;
      if (decimalCount > 1) {
        return;
      }

      setOfferValue(inputValue);

      // Remova o erro e defina o sucesso
      setError({ ...error, offerValue: '' });
      setSuccess({ ...success, offerValue: true });
    }
  };  

  const validateForm = () => {
    let isValid = true;
    const errors = {
      selectedValue: '',
      offerValue: '',
    };
  
    if (!selectedValue) {
      isValid = false;
      errors.selectedValue = 'Selecione uma moeda.';
    }
  
    if (!offerValue) {
      isValid = false;
      errors.offerValue = 'Informe o valor da oferta.';
    }
  
    setError(errors);
  
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const isValid = validateForm();
  
    if (isValid) {
      // Redefine os estados de erro para indicar sucesso
      setError({
        selectedValue: '',
        offerValue: '',
      });
  
      // Agora você pode aplicar classes de feedback de sucesso
      // Por exemplo, você pode adicionar classes "is-valid" aos campos
      // Para dar feedback visual de sucesso
      setSuccess({
        selectedValue: true,
        offerValue: true,
      });
  
      console.log("Form enviado!");
    }
  };
  // validate form end

  return (
    <>
      <Container>
        <NavbarExtend />
        <section className="item mt-5">
          <div className="container">
            <div className="row justify-content-center">
              {itemData ? (
                <>
                <div className="col-lg-8">
                  <div className="i-media">
                    <img className="img-fluid rounded-1" src={itemData.image} alt={itemData.name} />
                  </div>
                  <div className="i-description mt-5 d-none d-md-block">
                    <small className="text-muted fw-semibold">Descrição</small>
                    <p className="mt-2 mb-0 fw-semibold">{itemData.description}</p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="i-content">
                    <h2 className="fw-bold">{itemData.name}</h2>
                    <div className="i-value mt-4">
                      <small className="text-muted fw-semibold">Preço</small>
                      <p className="fs-4 fw-bold">{itemData.value}</p>
                      <div className="i-value-cripto d-flex gap-2 justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <img src="https://stonoex.mobiup.io/assets/img/cofbr.svg" width="36" alt="" />
                          <div>
                            <small className="text-muted fw-semibold">Preço CPRMIL01</small>
                            <p className="fw-bold">{itemData.cryptoValue.find(entry => entry.currency === 'cprmil01').price}</p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <img src="https://stonoex.mobiup.io/assets/img/cofbr.svg" width="36" alt="" />
                          <div>
                            <small className="text-muted fw-semibold">Preço RD</small>
                            <p className="fw-bold">{itemData.cryptoValue.find(entry => entry.currency === 'rd').price}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="i-description mt-4 d-md-none">
                      <small className="text-muted fw-semibold">Descrição</small>
                      <p className="mt-2 mb-0 fw-semibold">{itemData.description}</p>
                    </div>
                    <div className="i-owner d-flex align-items-center gap-3 mt-4 mb-5 pb-5">
                      <img src="https://via.placeholder.com/60" className="circle" width="60" alt="" />
                      <div>
                        <small className="text-muted fw-semibold">Anunciado por</small>
                        <p className="fw-bold">{itemData.creator}</p>
                      </div>
                    </div>
                  </div>
                  <div className="i-button p-2">
                    <p className="text-center small text-muted fw-semibold mb-1">Faça uma oferta utilizando seu CPR</p>
                    <button onClick={handleShow} className="btn btn-default btn-lg w-100 text-uppercase">Enviar Oferta</button>
                  </div> 
                </div>
                </>
              ) : (
                <h2 className="fw-bold mt-5">Item não encontrado</h2>
              )}
            </div>
          </div>
        </section>
      </Container>
      <GenericModal
        show={show}
        handleClose={handleClose}
        title="Fazer Oferta"
        centered={true}
        size="md"
        backdrop="static"
        keyboard={false}
      >
        <form onSubmit={handleSubmit}>
          <p className="small">Envie sua oferta agora mesmo. Selecione a moeda e informe o valor para da oferta.</p>
          <div className={`my-3 ${success.selectedValue ? 'is-valid' : ''}`}>
            <label htmlFor="offer-cripto" className="fw-semibold small text-muted">Vou ofertar com</label>
            <Select
              id="offer-cripto"
              options={options}
              value={selectedValue}
              onChange={handleSelectedValueChange}
              styles={customStyles}
              isSearchable={false}
              components={{
                Option: CustomOption,
              }}
              className={`form-control ${error.selectedValue ? 'is-invalid' : ''}`}
            />
            {error.selectedValue && <div className="invalid-feedback">{error.selectedValue}</div>}
          </div>
          <div className={`form-floating mb-3 ${success.offerValue ? 'is-valid' : ''}`}>
            <input 
              type="tel"
              name="offer-value"
              value={offerValue}
              onChange={handleOfferValueChange}
              className={`form-control ${error.offerValue ? 'is-invalid' : ''}`}
              id="floatingInput"
              placeholder="e.g: name@example.com"
            />
            <label htmlFor="floatingInput">Valor da oferta</label>
            {error.offerValue && <div className="invalid-feedback">{error.offerValue}</div>}
          </div>
          <button type="submit" className="btn btn-default w-100 text-uppercase">Enviar Oferta</button>
        </form>
      </GenericModal>
    </>
  );
};
