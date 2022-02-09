import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
`
export const Header = styled.View`
  background-color: ${({theme}) => theme.COLORS.PRIMARY};

  width: 100%;
  height: ${RFValue(113)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`

export const Title = styled.Text`
  font-size: 18px;

  ${({theme}) => css`
    font-family: ${theme.FONTS.REGULAR};
    color: ${theme.COLORS.SHAPE};
  `}
`