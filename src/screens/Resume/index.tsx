import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { HistoryCard } from '../../components/HistoryCard';

import {
  Container,
  Header,
  Title,
  Content,
} from './styles';
import { DataListProps } from '../Dashboard';
import { categories } from '../../utils/categories';

interface CategoryData {
  name: string;
  total: string;
  color: string;
}


export function Resume(){
  const [ totalByCategories, setTotalByCategories ] = useState<CategoryData[]>([])

  async function loadResumeData(){
    try{
      const dataKey = '@gofinance:transactions';
      const response = await AsyncStorage.getItem(dataKey);
      const  responseFormatted = response ? JSON.parse(response) : []

      console.log({responseFormatted})

      const spent = responseFormatted
      .filter((item: DataListProps) => item.type === 'down' )

      const totalByCategory: CategoryData[] = [];

      categories.forEach(category => {
        let categorySum = 0;

        spent.forEach((element: DataListProps) => {
          if(element.category === category.key){
            categorySum += Number(element.amount);
          }
        })
        
        if (categorySum){
          const total = categorySum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })

          totalByCategory.push({
            name: category.name,
            total: total,
            color: category.color
          })
        }

      })

      setTotalByCategories(totalByCategory)

    } catch(e) {
      console.warn('Screen: Resume\nmethod: loadResumeData\nError ', e)
    }
  }

  useEffect(() =>{
    loadResumeData();
  }, [])

  return(
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        {
          totalByCategories.map(item =>
          <HistoryCard
            title={item.name}
            amount={item.total}
            color={item.color}
          />
          )}
      </Content>
    </Container>
  )
}
