# 🤖 FuriaBot - Chatbot Telegram para Fãs da FURIA

## 📝 Descrição

O **FuriaBot** é um chatbot desenvolvido como parte de um processo seletivo da FURIA Esports. Ele tem como objetivo fornecer informações relevantes sobre o time de CS:GO da FURIA diretamente pelo Telegram.  
Por meio de comandos interativos, o bot exibe histórico de partidas, line-up atual de jogadores, redes sociais da organização e uma breve história da equipe.

---

## 🚀 Tecnologias Utilizadas

- **JavaScript (Node.js)**
- **node-telegram-bot-api** – para integração com o Telegram
- **HLTV API Wrapper** – para obter dados atualizados de partidas e jogadores

---

## 💬 Comandos Disponíveis

| Comando              | Descrição                                                                 |
|----------------------|--------------------------------------------------------------------------|
| `/start`             | Mensagem de boas-vindas e introdução ao bot                              |
| `/historicodejogos`  | Exibe os últimos jogos da FURIA com resultado, evento e data             |
| `/jogadores`         | Mostra a line-up atual da FURIA com links para o perfil dos jogadores    |
| `/redesociais`       | Links para as redes sociais oficiais da FURIA                            |
| `/sobre`             | Informações gerais sobre a organização FURIA Esports                     |

---

## ⚙️ Como Executar o Projeto

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/Julio-Lopes/FuriaBot-Chatbot-Telegram-para-Fas-da-FURIA
   cd FuriaBot-Chatbot-Telegram-para-Fas-da-FURIA
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:  
   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
   ```env
   TELEGRAM_TOKEN=seu_token_do_bot
   ```

4. **Execute o bot**:
   ```bash
   node index.js
   ```

> **Observação**: Certifique-se de que o bot está registrado e ativado via [BotFather](https://t.me/BotFather) no Telegram.

---

## 📦 Estrutura do Projeto

```
├── index.js          # Código principal do bot
├── .env              # Variáveis de ambiente
├── package.json      # Dependências e scripts
└── README.md         # Documentação do projeto
```
