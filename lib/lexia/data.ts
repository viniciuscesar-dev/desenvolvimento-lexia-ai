import type { LucideIcon } from 'lucide-react'
import {
  Scale, BriefcaseBusiness, FileSearch, FileText, Handshake, Search,
  BookOpen, Workflow, CalendarDays, ChartNoAxesCombined, Settings2,
  Bot, Sparkles, Network, Cpu, LayoutDashboard, MessageSquareText,
} from 'lucide-react'

export type SectionId =
  | 'dashboard' | 'ai' | 'agents' | 'skills' | 'mcp' | 'models'
  | 'matters' | 'clients' | 'documents' | 'research' | 'knowledge'
  | 'automations' | 'tasks' | 'reports' | 'settings'

export type NavigationItem = { id: SectionId; label: string; icon: LucideIcon }
export type NavigationGroup = { label: string; items: NavigationItem[] }

export const navigation: NavigationGroup[] = [
  { label: 'Workspace', items: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'ai', label: 'Inteligência Artificial', icon: MessageSquareText },
  ] },
  { label: 'Inteligência', items: [
    { id: 'agents', label: 'AI Agents', icon: Bot },
    { id: 'skills', label: 'Skills', icon: Sparkles },
    { id: 'mcp', label: 'MCP Center', icon: Network },
    { id: 'models', label: 'Modelos de IA', icon: Cpu },
  ] },
  { label: 'Operação jurídica', items: [
    { id: 'matters', label: 'Processos', icon: Scale },
    { id: 'clients', label: 'Clientes', icon: BriefcaseBusiness },
    { id: 'documents', label: 'Documentos', icon: FileText },
    { id: 'research', label: 'Pesquisa jurídica', icon: FileSearch },
    { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen },
    { id: 'automations', label: 'Automações', icon: Workflow },
    { id: 'tasks', label: 'Tarefas e prazos', icon: CalendarDays },
  ] },
  { label: 'Gestão', items: [
    { id: 'reports', label: 'Relatórios', icon: ChartNoAxesCombined },
    { id: 'settings', label: 'Configurações', icon: Settings2 },
  ] },
]

export const agents = [
  { name: 'Advogado Civilista', specialty: 'Direito civil', initials: 'AC', color: 'violet', description: 'Apoio em obrigações, responsabilidade civil e estratégia processual.', model: 'Claude Sonnet', skills: 4, runs: '128', active: true },
  { name: 'Especialista em Contratos', specialty: 'Contratos', initials: 'EC', color: 'blue', description: 'Revisa cláusulas, identifica riscos e sugere alternativas de redação.', model: 'GPT-4o', skills: 6, runs: '96', active: true },
  { name: 'Pesquisador Jurídico', specialty: 'Pesquisa', initials: 'PJ', color: 'amber', description: 'Organiza pesquisas jurídicas com foco em fontes verificáveis.', model: 'Gemini 2.5 Pro', skills: 3, runs: '84', active: true },
  { name: 'Analista Processual', specialty: 'Processos', initials: 'AP', color: 'green', description: 'Extrai eventos e pontos de atenção de documentos processuais.', model: 'Claude Sonnet', skills: 5, runs: '72', active: false },
  { name: 'Advogado Trabalhista', specialty: 'Direito do trabalho', initials: 'AT', color: 'rose', description: 'Apoio em peças, cálculos preliminares e análise de relações de trabalho.', model: 'GPT-4o', skills: 4, runs: '61', active: true },
  { name: 'Revisor Jurídico', specialty: 'Revisão', initials: 'RJ', color: 'cyan', description: 'Revisa clareza, consistência e estrutura de documentos jurídicos.', model: 'Claude Sonnet', skills: 3, runs: '49', active: true },
  { name: 'Assistente de Atendimento', specialty: 'Atendimento', initials: 'AA', color: 'indigo', description: 'Organiza informações iniciais e prepara resumos para a equipe.', model: 'GPT-4o mini', skills: 2, runs: '37', active: false },
  { name: 'Gestor do Escritório', specialty: 'Operações', initials: 'GE', color: 'teal', description: 'Apoia a organização de tarefas, rotinas e indicadores internos.', model: 'Gemini 2.5 Flash', skills: 3, runs: '24', active: true },
]

