import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
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
  LoadContainer,
} from './styles';
import { Alert } from 'react-native';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps{
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps; 
  spent: HighlightProps; 
  total: HighlightProps;
}


export function Dashboard(){
  const [ data, setData ] = useState<DataListProps[]>([]);
  const [ highlightData, setHighlightData ] = useState<HighlightData>({} as HighlightData)
  const [ loading, setLoading ] = useState(true);

  const { COLORS } = useTheme()

  function getLastTransaction(
    collection: DataListProps[],
    type: 'up'|'down'
  ){
    return formatDate(new Date(Math.max.apply(Math, collection
    .filter((transaction: DataListProps) => transaction.type === type)
    .map((transaction: DataListProps) => new Date(transaction.date).getTime())
    )), 'short')
  }

  function convertToCurrency(value: number){
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  function formatDate(value: Date, type: 'number'|'short'){
    return Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: type === 'number' ? '2-digit' : 'short',
      year: 'numeric' 
      
    }).format(value);
  }

  async function loadTransactions(){
    const  dataKey = '@gofinance:transactions';
    try{
      const response = await AsyncStorage.getItem(dataKey);
      const transactions = response ? (JSON.parse(response)) : []

      let entriesSum = 0;
      let spentSum = 0

      const transactionsFormatted: DataListProps[] =  transactions.map((item: DataListProps) => {

        if(item.type === 'up'){
          entriesSum += Number(item.amount)
        } else if (item.type === 'down') {
          spentSum += Number(item.amount)
        }

        const amount = Number(item.amount)
        .toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        const date = formatDate(new Date(item.date), 'number')

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

      const lastTransactionEntries = getLastTransaction(transactions, 'up');
      const lastTransactionSpent = getLastTransaction(transactions, 'down');
      
      const totalInterval = `De ${formatDate(new Date(transactions[0].date), 'number')} a ${formatDate(new Date(transactions[transactions.length - 1].date), 'number')}`;

      setHighlightData({
        spent: {
          amount: convertToCurrency(spentSum),
          lastTransaction: String(lastTransactionSpent)
        },
        entries: {
          amount: convertToCurrency(entriesSum),
          lastTransaction: String(lastTransactionEntries)
        },
        total: {
          amount: convertToCurrency(entriesSum-spentSum),
          lastTransaction: totalInterval
        }
      })
    } catch(e) {
      console.warn('Screen: Dashboard\nmethod: loadTransactions\nError ', e)
      Alert.alert('Erro', 'Erro ao carregar transações')
    } finally {
      setLoading(false)
    }

  }

  useFocusEffect( 
    useCallback(() => {
      loadTransactions();
    }, [])
  )


  return(
    <Container>
    {
      loading ? <LoadContainer><ActivityIndicator color={COLORS.PRIMARY} size={25}/></LoadContainer> :  
      <>
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
            amount={highlightData.entries?.amount} 
            lastTransaction={`Última entrada dia ${highlightData.entries?.lastTransaction}`}
          />
          <HighlightCard 
            type="down"
            title="Saídas" 
            amount={highlightData.spent?.amount} 
            lastTransaction={`Última saída dia ${highlightData.spent?.lastTransaction}`}
          />
          <HighlightCard 
            type="total"
            title="Total" 
            amount={highlightData.total?.amount} 
            lastTransaction={highlightData.total?.lastTransaction}
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
      </>
    }

    </Container>
  )
}