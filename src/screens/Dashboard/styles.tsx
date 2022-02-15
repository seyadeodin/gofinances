import styled from 'styled-components/native';
import { FlatList, FlatListProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper'

import { DataListProps } from '.';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme: {COLORS} }) => COLORS.BACKGROUND};
`

export const Header = styled.View`
  width: 100%;
  background-color: ${({theme : {COLORS}}) => COLORS.PRIMARY};
  height: ${RFPercentage(38)}px;
  flex-direction: row;

  align-items: flex-start;
  justify-content: center;
`

export const UserWrapper = styled.View`
  width: 100%;

  padding: 0 24px;
  margin-top: ${getStatusBarHeight() + RFValue(28)}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 10px;
`

export const User = styled.View`
  margin-left: 17px;
`

export const UserGreeting = styled.Text`
  color: ${({ theme:{COLORS}}) => COLORS.SHAPE};

  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;

export const UserName = styled.Text`
  color: ${({ theme:{COLORS}}) => COLORS.SHAPE};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.FONTS.BOLD};
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.COLORS.SECONDARY};
  font-size: ${RFValue(24)}px;
`;


export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingLeft: 24,
  }
})`
  position: absolute;
  width: 100%;
  margin-top: ${RFPercentage(20)}px;
`;

export const Transactions = styled.View`
  flex: 1;
  padding: 0 24px;

  margin-top: ${RFPercentage(12)}px;
`

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.FONTS.REGULAR};
  
  margin-bottom: 16px;
`
export const TransactionsList = styled(
  FlatList as new (props: FlatListProps<DataListProps>) => FlatList<DataListProps>
  ).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 30
  }
})``;

export const LogoutButton = styled.TouchableWithoutFeedback``

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`