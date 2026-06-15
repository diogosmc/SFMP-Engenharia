# SFPM Engenharia

Landing page institucional da **SFPM Engenharia** — plataforma de gestão operacional para organizar demandas, etapas, documentos, equipes e indicadores em um único ambiente.

## Sobre o projeto

Site estático de apresentação comercial do produto: explica a solução, recursos, planos, segurança e formas de contato. Foi desenvolvido para empresas que precisam de controle visual de processos, histórico centralizado e gestão por perfis de acesso.

A plataforma apresentada é construída sobre o ecossistema Google (Sheets, Drive, Gmail e Apps Script), com implantação personalizada conforme a operação de cada cliente.

## Tecnologias

- HTML5
- CSS3 (design system com variáveis CSS)
- JavaScript vanilla
- SVG

Sem frameworks, sem build e sem backend.

## Estrutura

```
├── index.html       # Página principal
├── css/             # Estilos modulares
├── js/main.js       # Interatividade e configuração de links
└── assets/svg/      # Logo e ícones
```

## Configuração

Links de WhatsApp, Área do Cliente e CTAs de demonstração ficam em `js/main.js`:

```js
const SITE_CONFIG = {
  whatsapp: '5521999999999',
  demoAnchor: '#contato',
  clientAreaUrl: '#',
  whatsappMessage: 'Olá! Gostaria de conhecer a plataforma SFPM Engenharia.',
};
```

## Execução local

```bash
python -m http.server 8080
```

Acesse `http://localhost:8080`.

## Publicação

Compatível com GitHub Pages, Netlify, Vercel, Cloudflare Pages ou hospedagem estática tradicional. Basta publicar os arquivos da raiz do repositório.

## Repositório

https://github.com/diogosmc/SFMP-Engenharia
