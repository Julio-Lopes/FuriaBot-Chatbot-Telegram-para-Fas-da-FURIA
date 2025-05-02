require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { HLTV } = require('hltv');

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

const FURIA_TEAM_ID = 8297;

function sanitizeDots(text) {
  return text.replace(/\./g, '.\u200B'); 
}

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const message = `
👋 Bem-vindo ao *FuriaBot*!🤘

Este é um espaço feito por fãs, para fãs, com o objetivo de manter você sempre atualizado sobre tudo o que acontece com a nossa amada FURIA! 🎮🔥

Aqui você pode conferir as últimas partidas da FURIA, os jogadores que estão arrasando nas competições, e muito mais! 🏆

Use os comandos abaixo para interagir:

/historicodejogos – Fique por dentro dos jogos passados e resultados da FURIA  

/jogadores – Conheça a line-up atual da FURIA e os perfis dos jogadores 

/redesociais – Siga a FURIA nas redes sociais e fique ainda mais conectado com a comunidade  

/sobre – Saiba tudo sobre a história da FURIA e suas conquistas

⚡ Vamos juntos apoiar nossa equipe rumo a mais vitórias! 💪
  `;

  bot.sendMessage(chatId, message, { 
    parse_mode: 'Markdown', 
    disable_web_page_preview: true 
  });
});

bot.onText(/\/historicodejogos/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    const team = await HLTV.getTeamStats({ id: FURIA_TEAM_ID });

    const pastMatches = team.matches?.filter((match) => match.date < Date.now()) || [];

    if (pastMatches.length === 0) {
      bot.sendMessage(chatId, '🚫 Nenhum jogo encontrado no histórico da FURIA.', {
        disable_web_page_preview: true 
      });
      return;
    }

    let message = '📅 *Histórico de Jogos da FURIA:*\n\n';

    pastMatches.slice(0, 5).forEach((match) => {
      const opponentRaw = match.team1.id === FURIA_TEAM_ID ? match.team2.name : match.team1.name;
      const opponent = sanitizeDots(opponentRaw);
      const date = match.date ? new Date(match.date).toLocaleDateString('pt-BR') : 'Data não definida';
      const eventName = sanitizeDots(match.event?.name || 'Evento não definido');
      const result = match.result ? `${match.result.team1} : ${match.result.team2}` : 'Resultado não disponível';

      message += `🆚 *FURIA x ${opponent}*\n`;
      message += `🎮 *Resultado:* ${result}\n`;
      message += `📍 *Evento:* ${eventName}\n`;
      message += `🗓️ *Data:* ${date}\n\n`;
    });

    bot.sendMessage(chatId, message, { 
      parse_mode: 'Markdown', 
      disable_web_page_preview: true 
    });
  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, '⚠️ Erro ao buscar os jogos da FURIA. Tente novamente mais tarde.', {
      disable_web_page_preview: true
    });
  }
});

bot.onText(/\/jogadores/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    const team = await HLTV.getTeam({ id: FURIA_TEAM_ID });
    const lineup = team.players || [];
    console.log(lineup);

    if (lineup.length === 0) {
      bot.sendMessage(chatId, '🚫 Nenhum jogador encontrado.', { 
        disable_web_page_preview: true
      });
      return;
    }

    let message = '👥 *Line-up atual da FURIA:*\n\n';

    lineup.forEach((player) => {
      const profileUrl = `https://www.hltv.org/player/${player.id}/${encodeURIComponent(player.name)}`;
      message += `🎮 *${player.name}*\n[Ver perfil no HLTV](${profileUrl})\n\n`;
    });

    bot.sendMessage(chatId, message, { 
      parse_mode: 'Markdown', 
      disable_web_page_preview: true 
    });
  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, '⚠️ Erro ao buscar os jogadores da FURIA.', { 
      disable_web_page_preview: true
    });
  }
});

bot.onText(/\/redesociais/, (msg) => {
  const chatId = msg.chat.id;

  const message = `
🌐 *Siga a FURIA nas redes sociais:*

📲 [Twitter (X)](https://x.com/FURIA)  
📸 [Instagram](https://www.instagram.com/furiagg/)
  `;

  bot.sendMessage(chatId, message, { 
    parse_mode: 'Markdown', 
    disable_web_page_preview: true 
  });
});

bot.onText(/\/sobre/, (msg) => {
  const chatId = msg.chat.id;

  const message = `
🏆 *Sobre a FURIA Esports:*

A FURIA é uma organização de esports brasileira, com destaque nas modalidades de Counter-Strike: Global Offensive (CS:GO) e outros jogos competitivos. Com uma base sólida de fãs e uma equipe de jogadores de alta performance, a FURIA tem se destacado no cenário mundial.

🌍 A FURIA é conhecida por seu estilo agressivo e estratégico de jogo, conquistando grandes vitórias em competições internacionais, como o ESL Pro League e o BLAST Premier.

⚡ *Curiosidades:* 
- Fundada em 2017
- A FURIA é uma das principais equipes de CS:GO do Brasil
- Possui uma das bases de fãs mais engajadas nas redes sociais

Siga a FURIA nas redes sociais /redesociais para ficar por dentro de todas as novidades e conquistas!
  `;

  bot.sendMessage(chatId, message, { 
    parse_mode: 'Markdown', 
    disable_web_page_preview: true 
  });
});