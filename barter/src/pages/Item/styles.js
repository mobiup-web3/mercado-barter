import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .h-logo img{
        width: 100%;
        border-radius: 16px;
    }

    @media(min-width: 767px){
        .h-logo{
            width: 320px;
        }
    }
`;