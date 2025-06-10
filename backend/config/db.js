const mongoose = require('mongoose');
require('dotenv').config(); //Garante que as variáveis de ambiente sejam carregadas

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Conectado: ${conn.connection.host}`);

  } catch (error) {
    
    console.error(`Erro ao conectar ao MongoDB: ${error.message}`);
    process.exit(1); // Sai do processo com falha

  }
};

module.exports = connectDB;