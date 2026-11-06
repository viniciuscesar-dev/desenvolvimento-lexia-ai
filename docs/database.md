# Modelo de dados proposto

## Estado

Supabase está conectado; o schema retornado pela integração contém **zero tabelas**. Nenhuma tabela foi criada neste incremento. O modelo é uma proposta para revisão antes da implementação de SQL e das políticas RLS.

## Entidades iniciais

- `organizations`: escritório/tenant, plano e estado.
- `organization_members`: `organization_id`, `user_id` de `auth.users`, papel, estado de convite. Associação/membership não pode ser auto-inserida pelo cliente.
- `agents`: prompt e configuração versionados, autor, tenant, modelo permitido e estado.
- `skills` / `skill_versions`: metadados e conteúdo, tenant ou catálogo explicitamente público.
- `agent_skills`: associação Agent-Skill dentro do mesmo tenant.
- `mcp_servers`: apenas metadados e referência a segredo cifrado no servidor; nunca token em coluna legível para o cliente.
- `mcp_tool_permissions`: allowlist de ferramentas por servidor, Agent e tenant.
- `conversations` / `messages`: contexto da conversa segregado por tenant e proprietário/equipe.
- `agent_runs` / `audit_logs`: estados, ator, modelo e metadados de uso; minimizar conteúdo sensível.
- `clients`, `matters`, `documents`: dados jurídicos com acesso granular e ligações ao tenant.
- `knowledge_sources`, `document_chunks`: tenant e política de acesso mantidos até nos resultados de busca vetorial.

## Políticas obrigatórias

- `organization_id NOT NULL` em toda tabela de negócio e FK para `organizations`.
- Membership validado no servidor e em RLS. A primeira associação de administrador deve vir de fluxo seguro privilegiado, não de INSERT livre.
- RLS habilitada em todas as tabelas acessíveis por `anon`/`authenticated`; SELECT, INSERT, UPDATE e DELETE limitados por tenant e papel.
- Policies de tabelas filhas verificam acesso ao pai, não apenas `auth.uid()`.
- RPCs `SECURITY DEFINER` futuras devem fixar `search_path = ''`, qualificar schemas e validar autorização.
- Não usar service-role key em browser/client. Aplicar Storage policies separadas e versionamento seguro.
- Índices compostos começando pelo tenant em consultas frequentes; avaliar pgvector após definir modelo de embeddings.

## Aplicação

Antes de escrever queries, aplicar e verificar as migrações via Supabase MCP e recarregar o schema vivo. Obter nullabilidade/defaults/identity antes de qualquer INSERT. Incluir testes que tentem ler e escrever como usuário de outro escritório.
