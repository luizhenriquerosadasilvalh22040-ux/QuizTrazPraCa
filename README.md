# Traz Pra Cá — Quiz

Quiz responsivo feito em HTML, CSS e JavaScript puro. Não precisa de build, servidor ou dependências: a Vercel pode publicar os arquivos estáticos diretamente.

## Configurar o WhatsApp

Antes de publicar, abra `app.js` e preencha `WHATSAPP_NUMBER` com o número da equipe, incluindo código do país e DDD, mas sem `+`, espaços ou pontuação. Exemplo:

```js
const WHATSAPP_NUMBER = "5511999999999";
```

Enquanto o número estiver vazio, os botões do resultado abrem o WhatsApp com a mensagem pronta para o visitante escolher um contato. Depois de preenchido, a mensagem será direcionada diretamente para o número configurado. O botão de parceria inclui as respostas do quiz.

## Publicar na Vercel

1. Importe este repositório no painel da Vercel.
2. Deixe o framework como **Other** (ou sem framework), sem build command e sem output directory.
3. Faça o deploy.

O arquivo `index.html` está na raiz e será servido como página inicial.

Para testar localmente, abra `index.html` no navegador ou use a extensão Live Server do VS Code.
