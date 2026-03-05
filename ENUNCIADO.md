Padronização e Refatoração de Arquitetura com claude.md e Skills
Objetivo
Você deve entregar um repositório configurado capaz de guiar um agente de IA para:
Ler e absorver diretrizes estritas de arquitetura através do arquivo claude.md (Quick Start).
Executar uma Skill personalizada que analise um código desestruturado (espaguete) e o refatore automaticamente para a arquitetura definida nas guidelines, utilizando técnicas de progressive disclosure.
Exemplo no CLI
Executando a Skill através do terminal ou interface do agente:
```
# Invocando a skill de refatoração
> /refactor-architecture

Agente: Lendo as diretrizes de arquitetura em claude.md...
Agente: Políticas de Clean Architecture identificadas. Analisando o diretório /src...

================================
Análise concluída:
- [ERRO] Regra de negócio encontrada na rota (src/api.js)
- [ERRO] Acesso direto ao banco de dados no controller (src/users.js)
================================

Agente: Iniciando refatoração baseada nas policies...
- Criando src/controllers/userController.js
- Criando src/services/userService.js
- Criando src/repositories/userRepository.js
- Removendo código legado...

Status: SUCESSO ✓ - O projeto foi refatorado de acordo com as guidelines.
```
Tecnologias obrigatórias
Linguagem: JavaScript (para o repositório base fornecido)
Agente/LLM: Claude (via CLI, Cursor ou interface compatível com .md skills)
Padrões exigidos: Markdown estruturado (Frontmatter)
Requisitos
1. Quick Start e Guidelines (claude.md)
Sua primeira tarefa é criar o arquivo de inicialização do agente. Ele deve atuar como a fonte da verdade para qualquer IA que interagir com o repositório.
Tarefas:
Criar o arquivo claude.md na raiz do projeto.
Definir explicitamente o comportamento do agente (O que fazer e o que NÃO fazer - Gotchas).
Documentar a Guideline de Arquitetura: defina claramente como as pastas devem ser organizadas (ex: separação entre Routes, Controllers, Services e Repositories).
Garantir o uso de policies claras para a testabilidade do código que será gerado.
2. Criação da Skill de Refatoração
Você deve criar uma Skill personalizada que orquestre o processo de refatoração do código desorganizado.
Tarefas:
Criar a skill dentro do diretório apropriado (ex: skills/refactor-arch.md).
Utilizar Frontmatter corretamente para definir nome, descrição e formato de invocação da skill.
Estruturar o prompt da skill utilizando Progressive Disclosure: a skill deve primeiro instruir o agente a analisar o código, depois cruzar com o claude.md, e só então gerar os novos arquivos de forma detalhada e condicional.
A skill deve exigir que o agente remova as más práticas (ex: queries SQL direto no arquivo de rotas).
3. Execução e Validação
O repositório base contém uma API com todos os endpoints e regras de negócio amontoados em um único arquivo index.js. A sua configuração (claude.md + Skill) deve ser capaz de consertar isso com um único comandoa.
Estrutura obrigatória do projeto
Faça um fork do repositório base acessando este link: https://github.com/fullcycle/desafio-arquitetura-ia-boilerplate
Plaintext
desafio-arquitetura-ia/
├── claude.md                  # Seu arquivo de inicialização (Quick Start)
├── skills/
│   └── refactor-arch.md       # Sua Skill personalizada
├── src/
│   └── index.js               # Código legado/espaguete (Já fornecido)
├── package.json
└── README.md                  # Suas instruções de execução

Repositórios úteis
Documentação oficial de Skills da Anthropic
Ordem de execução
Faça o fork do repositório base indicado acima para a sua conta do GitHub.
Clone o seu fork para a máquina local e instale as dependências:
```
npm install
```

Abra o projeto no seu editor com suporte a agentes (Cursor, Cline, etc.) ou via CLI.
Certifique-se de que o agente leu o claude.md.
Invoque a skill criada:
```
/refactor-arch
```

Valide se a pasta src/ foi reorganizada corretamente e se a aplicação continua rodando:
```
npm start
```

Entregável
Repositório público no GitHub (seu fork) contendo:
O arquivo claude.md estruturado com as policies e arquitetura.
A pasta skills/ contendo sua skill com frontmatter.
O código resultante (refatorado) dentro da pasta src/.
Um README.md detalhado explicando como você estruturou a skill, como invocar o agente para testar, e um print do terminal provando que a skill foi executada e interpretou as guidelines corretamente.

