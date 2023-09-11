import { styled } from 'styled-components';

export const Container = styled.div`
    .generic-alert {
        cursor: pointer;
    }
    .generic-alert > div{
        height: 100%;
    }
    .generic-alert-icon i{
        font-size: 70px;
    }

    @media(min-width: 767px){
        .generic-alert{
            flex-direction: row !important;
        }
        .generic-alert-icon{
            position: relative;
            padding-right: 55px;
        }
        .generic-alert-icon::after{
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            width: 2px;
            background-color: rgba(0,0,0,.05);
        }
    }
`;
