# Traz Pra Cá — Quiz

Quiz responsivo feito em HTML, CSS e JavaScript puro. Não precisa de build ou dependências; as imagens do carrossel ficam na pasta `assets`.

## Carrossel da apresentação

As imagens são carregadas localmente e alternam entre lanches, farmácia, marmitas, padaria e sorvetes. Fotos originais no Unsplash:

- [Hambúrguer](https://images.unsplash.com/photo-1568901346375-23c9450c58cd)
- [Farmácia](https://images.unsplash.com/photo-1584308666744-24d5c474f2ae)
- [Marmitas](https://images.unsplash.com/photo-1546069901-ba9599a7e63c)
- [Padaria](https://images.unsplash.com/photo-1509440159596-0249088772ff)
- [Sorvetes](https://images.unsplash.com/photo-1563805042-7684c019e1cb)

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
