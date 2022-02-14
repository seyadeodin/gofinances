import React from 'react';
import { categories } from '../../utils/categories';

import { 
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date
} from './styles';

export interface TransactionCardProps {
  type: 'up' | 'down';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface Props {
  data: TransactionCardProps;
}


export function TransactionCard({
  data: {
    name,
    amount,
    category,
    date,
    type,
  }
}:Props){

  const [categoryData]  = categories.filter(
    item => item.key === category
  )

  return(
    <Container>
      <Title>
        {name}
      </Title>

      <Amount type={type}>
        { type === 'down' && '- '}
        {amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={categoryData.icon} />
          <CategoryName>
            {categoryData.name}
          </CategoryName>
        </Category>
        <Date>
          {date}
        </Date>
      </Footer>
      
    </Container>
  )
}