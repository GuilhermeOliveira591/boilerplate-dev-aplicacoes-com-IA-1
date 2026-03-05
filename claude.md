---
name: Architecture Guidelines
type: quickstart
description: Diretrizes de arquitetura para refatoração e desenvolvimento do projeto.
---

# 🏗️ Diretrizes de Arquitetura - Full Cycle IA

Este arquivo é a fonte da verdade para a estrutura e padrões de código deste repositório. Qualquer refatoração ou nova funcionalidade deve seguir rigorosamente estas definições.

## 🎯 Objetivo
Transformar código monolítico/espaguete em uma arquitetura limpa, modular e testável, separando responsabilidades de forma clara.

## 📂 Estrutura de Pastas (src/)

O código deve ser organizado da seguinte forma:

- `src/routes/`: Definição dos endpoints e mapeamento para os controllers.
- `src/controllers/`: Manipulação de requisições/respostas HTTP. Validação básica de entrada.
- `src/services/`: Toda a lógica de negócio e regras do domínio.
- `src/repositories/`: Abstração do acesso a dados (SQL, DB).
- `src/database/`: Configuração da conexão e inicialização do banco de dados.
- `src/index.js`: Ponto de entrada que inicializa o servidor.

## 📜 Políticas de Código

### 1. O que FAZER (Checklist)
- [ ] **Separação de Preocupações:** Rotas NÃO devem ter lógica de banco ou negócio.
- [ ] **Services Isolados:** Toda regra de negócio (ex: "usuário deve ser maior de idade") fica no Service.
- [ ] **Repositories Puros:** Apenas os Repositories executam comandos SQL.
- [ ] **Promessas (Async/Await):** Substituir callbacks por `async/await` para evitar o "callback hell".
- [ ] **Tratamento de Erros:** Centralizar o tratamento de erros ou garantir que o Controller responda adequadamente.

### 2. O que NÃO FAZER (Gotchas)
- ❌ **SQL no Controller/Route:** Nunca execute `db.run` ou `db.get` fora da camada de Repository.
- ❌ **Lógica de Negócio no Index:** O arquivo `index.js` deve apenas orquestrar o startup.
- ❌ **Acoplamento Forte:** Camadas superiores não devem conhecer detalhes de implementação das camadas inferiores.

## 🧪 Testabilidade
- O código deve ser escrito de forma que os `Services` possam ser testados unitariamente sem depender do banco de dados (Injeção de Dependência ou Mocks).

---
*Nota: Este documento deve ser lido pelo agente antes de qualquer operação de escrita.*
