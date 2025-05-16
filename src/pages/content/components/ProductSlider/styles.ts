import styled, { keyframes, css } from 'styled-components';
import { COLORS } from '@constants/theme';

const fadeIn = keyframes`
    from { right: -360px; opacity: 0; }
    to { right: 0; opacity: 1; }
`;

const fadeOut = keyframes`
    from { right: 0; opacity: 1; }
    to { right: -360px; opacity: 0; }
`;

export const Container = styled.div<{ fade: 'in' | 'out' }>`
    position: relative;
    width: 340px;
    text-align: center;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    padding: 32px 20px;
    background-color: ${COLORS.white};
    color: ${COLORS.grey};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    animation: ${({ fade }) =>
        fade === 'in'
            ? css`
                  ${fadeIn} 0.4s ease-out forwards
              `
            : css`
                  ${fadeOut} 0.3s ease-in forwards
              `};
`;

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Logo = styled.img`
    width: 180px;
    height: auto;
    margin-bottom: 8px;
`;

export const Title = styled.h2`
    font-size: 20px;
    font-weight: bold;
    color: ${COLORS.dark};
    margin: 0;
`;

export const Label = styled.span`
    font-size: 16px;
    font-weight: 500;
    color: ${COLORS.grey};
`;

export const Price = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: ${COLORS.primary};
`;

export const Sku = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: ${COLORS.primary};
`;

export const ImageWrapper = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: center;
    width: 100%;
`;

export const ProductImage = styled.img`
    width: 100%;
    height: auto;
    max-width: 100px;
    border-radius: 8px;
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 12px;
    right: 12px;
    background: none;
    border: none;
    cursor: pointer;
`;

export const CloseIconStyled = styled.img`
    width: 12px;
    transition: 0.2s;
    &:hover {
        transform: scale(1.2);
    }
`;
