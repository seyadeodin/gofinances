import React, { useState } from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { InputForm } from '../../components/Form/InputForm';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

import { CategorySelect } from '../CategorySelect';

import { 
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles';

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup
  .string()
  .required('Nome é obrigatório'),
  amount: Yup
  .number()
  .typeError('Informe um valor numérico')
  .positive('O valor não pode ser negativo')
  .required('O valor é obrigatório')
})

export function Register(){
  const { 
    control, 
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const [ transactionType, setTransactionType ] = useState('')
  const [ categoryModalOpen, setCategoryModalOpen ] = useState(false)

  const [ category, setCategory ] = useState({
    key: 'category',
    name: 'Categoria',
  });

  function handleTransactionTypeSelect(type: 'up' | 'down'){
    setTransactionType(type);
  }

  function handleCategoryModal(){
    setCategoryModalOpen(!categoryModalOpen)
  }

  function handleRegister(form: FormData){
    if(!transactionType) return Alert.alert('Formulário', 'Selecione o tipo da transação')

    if(category.key === 'category') return Alert.alert('Formulário', 'Selecone a categoria')

    if(!transactionType) return Alert.alert('Formulário', 'Selecione o tipo da transação')

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category
    }
    console.log(data)
  }

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>


        <Form>
          <Fields>
            <InputForm
              name="name"
              placeholder="Nome"
              control={control}
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              placeholder="Preço"
              control={control}
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />


          <TransactionsTypes>
            <TransactionTypeButton
              type="up"
              title="Income" 
              onPress={() => handleTransactionTypeSelect('up')}
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome" 
              onPress={() => handleTransactionTypeSelect('down')}
              isActive={transactionType === 'down'}
            />
          </TransactionsTypes>

          <CategorySelectButton 
            title={category.name} 
            onPress={handleCategoryModal}
          />

          </Fields>

          <Button 
            title="Enviar"
            onPress={handleSubmit(handleRegister)}
          />
        </Form>

        <Modal
          visible={categoryModalOpen}
          animationType='slide'
        >
          <CategorySelect 
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}