import { React, useState } from 'react'
import {View, Text,Button,  TextInput} from 'react-native'
import{adicionarItem} from "../../../database/dbcompras.js";
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';

export default function Cadastro() {

    const navigation = useNavigation(); // Usando o hook useNavigation
const [nome,setNome] = useState('');
const [quantidade,setQuantidade] = useState(1);
const [descricao,setDescricao] = useState('');
const [pegou,setPegou] = useState('');

const SalvarProdutoBanco = async () => {


    const produto =  {nome,quantidade,descricao}
const result = await adicionarItem(produto);

navigation.navigate('Home')
}


const mudarPegou = () => {
    setPegou(prev => {
    
        const newValue = !prev;
       
        return newValue;
    });
};

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

<Checkbox
                    value={pegou}
                    onValueChange={mudarPegou}
                    color={pegou ? 'green' :'black'}
                />


<Button
                title="Salvar produto"
               onPress={SalvarProdutoBanco}
                
            />

        </View>
  )
}
