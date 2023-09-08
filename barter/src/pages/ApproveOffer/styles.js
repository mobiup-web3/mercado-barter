import styled from 'styled-components';

export const Container = styled.div`
    .i-media{
        display: flex;
        align-items: center;
        margin-bottom: 1.5rem;
        max-height: 180px;
        justify-content: center;
    }

    .i-media img{
        object-fit: cover;
        object-position: center;
        height: 100%;
        max-height: 180px;
    }

    .i-value-cripto > div{
        background-color: rgba(0,0,0,.03);
        border-radius: 12px;
        padding: 8px;
        flex: 1;
    }

    .i-value-cripto p{
        margin: 0;
        font-size: 16px;
    }
    
    .i-value-cripto small{
        font-size: 65%;
    }

    .i-button{
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: #fff;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-top: 1px solid rgba(0,0,0,0.05);
        
        // min-height: 70px;
    }

    .i-offer-icon{
        background-color: var(--m-default-color);
        min-height: 40px;
        height: 100%;
        border-radius: 6px;
        flex: 0 0 20%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 22px;
        line-height: 0;
    }

    .i-offer-item{
        flex: 0 0 60%;
    }

    .i-offer-item > div:nth-child(2) > span:first-child{
        font-weight: 600;
    }

    .i-offer-item > div:nth-child(2) > span:last-child{
        font-weight: 600;
        font-size: 12px;
        color: var(--bs-secondary-color);
        line-height: 1.2;
    }

    .i-offer-info-value{
        font-size: 14px;
        font-weight: 700;
    }

    .i-resume-checkout{
        border-radius: 8px;
        padding: 8px 10px;
        background-color: rgba(0,0,0,.05);
        // backdrop-filter: blur(8px);
    }
`;