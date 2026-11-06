# LEXIA AI

Workspace de LegalTech em Next.js para escritórios brasileiros. O incremento atual entrega interface navegável de demonstração para Dashboard, chat, Agents, Skills, MCP Center, Modelos de IA e módulos de operação.

> **Limite importante:** os registros e métricas são fictícios. O Supabase está conectado ao projeto, mas não possui tabelas no momento. Não há login, persistência de aplicação, chamadas de modelos, fontes jurídicas, execução MCP ou automações reais implementadas. Veja o estado real em `docs/architecture.md`.

## Stack

- Next.js App Router, React 19, TypeScript
- Tailwind CSS 4 e CSS do produto em `app/globals.css`
- Lucide React
- Supabase conectado no ambiente v0; schema ainda vazio

## Organização

```text
app/                    App Router, layout e rotas
components/lexia/       Shell, dashboard, chat e módulos por domínio
lib/lexia/              Fixtures, tipos e contratos compartilhados
.claude/agents/         Agentes de desenvolvimento do Claude Code
.claude/skills/         Skills para manutenção do código
.mcp.json               Configuração local do Claude Code, sem credenciais
docs/                   Arquitetura, APIs e modelo de dados proposto
```

Skills e Agents em `components/lexia/` são recursos operacionais demonstrativos da aplicação. Eles não são os arquivos de desenvolvimento em `.claude/`.

## Desenvolvimento

O projeto utiliza `pnpm`. Execute a aplicação com `pnpm run dev` e valide tipos com `pnpm exec tsc --noEmit`.

O arquivo `.env.example` documenta apenas nomes/formatos esperados para futuras integrações. Nunca comite credenciais. Para configurar Supabase, implementar schema e RLS antes de escrever queries; consulte `docs/database.md` e as instruções v0/Supabase.

## Segurança e responsabilidade

- Nunca enviar documentos de clientes ou credenciais ao browser sem autorização e controle de acesso.
- Não usar `service_role` em código cliente.
- Prazos, referências e saídas jurídicas devem ser conferidos por profissional habilitado.
- Toda ação externa exige aprovação humana explícita.
- Dados de um escritório não podem ser reutilizados por outro.
