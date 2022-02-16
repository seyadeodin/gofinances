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
export const Content = styled.ScrollView`
  flex: 1;
  padding: 24px;

`