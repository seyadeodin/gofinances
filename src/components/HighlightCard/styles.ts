import styled, { css } from "styled-components/native";
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

interface CardProps {
  type: 'up' | 'down' | 'total';
}

export const Container = styled.View<CardProps>`
  background-color: ${({theme}) => theme.COLORS.SHAPE}

  width: ${RFValue(300)}px;
  border-radius: 5px;

  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;
  margin-right: 16px;

  ${({type, theme}) => type === 'total' && css`
    background-color: ${theme.COLORS.SECONDARY};
  `}
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const Title = styled.Text<CardProps>`
  font-size: ${RFValue(14)}px;

  ${({theme, type}) => css`
    font-family: ${theme.FONTS.REGULAR};
    color: ${type === 'total' ? theme.COLORS.SHAPE : theme.COLORS.TITLE}
  `}
`


export const Icon = styled(Feather)<CardProps>`
  font-size: ${RFValue(40)}px;

  ${({type, theme}) => type === 'up' && css`
    color: ${theme.COLORS.SUCCESS};
  `}

  ${({type, theme}) => type === 'down' && css`
    color: ${theme.COLORS.ATTENTION};
  `}

  ${({type, theme}) => type === 'total' && css`
    color: ${theme.COLORS.SHAPE};
  `}
`

export const Footer = styled.View``

export const Amount = styled.Text<CardProps>`
  font-size: ${RFValue(32)}px;

  ${({theme, type}) => css`
    font-family: ${theme.FONTS.MEDIUM};
    color: ${type === 'total' ? theme.COLORS.SHAPE : theme.COLORS.TITLE}
  `}
`

export const LastTransaction = styled.Text<CardProps>`
  font-size: ${RFValue(12)}px;

  ${({theme, type}) => css`
    font-family: ${theme.FONTS.REGULAR};
    color: ${type === 'total' ? theme.COLORS.SHAPE : theme.COLORS.TEXT}
  `}
`