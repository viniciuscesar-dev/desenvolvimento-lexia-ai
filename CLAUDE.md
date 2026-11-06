# LEXIA AI — instruções para Claude Code

## Projeto
Plataforma SaaS de LegalTech brasileira. A aplicação atual é uma demonstração de frontend; confirme `docs/architecture.md` antes de supor que integrações ou persistência já existem.

## Convenções
- Next.js App Router, React, TypeScript e Tailwind CSS 4.
- UI em português brasileiro; código, símbolos e nomes de arquivos em inglês.
- Preserve a separação de domínios em `components/lexia/` e regras/serviços em `lib/lexia/`.
- Fixtures em `lib/lexia/data.ts` são fictícias. Não as descreva como dados reais ou oficiais.
- Não mover lógica de credenciais, MCP ou provedores para client components.
- Não inventar jurisprudência, fonte, número CNJ ou prazo. Exigir conferência humana.
- Não introduzir armazenamento em `localStorage` sem requisito explícito.
- Antes de integrar Supabase, verificar schema e RLS reais; hoje a integração informa zero tabelas.
- Agents/Skills operacionais da Lexia são diferentes de `.claude/agents/` e `.claude/skills/`, que ajudam no desenvolvimento.

## Segurança
- Dados sempre scoped ao tenant e ao usuário/papel autorizado.
- Nunca expor service-role key, chaves de modelo, token MCP ou segredo no bundle/browser.
- Operações externas têm autorização humana explícita, idempotência e auditoria.
- Não considerar execução de IA real até que serviço e conexão estejam implementados e validados.

## Verificação
- Validar tipos com `pnpm exec tsc --noEmit`.
- Usar `pnpm run dev` para a prévia e verificar mudanças de UI no navegador.
- Consulte `docs/api-contracts.md` e `docs/database.md` antes de implementar endpoints/schema.
