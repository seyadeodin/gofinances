import React from 'react';

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

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard(){
  const data: DataListProps[] = [
    {
        id: '1',
        type: 'positive',
        title:"Desenvolvimento de site",
        amount:"R$ 12.000,00",
        category:{
          name: 'Vendas',
          icon: 'dollar-sign'
        },
        date:"13/01/2022",
    },
    {
        id: '2',
        type: 'negative',
        title:"Aluguel do apartaento",
        amount:"R$ 3000,00",
        category:{
          name: 'Casa',
          icon: 'shopping-bag'
        },
        date:"10/01/2022",
    },
    {
        id: '3',
        type: 'negative',
        title:"Hamburguer Pizzya",
        amount:"R$ 59.00",
        category:{
          name: 'Alimentação',
          icon: 'coffee'
        },
        date:"04/01/2022",
    },
  ]


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