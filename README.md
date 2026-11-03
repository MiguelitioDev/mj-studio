# MJ Studios — Site Oficial e Catálogo de Modelos

Este é o código-fonte do site da **MJ Studios**, estúdio especializado na criação de sites rápidos, acessíveis e focados em contato via WhatsApp para pequenos negócios de Fortaleza/CE e região.

O site apresenta o catálogo interativo de 7 modelos de demonstração (por ramo de negócio), os pacotes com preços transparentes, o montador de orçamento em 4 etapas e a documentação legal completa (LGPD, CDC e Acessibilidade).

---

## Como rodar o projeto no seu computador

Pré-requisito: ter o **Node.js** (versão 20 ou superior) instalado.

1. **Instalar as dependências** (só na primeira vez):
   ```bash
   npm install
   ```
2. **Rodar em modo de desenvolvimento** (abre o site localmente com atualização automática):
   ```bash
   npm run dev
   ```
3. **Gerar a versão final de produção** (testa tipos TypeScript e empacota o site na pasta `dist/`):
   ```bash
   npm run build
   ```
4. **Rodar o verificador de código (lint)**:
   ```bash
   npm run lint
   ```
5. **Rodar os testes automatizados**:
   ```bash
   npm test
   ```

---

## Onde mudar cada coisa

Toda a configuração do negócio e os textos comerciais foram separados em arquivos simples para você editar sem precisar mexer no funcionamento das páginas:

| O que você quer alterar | Arquivo onde editar |
| --- | --- |
| Nome do estúdio, número do WhatsApp, CNPJ, razão social, endereço, e-mail, Instagram, horário e forma de pagamento | `src/config/site.ts` |
| Pacotes, preços (mensalidade R$ 97, R$ 147, R$ 247 e projeto avulso R$ 590, R$ 1.190, R$ 1.990), prazos e itens inclusos | `src/data/plans.ts` |
| Serviços avulsos e custos à parte (domínio, hospedagem, manutenção, página extra, logo) | `src/data/extras.ts` |
| Perguntas frequentes (FAQ) da página inicial | `src/data/faq.ts` |
| Etapas do "Como funciona" e lista de compromissos | `src/data/process.ts` |
| Adicionar ou editar projetos reais entregues a clientes | `src/data/projects.ts` |
| Catálogo de modelos (nomes, descrições, destaques e pacote indicado) | `src/data/models.ts` |
| Abas de nichos/ramos de negócio | `src/data/niches.ts` |
| Paleta de cores, fontes, tamanhos e espaçamentos do site da MJ Studios | `src/styles/tokens.css` |
| Logo, ícones do navegador e imagem de prévia ao compartilhar o link (gerados a partir da pasta `Artes`) | `public/brand/` |

> **Dica:** Enquanto a lista `projects` em `src/data/projects.ts` estiver vazia (`[]`), o link "Projetos" fica oculto no menu principal automaticamente e a página `/projetos` exibe uma mensagem honesta convidando o visitante a testar os modelos de demonstração. Assim que você cadastrar o primeiro projeto entregue, o item passa a aparecer no menu.

---

## Como criar um novo modelo de demonstração

Se você quiser adicionar um 8º modelo ao catálogo, siga estes 4 passos:

1. **Criar a pasta do modelo:** crie uma pasta em `src/demos/<slug-do-modelo>/` contendo `index.tsx` (exportando por padrão um componente que receba `DemoProps` de `../types`) e o arquivo de estilos `styles.module.css` com as variáveis visuais próprias daquele modelo.
2. **Registrar o carregamento sob demanda:** abra `src/demos/registry.ts` e adicione o novo `slug` mapeando para `lazy(() => import("./<slug-do-modelo>"))`.
3. **Cadastrar no catálogo:** abra `src/data/models.ts` e adicione os dados do modelo (`slug`, `name`, `niche`, `idealFor`, `summary`, `highlights` e `recommendedPlan`).
4. **Incluir no mapa do site (SEO):** abra `public/sitemap.xml` e adicione um novo bloco `<url><loc>https://mjstudios.com.br/modelos/<slug-do-modelo></loc></url>`.

---

## Como publicar na Vercel

O projeto já inclui o arquivo `vercel.json` configurado com redirecionamento de rotas SPA e cabeçalhos de segurança (CSP, HSTS, X-Frame-Options, Referrer-Policy e Permissions-Policy).

1. Suba este repositório para a sua conta no GitHub, GitLab ou Bitbucket.
2. Acesse [vercel.com](https://vercel.com), clique em **Add New → Project** e importe o repositório.
3. Mantenha as configurações padrão detectadas para **Vite** (`Build Command: npm run build`, `Output Directory: dist`).
4. Clique em **Deploy**.
5. No painel do projeto na Vercel, vá em **Settings → Domains** e conecte o seu domínio próprio (ex.: `mjstudios.com.br`).

---

## Checklist legal antes de publicar

Antes de divulgar o site comercialmente, confira os itens abaixo para atender ao Decreto do Comércio Eletrônico (Decreto nº 7.962/2013), ao Código de Defesa do Consumidor e à LGPD:

- [ ] Preencher `legal.companyName` (razão social) e `legal.cnpj` em `src/config/site.ts`.
- [ ] Preencher `legal.address` (endereço físico ou indicação clara de atendimento em Fortaleza/CE) em `src/config/site.ts`.
- [ ] Preencher `email` e `legal.privacyContactEmail` (e-mail válido para atendimento e solicitações da LGPD) em `src/config/site.ts`.
- [ ] Confirmar se o domínio definitivo em `site.url` (`src/config/site.ts`), `index.html`, `public/robots.txt` e `public/sitemap.xml` corresponde ao domínio real registrado.
- [ ] Atualizar `lastLegalUpdate` em `src/config/site.ts` com a data da publicação.
- [ ] Revisar os textos de `/privacidade` e `/termos` com seu contador ou advogado de confiança caso mude a forma de pagamento, prazos ou passe a usar ferramentas de cookies/métricas.

---

## Regras de imagens e direitos autorais

- **Sem fotos sem licença:** nunca copie fotos do Google Imagens, Pinterest ou de outros sites.
- **Nos modelos de demonstração:** as fotos ficam em `public/img/<modelo>/` e vêm do Unsplash (licença livre para uso comercial, sem exigir crédito). A lista com o ID de cada foto está em `docs/creditos-imagens.md`. Nos sites de clientes, troque pelas fotos reais do negócio. Os produtos do modelo Vitrine usam amostras de cor (não há foto individual de cada peça).
- **Quando usar fotos reais** (no portfólio de projetos entregues ou nos sites de clientes): use apenas fotos tiradas por você, enviadas pelo próprio cliente com autorização de uso, ou baixadas de bancos com licença comercial explícita (como Unsplash ou Pexels — guardando sempre o link e o comprovante da licença).
- **Fontes e ícones deste projeto:** as fontes *Familjen Grotesk*, *Atkinson Hyperlegible Next* (site) e *Barlow Condensed*, *Young Serif*, *Bricolage Grotesque*, *Syne*, *Archivo* e *Cormorant Garamond* (um estilo para cada modelo) possuem licença aberta SIL Open Font License (OFL) e estão auto-hospedadas via `@fontsource`. Os ícones da biblioteca `lucide-react` possuem licença aberta ISC.
