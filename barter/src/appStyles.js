import { styled } from 'styled-components';

export const Container = styled.div`
    --m-default-color: #0085ad;
    --m-default-color-hover: #4298b5;
    --m-secondary-color: #8db9ca;

    background: #f5f5f5;
    font-family: 'Inter', sans-serif;

    // resets
    ul{
        padding: 0;
        margin: 0;
        list-style: none;
    }

    //buttons
    .btn{
        font-size: 15px;
        font-weight: 600;
        padding: 12px 25px;
    }
    .btn-sm{
        border-radius: 10px !important;
        padding: 8px 25px;
        font-size: 13px;
        font-weight: 600;
    }

    //titles
    .page-title{
        font-size: 28px;
        font-weight: 600;
    }

    .btn-default{
        background-color: var(--m-default-color);
        color: #fff;
    }
    .btn-default:hover{
        background-color: var(--m-default-color-hover);
    }

`;
