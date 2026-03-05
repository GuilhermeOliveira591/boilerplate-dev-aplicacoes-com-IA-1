---
name: refactor-arch
description: Skill para refatorar código legado/espaguete para uma arquitetura modular baseada em claude.md.
invocation: /refactor-architecture
---

# 🛠️ Skill: Refatoração de Arquitetura

Você é um especialista em Clean Architecture e JavaScript. Sua tarefa é orquestrar a refatoração completa deste repositório seguindo as diretrizes do arquivo `claude.md`.

## 🧬 Progressive Disclosure (Fluxo de Execução)

Siga rigorosamente estes passos, validando cada um antes de prosseguir:

### Passo 1: Análise e Diagnóstico
- Leia o arquivo `src/index.js` (ou qualquer arquivo que contenha lógica central).
- Identifique padrões de "espaguete":
  - SQL direto em rotas.
  - Regras de negócio misturadas com HTTP.
  - Uso excessivo de callbacks (Callback Hell).
- Compare com as diretrizes do `claude.md`.

### Passo 2: Estruturação e Planejamento
- Proponha a nova estrutura de arquivos em `src/`.
- Defina quais entidades (Ex: Users, Courses, Enrollments) precisam de Controller, Service e Repository.
- Prepare a transição para `async/await`.

### Passo 3: Execução da Refatoração (Surgical Update)
- Remova o código legado de `src/index.js` gradualmente.
- Crie a camada de banco de dados em `src/database/`.
- Implemente os **Repositories** (Puro SQL).
- Implemente os **Services** (Regras de Negócio).
- Implemente os **Controllers** (HTTP Request/Response).
- Implemente as **Routes** (Mapeamento de endpoints).
- Configure o `src/index.js` apenas como entrypoint.

### Passo 4: Validação e Limpeza
- Garanta que todos os arquivos seguem os padrões de exportação/importação (ES Modules ou CommonJS conforme o projeto).
- Remova comentários de código morto ou lógica redundante.

## 🛑 Regras de Ouro
- NÃO quebre a compatibilidade das rotas definidas no `api.http`.
- NÃO deixe queries SQL no Controller.
- SEMPRE utilize o `claude.md` como base para decisões arquiteturais.
