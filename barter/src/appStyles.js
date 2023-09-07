import { styled } from 'styled-components';

export const Container = styled.div`
    --m-default-color: #0085ad;
    --m-default-color-hover: #4298b5;
    --m-secondary-color: #8db9ca;
    --m-bg: #f5f5f5;

    background: var(--m-bg);
    font-family: 'Inter', sans-serif;

    // resets
    ul{
        padding: 0;
        margin: 0;
        list-style: none;
    }
    .form-control:focus,
    .form-control:active{
        box-shadow: none;
        outline: none;
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
    .btn-default{
        background-color: var(--m-default-color);
        color: #fff;
    }
    .btn-default:hover{
        background-color: var(--m-default-color-hover);
    }
    .btn-default:focus,
    .btn-default:active{
        background-color: var(--m-default-color);
        color: #fff;
    }

    //generics
    .text-underline{
        text-decoration: underline !important;
    }
    .circle{
        border-radius: 50px !important;
    }

    //titles
    .page-title{
        font-size: 28px;
        font-weight: 600;
    }

    

`;
