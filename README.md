# SFPM Engenharia

Landing page institucional da **SFPM Engenharia** — plataforma de gestão operacional para organizar demandas, etapas, documentos, equipes e indicadores em um único ambiente.

## Sobre o projeto

Site estático de apresentação comercial do produto: explica a solução, recursos, planos, segurança e formas de contato. Foi desenvolvido para empresas que precisam de controle visual de processos, histórico centralizado e gestão por perfis de acesso.

A plataforma apresentada é construída sobre o ecossistema Google (Sheets, Drive, Gmail e Apps Script), com implantação personalizada conforme a operação de cada cliente.

## Tecnologias

- HTML5
- CSS3 (design tokens semânticos, temas claro/escuro)
- JavaScript vanilla
- SVG + fotos Unsplash (lazy load)

Sem frameworks, sem build e sem backend.

## Estrutura

```
├── index.html          # Página principal
├── css/
│   ├── critical.css    # Tokens, temas, base, layout (above-the-fold)
│   ├── site.css        # Componentes, seções, visual, animações
│   └── mobile.css      # Overrides mobile-first
├── js/main.js          # Interatividade, tema e configuração
└── assets/svg/         # Logo e ícones
```

## Configuração

Links, tema e imagens de fundo ficam em `js/main.js`:

```js
const SITE_CONFIG = {
  whatsapp: '5521999999999',
  demoAnchor: '#contato',
  clientAreaUrl: '#',
  whatsappMessage: 'Olá! Gostaria de conhecer a plataforma SFPM Engenharia.',
  theme: 'system', // system | light | dark
  backgrounds: {
    hero: 'https://images.unsplash.com/...',
    demo: 'https://images.unsplash.com/...',
    problems: 'https://images.unsplash.com/...',
    cta: 'https://images.unsplash.com/...',
  },
};
```

### Tema claro / escuro

- Padrão: **automático** (segue `prefers-color-scheme` do sistema)
- Toggle no header alterna: sistema → claro → escuro
- Preferência salva em `localStorage` (`sfpm-theme`)
- Script anti-flash no `<head>` evita piscada ao recarregar

### Fotos de fundo

Substitua as URLs em `SITE_CONFIG.backgrounds` pelas fotos da empresa quando disponíveis. Com `prefers-reduced-data: reduce`, o site usa apenas gradientes CSS.

## Antes de publicar

Substitua os placeholders em `js/main.js` antes do go-live:

| Campo | Descrição |
|-------|-----------|
| `whatsapp` | Número com DDI (ex.: `5521999999999`) |
| `clientAreaUrl` | URL real da Área do Cliente |
| `whatsappMessage` | Mensagem padrão do WhatsApp |
| `backgrounds.*` | Fotos próprias (opcional) |

Checklist rápido:

- [ ] WhatsApp e Área do Cliente configurados
- [ ] Logo legível em modo claro e escuro (header + footer)
- [ ] Teste mobile (320px) sem scroll horizontal
- [ ] GitHub Pages com `.nojekyll` na raiz

## Execução local

```bash
python -m http.server 8080
```

Acesse `http://localhost:8080`.

## Publicação

Compatível com GitHub Pages, Netlify, Vercel, Cloudflare Pages ou hospedagem estática tradicional. Basta publicar os arquivos da raiz do repositório.

## Repositório

https://github.com/diogosmc/SFMP-Engenharia
