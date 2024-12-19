import { React, useState } from 'react'
import {View, Text,Button,  TextInput} from 'react-native'
import{adicionarItem,atualizarItem,deletarItem} from "../../../database/dbcompras.js";
import { useNavigation } from '@react-navigation/native';
export default function Edicao({ navigation, route }) {


const produto = route.params?.produto || {};
const [nome,setNome] = useState(produto.nome||'');
const nagevacao = useNavigation(); // Usando o hook useNavigation
const id =  produto.id;
const [quantidade,setQuantidade] = useState(produto.quantidade||1);
const [descricao,setDescricao] = useState(produto.descricao||'');

const AtualizarProdutoBanco = async () => {


    const produto =  {nome,quantidade,descricao,id}
const result = await atualizarItem(produto);

nagevacao.navigate('Home')
console.log('result valor')
console.log(result)

}



const DeletarProdutoBanco = async () => {



const result = await deletarItem(produto.id);


console.log('result valor')
console.log(result)

nagevacao.navigate('Home')

}


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
  value={descricao}
 onChangeText={setDescricao}
  placeholder="Descrição do item"/>

<Button
                title="Salvar produto"
               onPress={AtualizarProdutoBanco}
                
            />

            
<Button
                title="Excluir  produto"
               onPress={DeletarProdutoBanco}
                
            />

        </View>
  )
}
