import { React, useState } from 'react'
import {View, Text, TextInput} from 'react-native'

export default function Item() {

const [nome,setNome] = useState('');
const [quantidade,setQuantidade] = useState(1);
const [descricao,setDescricao] = useState('');

  return (
        <View>
            <Text> Nome do item* </Text>       
            <TextInput
  value={nome}
  onChangeText={setNome}
  placeholder="Nome do item"/>

            <Text> Quantidade do item </Text>
            <TextInput
  keyboardType="number-pad"  
  value={quantidade}
  onChangeText={setQuantidade}
  placeholder="Digite um número"/>

            <Text> Descrição </Text>
            <TextInput
  keyboardType="number-pad"  
  value={descricao}
 onChangeText={setDescricao}
  placeholder="Descrição do item"/>

        </View>
  )
}
