# Desafio: Padronização e Refatoração de Arquitetura com claude.md e Skills

Este repositório foi refatorado utilizando um agente de IA (Claude via Gemini CLI) guiado por diretrizes de arquitetura estritas e uma Skill personalizada.

## 🏗️ Estrutura do Projeto

O projeto segue os princípios de **Clean Architecture** e **Separation of Concerns**, organizado da seguinte forma:

- **`claude.md`**: O arquivo de "Quick Start" que serve como a fonte da verdade para a IA. Ele define o que deve ser feito (Policies) e o que deve ser evitado (Gotchas).
- **`skills/refactor-arch.md`**: Uma Skill customizada que utiliza **Progressive Disclosure** para guiar o processo de refatoração em etapas: Análise, Planejamento, Execução e Validação.
- **`src/`**: Código refatorado e modularizado:
  - `database/`: Configuração do SQLite com suporte a Promises.
  - `repositories/`: Camada de persistência (SQL puro).
  - `services/`: Camada de regras de negócio e validações.
  - `controllers/`: Camada de interface HTTP (Request/Response).
  - `routes/`: Definição de endpoints e roteamento.
  - `index.js`: Entrypoint simplificado da aplicação.

## 🚀 Como Executar

### 1. Instalação
```bash
npm install
```

### 2. Invocação da Skill (Simulação no Agente)
Para disparar a refatoração em um ambiente compatível, utilize o comando:
```
/refactor-architecture
```

O agente seguirá o fluxo definido em `skills/refactor-arch.md`, cruzando as informações com o `claude.md`.

### 3. Rodando a API
```bash
npm start
```

### 4. Testando as Rotas
Utilize o arquivo `api.http` fornecido na raiz para testar os endpoints de Usuários, Cursos e Matrículas.

---

## 📸 Exemplo de Execução no Terminal (Log)

```text
> /refactor-architecture

Agente: Lendo as diretrizes de arquitetura em claude.md...
Agente: Políticas de Clean Architecture identificadas. Analisando o diretório /src...

================================
Análise concluída:
- [ERRO] Regras de negócio de matrículas misturadas na rota (src/index.js)
- [ERRO] Acesso direto ao banco de dados detectado em múltiplos endpoints.
- [AVISO] Callback Hell detectado em /api/enrollments.
================================

Agente: Iniciando refatoração baseada nas policies (Progressive Disclosure)...
- Criando src/database/db.js (Promisified SQLite)
- Implementando Repositories (Users, Courses, Enrollments)
- Implementando Services com lógica de validação (Ex: idade > 18)
- Implementando Controllers e Routes modulares.
- Limpando src/index.js para atuar apenas como startup.

Status: SUCESSO ✓ - O projeto foi refatorado de acordo com as guidelines.
```

## 🛠️ Tecnologias Utilizadas
- JavaScript (Node.js)
- Express
- SQLite3
- Markdown Skills (Anthropic/Claude/Gemini CLI)
