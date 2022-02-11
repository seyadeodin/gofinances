import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';

interface TitleProps{
  title: string;
}

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: Number(0.7),
})`
  background-color: ${({theme}) => theme.COLORS.SHAPE};
  flex-direction: row;
  justify-content: space-between;

  border-radius: 5px;
  padding: 18px 16px;
`

export const Category = styled.Text<TitleProps>`
  font-family: ${({theme}) => theme.FONTS.REGULAR };
  color: ${({theme, title}) => title === 'Categoria' ? theme.COLORS.TEXT : theme.COLORS.TITLE};
  font-size: ${RFValue(14)}px;
`

export const Icon = styled(Feather)`
  color: ${({theme}) => theme.COLORS.TEXT};
  font-size: ${RFValue(20)}px;
`