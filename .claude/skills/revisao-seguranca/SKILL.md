---
name: revisao-seguranca
description: Checklist de desenvolvimento para mudanças em dados jurídicos, integrações e código server-side da LEXIA AI.
---

# Revisão de segurança da LEXIA AI

Esta é uma Skill para manutenção de código com Claude Code. Não é uma Skill operacional jurídica exibida aos advogados.

## Checklist
- [ ] O usuário e a organização vêm de sessão validada no servidor?
- [ ] Cada leitura/escrita aplica escopo de tenant e autorização por papel/recurso?
- [ ] O schema e as políticas RLS foram verificados no Supabase vivo?
- [ ] Segredos ficam no servidor e não são incluídos em props, logs ou respostas?
- [ ] Entradas e uploads são validados por schema, tipo real, tamanho e limites?
- [ ] Tool calls MCP têm allowlist, permissões granulares, timeout e logs sem segredos?
- [ ] Execuções e efeitos externos são idempotentes e requerem confirmação humana?
- [ ] Respostas separam fatos, conteúdo fornecido e inferências, sem criar fontes jurídicas?
- [ ] Há teste de acesso cruzado entre tenants e tratamento de erros sem PII?

Consulte `docs/architecture.md`, `docs/api-contracts.md` e `docs/database.md` para os contratos atuais.
