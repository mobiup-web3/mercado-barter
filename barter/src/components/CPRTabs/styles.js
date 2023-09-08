import { styled } from 'styled-components';

export const TabsContent = styled.nav`
    .m-tabs-menu{
        overflow-x: auto;
    }

    .m-tabs-item{
        position: relative;
    }

    .m-tabs-item .link-icon{
        position: absolute;
        right: .2rem;
        top: 50%;
        transform: translateY(-50%);
    }

    .m-tabs-item-media{
        flex: 0 0 35%;
    }

    .m-tabs-item-media img{
        min-height: 120px;
        object-fit: cover;
    }

    .m-tabs-item-info{
        width: 100%;
    }

    .m-tabs-item-info h4{
        font-size: 18px;
        line-height: 120%;
    }

    .m-tabs-item-info p{
        font-size: 14px;
        margin-bottom: .5rem
    }

    .m-tabs-item-info .m-tabs-item-value{
        font-size: 14px;
        font-weight: 600;
    }

    .m-tabs-item-info .m-tabs-item-cripto{
        font-size: 12px;
        font-weight: 600;
    }

    .m-tabs-item-info .m-tabs-item-cripto-value{
        font-size:
    }
`;

