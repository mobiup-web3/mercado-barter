import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .h-logo img{
        width: 280px;
        border-radius: 16px;
    }

    @media(min-width: 767px){
        .h-logo img{
            width: 320px;
        }
    }
`;