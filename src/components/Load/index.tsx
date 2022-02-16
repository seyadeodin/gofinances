import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

import { Container } from './styles';

export function Load(){
  const { COLORS } = useTheme();

  return(
      <Container>
        <ActivityIndicator  
          color={COLORS.PRIMARY} 
          size='large' />
      </Container>  
  )
}