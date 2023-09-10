import styled from 'styled-components';

export const Container = styled.div`
    min-height: 100vh;
    overflow: hidden;

    .m-tabs-menu .list-group-item{
        font-size: 13px;
        font-weight: 600;
        text-align: center;
        display: flex;
        align-items: center;
    }
    
    .m-tabs-menu .list-group-item.active{
        background-color: var(--m-default-color);
        border-color: var(--m-default-color);
    }
`;