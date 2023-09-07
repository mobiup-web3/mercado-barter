import styled from 'styled-components';

import backgroundImage from '../../assets/img/gradientbg-animated.svg';

export const Container = styled.div`
    height: 100vh;
    background-color: var(--m-bg);
    background-image: url(${backgroundImage});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    text-align: center;

    :is(.container,.row){
        height: 100%
    }

    .e-content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
    }

    h1{
        font-size: 72px;
        font-weight: 700;
    }

    h2{
        font-size: 26px;
        font-weight: 700;
        margin-bottom: 1rem;
    }


`;