export const skills = [
  { name: 'Análise de contratos', category: 'Contratos', version: 'v1.4', description: 'Identificação de cláusulas, obrigações e riscos em instrumentos contratuais.', updated: 'há 2 dias', agents: 4, active: true, initials: 'AC', color: 'blue' },
  { name: 'Pesquisa de jurisprudência', category: 'Pesquisa jurídica', version: 'v2.1', description: 'Estrutura estratégias de busca e organiza precedentes fornecidos como fonte.', updated: 'há 5 dias', agents: 3, active: true, initials: 'PJ', color: 'violet' },
  { name: 'Revisão de petições', category: 'Peticionamento', version: 'v1.2', description: 'Revisa coesão, estrutura e referências sem substituir validação profissional.', updated: 'há 1 semana', agents: 5, active: true, initials: 'RP', color: 'amber' },
  { name: 'Resumo processual', category: 'Análise documental', version: 'v1.0', description: 'Transforma documentos fornecidos em cronologia e tópicos de atenção.', updated: 'há 2 semanas', agents: 2, active: true, initials: 'SP', color: 'green' },
  { name: 'Cláusulas trabalhistas', category: 'Direito trabalhista', version: 'v1.1', description: 'Checklist de análise para contratos e documentos de relações de trabalho.', updated: 'há 3 semanas', agents: 2, active: false, initials: 'CT', color: 'rose' },
  { name: 'Due diligence documental', category: 'Gestão jurídica', version: 'v1.3', description: 'Organiza pendências e sinais de atenção em conjuntos documentais.', updated: 'há 1 mês', agents: 3, active: true, initials: 'DD', color: 'cyan' },
]

export const mcpServers = [
  { name: 'Google Drive', category: 'Armazenamento', description: 'Acesso controlado aos arquivos compartilhados do escritório.', initials: 'G', color: 'green', transport: 'OAuth · remoto', tools: 8, status: 'Conectado', permission: 'Leitura', updated: 'há 4 min' },
  { name: 'Pesquisa jurídica', category: 'Pesquisa', description: 'Busca em fontes jurídicas autorizadas pelo escritório.', initials: 'PJ', color: 'violet', transport: 'HTTP · remoto', tools: 5, status: 'Conectado', permission: 'Leitura', updated: 'há 12 min' },
  { name: 'PostgreSQL', category: 'Dados', description: 'Consultas controladas a uma base de dados interna.', initials: 'PG', color: 'blue', transport: 'Streamable HTTP', tools: 4, status: 'Desconectado', permission: 'Sem acesso', updated: 'nunca' },
  { name: 'GitHub', category: 'Desenvolvimento', description: 'Repositórios e issues autorizados para a equipe técnica.', initials: 'GH', color: 'slate', transport: 'stdio · local', tools: 12, status: 'Disponível', permission: 'Não autorizado', updated: 'nunca' },
  { name: 'Calendário', category: 'Produtividade', description: 'Consulta de agendas e compromissos compartilhados.', initials: 'CA', color: 'amber', transport: 'OAuth · remoto', tools: 6, status: 'Desconectado', permission: 'Sem acesso', updated: 'nunca' },
  { name: 'Filesystem', category: 'Arquivos', description: 'Acesso restrito a diretórios autorizados no servidor.', initials: 'FS', color: 'cyan', transport: 'stdio · local', tools: 7, status: 'Disponível', permission: 'Não autorizado', updated: 'nunca' },
]

export const providers = [
  { name: 'Anthropic', description: 'Claude · Sonnet, Opus e Haiku', monogram: 'A', color: 'warm', models: 4, status: 'Não configurado', usage: '—', cost: '—' },
  { name: 'OpenAI', description: 'GPT-4o, GPT-4o mini e o-series', monogram: 'O', color: 'green', models: 6, status: 'Não configurado', usage: '—', cost: '—' },
  { name: 'Google AI', description: 'Gemini Pro, Flash e modelos multimodais', monogram: 'G', color: 'blue', models: 5, status: 'Não configurado', usage: '—', cost: '—' },
  { name: 'Ollama', description: 'Modelos locais executados pelo escritório', monogram: '◉', color: 'violet', models: 0, status: 'Não configurado', usage: '—', cost: '—' },
]

export const matters = [
  { ref: 'DEMO-2025-0142', title: 'Análise de responsabilidade contratual', client: 'Alvorada Tecnologia Ltda.', type: 'Cível', status: 'Em andamento', date: 'Atualizado hoje', initials: 'AT', color: 'blue' },
  { ref: 'DEMO-2025-0108', title: 'Revisão de acordo trabalhista', client: 'Marina Costa', type: 'Trabalhista', status: 'Aguardando revisão', date: 'Atualizado ontem', initials: 'MC', color: 'violet' },
  { ref: 'DEMO-2025-0087', title: 'Parecer sobre planejamento tributário', client: 'Grupo Horizonte', type: 'Tributário', status: 'Em análise', date: 'Atualizado há 2 dias', initials: 'GH', color: 'amber' },
  { ref: 'DEMO-2025-0064', title: 'Contestação — relação de consumo', client: 'Lume Comércio Digital', type: 'Consumidor', status: 'Prazo próximo', date: 'Atualizado há 3 dias', initials: 'LC', color: 'green' },
]

export const demoNotice = 'Ambiente de demonstração · registros e métricas exibidos são fictícios e não representam dados processuais oficiais.'
