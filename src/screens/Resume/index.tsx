import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale'

import { HistoryCard } from '../../components/HistoryCard';

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
} from './styles';
import { DataListProps } from '../Dashboard';
import { categories } from '../../utils/categories';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native';
import { Load } from '../../components/Load';

interface CategoryData {
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percentage: string;
}


export function Resume(){
  const { COLORS } = useTheme();

  const [ loading, setLoading ] = useState(true)
  const [ selectedDate, setSelectedDate ] = useState(new Date())
  const [ totalByCategories, setTotalByCategories ] = useState<CategoryData[]>([])

  function handleDateChange(action: 'next' | 'prev'){
    if(action === 'next'){
      setSelectedDate(addMonths(selectedDate, 1))
    } else {
      setSelectedDate(subMonths(selectedDate, 1))
    }
  }

  async function loadResumeData(){
    try{
      setLoading(true);
      const dataKey = '@gofinance:transactions';
      const response = await AsyncStorage.getItem(dataKey);
      const  responseFormatted = response ? JSON.parse(response) : []

      const spent = responseFormatted
      .filter((item: DataListProps) => 
        item.type === 'down' &&
        new Date(item.date).getMonth() === selectedDate.getMonth() &&
        new Date(item.date).getFullYear() === selectedDate.getFullYear() 
      )

      const spentTotal = spent.reduce((acumulator: number, item: DataListProps) => {
        return acumulator + Number(item.amount);
      }, 0)

      const totalByCategory: CategoryData[] = [];

      categories.forEach(category => {
        let categorySum = 0;

        spent.forEach((element: DataListProps) => {
          if(element.category === category.key){
            categorySum += Number(element.amount);
          }
        })
        
        if (categorySum){
          const totalFormatted = categorySum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })

          const percentage = `${((categorySum / spentTotal) * 100).toFixed(0)}%`;

          totalByCategory.push({
            name: category.name,
            total: categorySum,
            totalFormatted,
            color: category.color,
            percentage
          })
        }

      })

      setTotalByCategories(totalByCategory)

    } catch(e) {
      console.warn('Screen: Resume\nmethod: loadResumeData\nError ', e)
    } finally{
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() =>{
    loadResumeData();
  }, [selectedDate]))

  return(
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

    {
      loading ? <Load/> :  
      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: useBottomTabBarHeight()
        }}
      >

        <GestureHandlerRootView>
        <MonthSelect>
          <MonthSelectButton onPress={() => handleDateChange('prev')}>
            <MonthSelectIcon name="chevron-left"/>
          </MonthSelectButton>

        <Month>{format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}</Month>

          <MonthSelectButton onPress={() => handleDateChange('next')}>
            <MonthSelectIcon name="chevron-right"/>
          </MonthSelectButton>
        </MonthSelect>
        </GestureHandlerRootView>

        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            x="percentage"
            y="total"
            colorScale={totalByCategories.map(category => category.color)}
            style={{
              labels: { 
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: COLORS.SHAPE,
              
            }}
            }
            labelRadius={50}
          />
        </ChartContainer>

        {
          totalByCategories.map(item =>
          <HistoryCard
            title={item.name}
            amount={item.totalFormatted}
            color={item.color}
            key={item.name}
          />
          )}

      </Content>
      }
    </Container>
  )
}
