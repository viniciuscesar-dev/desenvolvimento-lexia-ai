# Contratos de API — LEXIA AI

Os contratos abaixo são a direção para rotas privadas futuras, não endpoints já implementados. Respostas devem incluir `requestId`; erros não devem revelar credenciais, conteúdo de outros tenants ou stack traces.

## Convenções

- Prefixo: `/api/v1`.
- JSON validado no servidor; tamanho e formato dos uploads limitados.
- Identidade derivada da sessão validada no servidor. Nunca aceitar `organizationId` do cliente como autorização.
- Conferir papel, associação à organização e escopo de recurso em cada request.
- `Idempotency-Key` obrigatório para execuções e ações que possam produzir efeitos externos.

## Rotas planejadas

| Método | Rota | Objetivo |
|---|---|---|
| `GET` | `/api/v1/agents` | Listar Agents permitidos no tenant atual. |
| `POST` | `/api/v1/agents` | Criar Agent após validação de configuração e permissões. |
| `POST` | `/api/v1/agents/:id/runs` | Criar execução; retorna `runId` e estado, sem assumir autonomia no cliente. |
| `GET` | `/api/v1/agents/runs/:runId` | Consultar estado e eventos autorizados da execução. |
| `GET` | `/api/v1/skills` | Listar Skills autorizadas e versões disponíveis. |
| `POST` | `/api/v1/skills/import` | Validar e importar Markdown com metadados, tamanho e versão controlados. |
| `GET` | `/api/v1/mcp/servers` | Listar metadados e conexão sem retornar segredos. |
| `POST` | `/api/v1/mcp/servers/:id/test` | Testar conexão no backend, com timeout e allowlist. |
| `POST` | `/api/v1/chat/turns` | Orquestrar uma mensagem com contexto/recursos explicitamente autorizados. |
| `POST` | `/api/v1/documents` | Solicitar upload assinado e escopado ao tenant. |

## Execução de Agent

Entrada planejada: `agentId`, `conversationId` opcional, `message`, IDs de contexto permitidos e chave idempotente. A API deve reconstruir permissões no servidor, buscar somente fontes autorizadas, validar o provedor, registrar auditoria e devolver `runId`. Não aceitar instruções de ferramenta, segredo de MCP ou preço enviados pelo navegador.

Saída planejada: `runId`, `status`, texto final ou eventos sanitizados, IDs de fontes utilizadas e avisos para revisão humana. Não inventar fontes: se nenhuma fonte for recuperada, dizer explicitamente.

## Upload e Storage

O navegador não recebe credenciais de serviço. URLs assinadas devem limitar tenant, objeto, método, tipo de mídia, tamanho e expiração. Verificar malware e tipo real do arquivo antes da indexação. Não persistir upload até implementar autorização e políticas de retenção.
