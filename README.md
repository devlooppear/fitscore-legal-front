# 🧪 Mini FitScore LEGAL™ — Desafio Técnico

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/seu-usuario/desafio-fitscore-legal)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Frontend](https://img.shields.io/badge/frontend-Next.js-black)](https://nextjs.org/)
[![Backend](https://img.shields.io/badge/backend-NestJS-orange)](https://nestjs.com/)
[![Database](https://img.shields.io/badge/database-Supabase-blueviolet)](https://supabase.com/)

---

## 🎯 Descrição
O **Mini FitScore LEGAL™** é uma versão simplificada do algoritmo FitScore, que avalia candidatos com base em **Performance, Energia e Cultura**.  

Este projeto demonstra:

- Formulário de avaliação com 10 perguntas
- Dashboard com listagem de candidatos e filtros por classificação
- Persistência de dados com Supabase (free)
- Processamento assíncrono de notificações e relatórios
- Front-end moderno usando **Next.js 13** + **React Query** + **TypeScript**

---

## 🚀 Deploy
- **Front-end:** [https://fitscore-legal-front.vercel.app](https://fitscore-legal-front.vercel.app)  
- **Back-end:** [https://fitscore-legal-back.vercel.app](https://fitscore-legal-back.vercel.app)  

---

## 📝 Funcionalidades

### 1️⃣ Formulário FitScore
- Dividido em **3 blocos**:
  - Performance: experiência, entregas, habilidades
  - Energia: disponibilidade, prazos, pressão
  - Cultura: valores da empresa
- Classificação:
  - **Fit Altíssimo:** ≥ 80
  - **Fit Aprovado:** 60-79
  - **Fit Questionável:** 40-59
  - **Fora do Perfil:** < 40

### 2️⃣ Dashboard
- Listagem de candidatos avaliados
- Exibição de **Nome, E-mail, FitScore, Classificação**
- Filtros por classificação
- Estados: loading, vazio e erro
- Layout responsivo

### 3️⃣ Persistência
- **Supabase** para autenticação e armazenamento de respostas (PostgreSQL)

### 4️⃣ Processamento Assíncrono
- **Notificação de Resultado**
  - Trigger: envio do formulário
  - Ações: registrar dados + notificar candidato
- **Relatório de Aprovados**
  - Trigger: execução programada (ex: a cada 12h)
  - Ações: consultar candidatos FitScore ≥ 80 + notificar gestor
- **Extra:** possibilidade de lógica adicional criativa

---

## ⚙️ Tecnologias
- **Front-end:** Next.js 13, React 18, TypeScript, React Query  
- **Back-end:** NestJS, TypeORM, Vercel Serverless  
- **Database:** Supabase (PostgreSQL)  
- **WebSocket / HTTP polling:** notificações em tempo real
- **Estilização:** CSS-in-JS (Emotion / Styled Components)

---

## 📦 Instalação Local

```bash
# Clone o repositório
git clone https://github.com/devlooppear/fitscore-legal-front
cd fitscore-legal-front
# Instale dependências
yarn 

# Configurar variáveis de ambiente
cp .env.example .env

# Rodar o projeto
yarn dev
```