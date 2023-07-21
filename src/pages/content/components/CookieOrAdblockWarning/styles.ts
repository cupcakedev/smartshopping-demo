import styled from 'styled-components';

import { COLORS } from '@constants/theme';
import { Container as BaseContainer } from '@content/components/Demo/styles';

export const Container = styled(BaseContainer)`
    width: 700px;
    height: 350px;
`;

export const Text = styled.p`
    margin-top: 40px;
    padding: 0 40px;
    font-size: 20px;
    line-height: 1.25;
`;

export const PrimiaryText = styled.span`
    color: ${COLORS.primary};
    font-weight: bold;
    font-style: italic;
`;

export const Button = styled.button`
    display: inline-block;
    margin: 40px auto 0;
    padding: 20px 60px;
    border: none;
    border-radius: 12px;
    font-size: 20px;
    background-color: ${COLORS.primary};
    color: ${COLORS.white};
    cursor: pointer;
`;
