import * as SQLite from 'expo-sqlite';

export const openDatabase = async () => {
  try {

    const db = await SQLite.openDatabaseAsync('dbcompras');
    return db;
  } catch (error) {
    throw error;
  }
};

export const criarTabela = async () => {
  try {
    const db = await openDatabase();
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS produtos  (  
           id INTEGER PRIMARY KEY AUTOINCREMENT, 
           nome TEXT NOT NULL, 
           quantidade int ,
           descricao  TEXT ,
           pego BIT  ) ; 
        `);
  } catch (error) {
    throw error;
  }
};


export const adicionarItem = async (produto) => {

  console.log('produto')
console.log(produto)

  try {
    const db = await openDatabase();
    criarTabela();

    const result = await db.runAsync(`
   INSERT INTO produtos (nome, quantidade,descricao,pego) VALUES (?,?,?,?);     
        `, [produto.nome, produto.quantidade, produto.descricao, produto.pego]);
    return result;

    console.log('deu bom ')
  } catch (error) {

    console.log('deu ruim ')
    console.log(error)
    throw error;
  }
};

export const atualizarItem = async (produto) => {
  console.log('produtoat')
  console.log(produto)
  try {

    console.log(produto)
    const db = await openDatabase();
    criarTabela();
    const result = await db.runAsync(`
  UPDATE produtos SET nome = ?, quantidade = ?, descricao = ? WHERE id = ? 
        `, [produto.nome, produto.quantidade, produto.descricao, produto.id]);
      console.log('depis de editar')
        console.log(produto)
    return result;
  } catch (error) {
    console.log('erro a')
    console.log(error)
    throw error;
  }
};

export const deletarItem = async (id) => {
  try {
    const db = await openDatabase();
    criarTabela();
    const result = await db.runAsync(`
  DELETE FROM produtos WHERE id = ?
        `, [id]);
    return result;
  } catch (error) {
    console.log('erro')
    console.log(error)
    throw error;
  }
};

export const mostrarItens = async (id) => {
  try {
    const db = await openDatabase();
    criarTabela();
    const result = await db.getAllAsync('SELECT * FROM produtos');

    return result;
  } catch (error) {
    throw error;
  }
};



export const atualizarPegou = async (produto) => {

  try {

 
    const db = await openDatabase();
    criarTabela();
    const result = await db.runAsync(`
  UPDATE produtos SET pego = ? WHERE id = ? 
        `, [produto.pego, produto.id]);
     
    return result;
  } catch (error) {
    console.log('erro a')
    console.log(error)
    throw error;
  }
};