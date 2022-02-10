import styled, { css } from 'styled-components/native'
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';

interface IconProps{
  type: 'up' | 'down';
}

interface ContainerProps{
  isActive: boolean;
  type: 'up' | 'down';
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  width: 48%;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  border: 1.5px solid ${({ theme }) => theme.COLORS.TEXT};
  border-radius: 5px;

  padding: 16px ;

  ${({ isActive, type, theme}) => isActive && type === 'up' && css`
    background-color:  ${theme.COLORS.SUCCESS_LIGHT};
    border: 0;
  `}

  ${({ isActive, type, theme}) => isActive && type === 'down' && css`
    background-color:  ${theme.COLORS.ATTENTION_LIGHT};
    border: 0;
  `}
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({ theme, type}) => 
  type === 'up' ? theme.COLORS.SUCCESS : theme.COLORS.ATTENTION
  };
`

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;

  ${({theme}) => css`
    font-family: ${theme.FONTS.REGULAR};
    color: ${theme.COLORS.TITLE}
  `}
`