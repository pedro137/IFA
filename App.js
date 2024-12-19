

import React, { useEffect, useState } from 'react';
import { View, Text, Button,FlatList, Pressable } from 'react-native';
import { createStaticNavigation,useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cadastro from './componentes/Item/Cadastro';
import { atualizarPegou, mostrarItens } from './database/dbcompras';
import Edicao from './componentes/Item/Edicao';
import Checkbox from 'expo-checkbox';

function TelaInicial() {
  const navigation = useNavigation();
  const [produtos, setProdutos] = useState([]);
  const [pegou,setPegou] = useState('');

  
  useEffect(() => {
    const fetchProdutos = async () => {
      const result = await mostrarItens();  // Assume que o retorno é uma lista de produtos
      setProdutos(result); // Armazena a lista no estado
    };

    fetchProdutos();
  }, []);


  const AtualizarPegouBanco = async (id,pego) => {


    const produto =  {id,pego}
const result = await atualizarPegou(produto);


console.log('chamou a função')
console.log(result)
}

  const renderItem = ({ item }) => (


    <View>
    <Pressable onPress={() => navigation.navigate('Edicao', { produto: item })}>
        <View>
            <Text style={item.pego === 1 ?  { textDecorationLine: 'line-through'}:{}}>Item: {item.nome}</Text>
            <Text>Quantidade: {item.quantidade}</Text>
            <Text>Descrição: {item.descricao}</Text>
          </View>
    </Pressable>
    <Checkbox
  value={item.pego === 1 ? true : false}
  onValueChange={() => mudarPegou(item.id, item.pego)}
  color={item.pego === 1 ? 'green' : 'black'}
/>

    </View>

);


const  mudarPegou = async (id,pego) => {
  const novoValor = pego === 1 ? 0 : 1; 

  console.log('novoValor')
  console.log(novoValor)
const result = await AtualizarPegouBanco(id,novoValor);
  console.log('result')
console.log(result)

const fetchProdutos = async () => {
  const result = await mostrarItens();  
  setProdutos(result); 
};

fetchProdutos();  

};

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      
<Button
                title="Novo produto"
               onPress={() => navigation.navigate('Cadastro')}
                
            />

      <Text>Sua Lista de Compras</Text>
      
      <FlatList
                data={produtos}
                renderItem={renderItem}
                keyExtractor={(item, index) => {
                   
                    return item.id ? item.id.toString() : index.toString();
                }}
            />




    </View>
  );
}

function TelaCadastro() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Cadastro/>
    </View>
  );
}

const RootStack = createNativeStackNavigator({
  screens: {
    Home: TelaInicial, 
    Cadastro: TelaCadastro,
    Edicao:Edicao
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}