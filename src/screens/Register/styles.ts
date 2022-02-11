import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
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

export const Form = styled.View`
  flex: 1;
  width: 100%;
  justify-content: space-between;

  padding: 24px;
`

export const Fields = styled.View`
`

export const TransactionsTypes = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 8px 0 16px;
`