const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Adicionei o CORS
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware para habilitar CORS
app.use(cors());

// Configura o Express para servir arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Middleware para analisar JSON do corpo das requisições
app.use(express.json());

// Configuração do transportador de e-mail
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // false para STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Rota para lidar com o envio de e-mails
app.post('/contact', async (req, res) => {
  const { email, name, subject, message } = req.body;

  // E-mail para o usuário
  const mailOptionsToUser = {
    from: process.env.EMAIL_USER,
    to: email, // E-mail do usuário
    subject: `Recebemos sua mensagem: ${subject}`,
    text: 'Agradecemos pelo seu contato!',
  };

  // E-mail para você
  const mailOptionsToMe = {
    from: process.env.EMAIL_USER,
    to: process.env.YOUR_EMAIL, // Seu e-mail
    subject: `Nova mensagem de ${name}: ${subject}`,
    text: `Mensagem de ${name} (${email}):\n\n${message}`,
  };

  try {
    // Enviar e-mail para o usuário
    await transporter.sendMail(mailOptionsToUser);
    // Enviar e-mail para você
    await transporter.sendMail(mailOptionsToMe);
    res.status(200).send('Email enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).send('Erro ao enviar email.');
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
