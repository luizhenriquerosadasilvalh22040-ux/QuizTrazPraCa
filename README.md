# Traz Pra Cá — Quiz

Quiz responsivo feito em HTML, CSS e JavaScript puro. Não precisa de build, servidor ou dependências: a Vercel pode publicar os arquivos estáticos diretamente.

## WhatsApp

O WhatsApp está configurado para o número da equipe, com código do Brasil e DDD:

```js
const WHATSAPP_NUMBER = "5544997158781";
```

Os botões da tela de resultado abrem uma conversa diretamente com esse número. O botão de parceria inclui as respostas do quiz na mensagem.

## Publicar na Vercel

1. Importe este repositório no painel da Vercel.
2. Deixe o framework como **Other** (ou sem framework), sem build command e sem output directory.
3. Faça o deploy.

O arquivo `index.html` está na raiz e será servido como página inicial.

Para testar localmente, abra `index.html` no navegador ou use a extensão Live Server do VS Code.
