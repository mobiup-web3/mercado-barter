import styled from 'styled-components';

export const Container = styled.div`
    .i-media{
        display: flex;
        align-items: center;
        margin-bottom: 1.5rem;
    }

    .i-media img{
        object-fit: cover;
        object-position: center;
        height: 100%;
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
`;