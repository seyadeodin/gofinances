import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
`

export const Error = styled.Text`
  font-size: ${RFValue(14)}px;

  ${({theme}) =>  css`
    color: ${theme.COLORS.ATTENTION}
    font-family: ${theme.FONTS.REGULAR}
  `}

  margin: 0 7px;
`