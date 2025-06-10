const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Criptografa a senha antes de salvar o usuário
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) { // Só faz hash se a senha foi modificada ou é nova
        next();
    }

    const salt = await bcrypt.genSalt(10); // Gera um 'salt'
    this.password = await bcrypt.hash(this.password, salt); // Faz o hash da senha
});

// Comparar a senha fornecida com a senha hash no banco de dados
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);