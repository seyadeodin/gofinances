import { RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'
import { Feather } from '@expo/vector-icons'
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler'

interface CategoryProps{
  isActive: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.COLORS.BACKGROUND};
`

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;
  background-color: ${({theme}) => theme.COLORS.PRIMARY};

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;

  ${({theme}) => css`
    font-family: ${theme.FONTS.REGULAR};
    color: ${theme.COLORS.SHAPE};
  `}
`

export const Category = styled.TouchableOpacity<CategoryProps>`
 width: 100%;
 padding: ${RFValue(15)}px;

 flex-direction: row;
 align-items: center;
${({ isActive, theme }) => isActive && css`
  background-color: ${theme.COLORS.SECONDARY_LIGHT};`
}
`
export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  margin-right: 16px;
`

export const Name = styled.Text`
  font-size: ${RFValue(14)}px;

  ${({theme}) => css`
    font-family: ${theme.FONTS.REGULAR};
    color: ${theme.COLORS.TITLE};
  `}
`
export const Separator = styled.View`
  height: 0.5px;
  background-color: ${({theme}) => theme.COLORS.TEXT};
`
export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`