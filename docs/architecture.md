# Arquitetura inicial — LEXIA AI

## Estado atual

Este repositório contém a interface navegável da Fase 1 e os módulos prioritários iniciais de Agents, Skills e MCP Center. Os dados apresentados são fixtures demonstrativas. A integração Supabase do projeto está conectada, mas a inspeção em 6 de novembro de 2026 encontrou **zero tabelas**; portanto, a aplicação ainda não autentica usuários, persiste conteúdo ou consulta dados jurídicos.

O frontend não chama provedores de IA nem servidores MCP. Não há execução autônoma, consulta a fonte oficial, envio de comunicação ou protocolo processual. Os controles que alteram itens na demonstração operam somente no estado da página.

## Camadas

- `app/`: App Router, layout, metadata e rotas de transporte da aplicação.
- `components/lexia/`: shell e componentes de interface por domínio.
- `lib/lexia/data.ts`: tipos de navegação e fixtures sintéticas; não tratar como dados de clientes.
- `lib/lexia/contracts.ts`: contratos para os serviços que serão implementados em fases futuras.
- `lib/lexia/`: futura camada de serviços e adaptadores server-side.
- `docs/`: decisões de arquitetura, contratos de API e desenho inicial do banco.
- `.claude/`: agentes e Skills de desenvolvimento para o Claude Code; não são Agents ou Skills jurídicos da aplicação.
- `.mcp.json`: ponto de configuração local do Claude Code; não contém credenciais.

## Regras de segurança

1. Segredos de provedores, credenciais MCP e chaves privilegiadas ficam somente em ambiente server-side; nunca em `NEXT_PUBLIC_*`.
2. Toda consulta de dados jurídicos deve estar isolada por `organization_id`, além da autorização de usuário e papel.
3. Habilitar RLS em tabelas expostas; validar associação do usuário ao tenant em cada operação.
4. Não carregar documentos de um escritório em contexto de outro. Aplicar controle de acesso também a embeddings, chunks e Storage.
5. Toda ação externa, prazo, referência jurídica, documento gerado ou saída de Agent exige revisão humana.
6. Registrar ator, tenant, ferramenta, recurso e resultado em trilha de auditoria sem guardar segredos ou conteúdo sensível desnecessário.
7. Supabase está conectado, mas não instalar consultas contra tabelas até que o schema e suas políticas RLS sejam criados e revisados.

## Evolução sugerida

1. Estabelecer schema multi-tenant e políticas RLS; integrar Supabase Auth e Storage.
2. Implementar serviços server-side para Agents/modelos, com limites, logs e validação.
3. Implementar MCP como conexão exclusivamente de backend, com allowlist de tools e permissões por Agent.
4. Adicionar documentos, busca semântica com pgvector e referências rastreáveis.
5. Adicionar automações/workflows após definir aprovação, idempotência e mecanismos de parada.
