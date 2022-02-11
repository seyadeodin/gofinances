import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler'

export const Container =styled.TouchableOpacity`
  width: 100%;
  background-color: ${({theme }) => theme.COLORS.SECONDARY};

  border-radius: 5px;
  padding: 18px;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  
  ${({theme}) => css`
    font-family: ${theme.FONTS.MEDIUM};
    color: ${theme.COLORS.SHAPE};
  `}

`