import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;

    article{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }

    .o-navigation{
        border-radius: 16px;
        // background-color: #f0f0f0;
        padding: 20px 16px;
    }

    .o-navigation li{
        display: flex;
        justify-content: space-between;
        align-items: center;

        position: relative;
    }

    .o-navigation li:not(:last-child){
        margin-bottom: 1rem;
        padding-bottom: 1rem;
    }

    .o-navigation li:not(:last-child):after{
        content: '';
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 1px;
        background-color: rgba(0,0,0,.05);
    }

    .o-navigation li > div:nth-child(1){
        display: flex;
        align-items: center;
    }

    .o-footer{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;