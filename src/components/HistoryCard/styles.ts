import styled, { css } from "styled-components/native";

interface ContainerProps {
  color: string;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;

  background-color: ${({theme}) => theme.COLORS.SHAPE};

  flex-direction: row;
  justify-content: space-between;

  padding: 13px 24px;
  border-radius: 5px;
  border-left-width: 5px;
  border-left-color: ${({color}) => color};

  margin-bottom: 8px;
`

export const Title = styled.Text`
  font-size: 15px;
  ${({theme}) => css `
    font-family: ${theme.FONTS.REGULAR};
    color: ${theme.COLORS.TITLE}
  `}
`

export const Amount = styled.Text`
  font-size: 15px;
  ${({theme}) => css `
    font-family: ${theme.FONTS.BOLD};
    color: ${theme.COLORS.TITLE}
  `}

`