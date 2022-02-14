import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import { 
  Container,
  Header, 
  Photo, 
  UserWrapper, 
  User, 
  UserGreeting, 
  UserInfo, 
  UserName, 
  Icon, 
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton,
} from './styles';
import { Alert } from 'react-native';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard(){
  const [ data, setData ] = useState<DataListProps[]>([]);

  async function loadTransactions(){
    const  dataKey = '@gofinance:transactions';
    try{
      const response = await AsyncStorage.getItem(dataKey);
      const transactions = response ? (JSON.parse(response)) : []

      const transactionsFormatted: DataListProps[] =  transactions.map((item: DataListProps) => {
        const amount = Number(item.amount)
        .toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(item.date));
        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date
        }
      });

      setData(transactionsFormatted)
    } catch(e) {
      console.warn('Screen: Dashboard\nmethod: loadTransactions\nError ', e)
      Alert.alert('Erro', 'Erro ao carregar transações')
    }

  }

  useFocusEffect( 
    useCallback(() => {
      loadTransactions();
    }, [])
  )


  return(
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://www.github.com/seyadeodin.png'}}/>
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Lucas</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => console.log('Teste de funcionamento')}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>


    <HighlightCards>
      <HighlightCard 
        type="up"
        title="Entradas" 
        amount="17.800,00" 
        lastTransaction="Última entrada dia 02 de fevereiro"
      />
      <HighlightCard 
        type="down"
        title="Saídas" 
        amount="1859,00" 
        lastTransaction="Última saída dia 04 de fevereiro"
      />
      <HighlightCard 
        type="total"
        title="Total" 
        amount="15.941,00" 
        lastTransaction="01 à 16 de abril"
      />
    </HighlightCards>

    <Transactions>
      <Title>Listagem</Title>

      <TransactionsList
        data={data}
        renderItem={({ item }) => <TransactionCard data={item} />}
        keyExtractor={item => item.id}
      />
    </Transactions>

    </Container>
  )
}