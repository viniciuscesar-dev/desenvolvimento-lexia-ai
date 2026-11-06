'use client'

import { useMemo, useState } from 'react'
import {
  Activity, Bell, ChevronDown, ChevronLeft, Command, Menu,
  Moon, Plus, Scale as ScaleIcon, Search, Settings2, ShieldCheck, Sparkles, Sun, X,
} from 'lucide-react'
import { navigation, type SectionId } from '@/lib/lexia/data'
import { DashboardView } from './dashboard-view'
import { AiWorkspace } from './ai-workspace'
import { AgentsView, McpView, ModelsView, SkillsView } from './catalog-views'
import { RecordsView } from './records-view'

const titleById: Record<SectionId, string> = Object.fromEntries(
  navigation.flatMap((group) => group.items.map((item) => [item.id, item.label])),
) as Record<SectionId, string>

export function LexiaApp() {
  const [active, setActive] = useState<SectionId>('dashboard')
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dark, setDark] = useState(true)
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState<null | 'agent' | 'skill' | 'mcp' | 'quick'>(null)
  const [toast, setToast] = useState('')
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [created, setCreated] = useState({ agent: [] as string[], skill: [] as string[], mcp: [] as string[] })

  const allItems = useMemo(() => navigation.flatMap((group) => group.items), [])
  const filteredItems = allItems.filter((item) => item.label.toLowerCase().includes(search.toLowerCase()))
  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 3000)
  }
  const navigate = (section: SectionId) => {
    setActive(section)
    setMobileOpen(false)
    setSearchOpen(false)
  }
  const openCreate = (kind: 'agent' | 'skill' | 'mcp' | 'quick') => setModal(kind)

  return (
    <div className={`lexia-app ${dark ? 'theme-dark' : 'theme-light'}`}>
      <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''} ${mobileOpen ? 'sidebar-mobile-open' : ''}`}>
        <div className="brand-row">
          <div className="brand-mark"><ScaleIcon size={18} strokeWidth={1.8} /></div>
          {!collapsed && <div className="brand-wordmark">LEXIA<span>AI</span></div>}
          <button className="icon-button sidebar-collapse" onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}><ChevronLeft size={16} /></button>
          <button className="icon-button sidebar-close" onClick={() => setMobileOpen(false)} aria-label="Fechar menu"><X size={18} /></button>
        </div>
        <button className="workspace-switcher" onClick={() => notify('Organização de demonstração')}>
          <span className="workspace-avatar">V</span>
          {!collapsed && <><span className="workspace-copy"><strong>Vieira & Associados</strong><small>Plano profissional</small></span><ChevronDown size={15} /></>}
        </button>
        <nav className="sidebar-nav" aria-label="Navegação principal">
          {navigation.map((group) => <div className="nav-group" key={group.label}>
            {!collapsed && <div className="nav-group-label">{group.label}</div>}
            {group.items.map(({ id, label, icon: Icon }) => <button key={id} className={`nav-item ${active === id ? 'nav-item-active' : ''}`} onClick={() => navigate(id)} title={collapsed ? label : undefined} aria-current={active === id ? 'page' : undefined}>
              <Icon size={17} strokeWidth={1.8} /><span>{label}</span>{id === 'tasks' && !collapsed && <span className="nav-count">4</span>}
            </button>)}
          </div>)}
        </nav>
        <div className="sidebar-bottom">
          {!collapsed && <div className="usage-card"><div className="usage-card-heading"><span>Uso mensal</span><span>62%</span></div><div className="usage-progress"><span /></div><p>12.480 de 20.000 créditos</p></div>}
          <div className="profile-row"><div className="profile-avatar">VC</div>{!collapsed && <><div className="profile-copy"><strong>Vinícius Costa</strong><small>Administrador</small></div><button className="icon-button profile-more" onClick={() => navigate('settings')} aria-label="Opções do perfil"><ChevronDown size={15} /></button></>}</div>
        </div>
      </aside>
      {mobileOpen && <button className="mobile-scrim" aria-label="Fechar menu" onClick={() => setMobileOpen(false)} />}

      <div className="main-shell">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button mobile-menu-button" onClick={() => setMobileOpen(true)} aria-label="Abrir menu"><Menu size={19} /></button>
            <div className="breadcrumbs"><span>Workspace</span><span className="breadcrumb-slash">/</span><strong>{titleById[active]}</strong></div>
          </div>
          <div className="topbar-actions">
            <div className="service-health"><span className="health-dot" /><span>Serviços</span><span className="health-label">operacionais</span></div>
            <button className="search-trigger" onClick={() => setSearchOpen(!searchOpen)}><Search size={15} /><span>Buscar em tudo...</span><kbd><Command size={11} /> K</kbd></button>
            <button className="icon-button topbar-mobile-search" onClick={() => setSearchOpen(!searchOpen)} aria-label="Pesquisar"><Search size={17} /></button>
            <div className="notification-wrap"><button className="icon-button notification-button" onClick={() => setNotificationsOpen(!notificationsOpen)} aria-label="Notificações"><Bell size={17} /><i /></button>{notificationsOpen && <div className="popover notification-popover"><div className="popover-title">Notificações <span className="live-tag">2 novas</span></div><div className="notification-item"><span className="notification-icon violet"><Sparkles size={15} /></span><div><strong>Análise concluída</strong><p>Resumo demonstrativo pronto para revisão.</p><small>há 12 min</small></div></div><div className="notification-item"><span className="notification-icon amber"><Activity size={15} /></span><div><strong>Prazo próximo</strong><p>Confirme a data na fonte processual oficial.</p><small>há 1 h</small></div></div></div>}</div>
            <button className="icon-button theme-toggle" onClick={() => setDark(!dark)} aria-label={dark ? 'Ativar tema claro' : 'Ativar tema escuro'}>{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
            <button className="quick-create" onClick={() => openCreate('quick')}><Plus size={16} /><span>Criar novo</span></button>
          </div>
        </header>

        <main className="page-content" id="main-content">
          <div className="demo-banner"><span className="demo-banner-icon"><ShieldCheck size={14} /></span><span><strong>Ambiente de demonstração</strong><span className="demo-divider">·</span> Dados fictícios. Nenhuma operação jurídica ou chamada de IA é executada.</span><button onClick={() => navigate('settings')}>Sobre conexões <ChevronDown size={13} /></button></div>
          {active === 'dashboard' && <DashboardView onNavigate={navigate} onNotify={notify} />}
          {active === 'ai' && <AiWorkspace onNotify={notify} />}
          {active === 'agents' && <AgentsView key={created.agent.join('|')} customNames={created.agent} onCreate={() => openCreate('agent')} onNotify={notify} onUse={() => navigate('ai')} />}
          {active === 'skills' && <SkillsView key={created.skill.join('|')} customNames={created.skill} onCreate={() => openCreate('skill')} onNotify={notify} />}
          {active === 'mcp' && <McpView key={created.mcp.join('|')} customNames={created.mcp} onCreate={() => openCreate('mcp')} onNotify={notify} />}
          {active === 'models' && <ModelsView onNotify={notify} />}
          {!['dashboard', 'ai', 'agents', 'skills', 'mcp', 'models'].includes(active) && <RecordsView section={active} onNotify={notify} />}
        </main>
      </div>

      {searchOpen && <div className="search-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setSearchOpen(false) }}><div className="global-search"><div className="global-search-input"><Search size={18} /><input autoFocus placeholder="Busque páginas, processos, clientes..." value={search} onChange={(event) => setSearch(event.target.value)} onKeyDown={(event) => { if (event.key === 'Escape') setSearchOpen(false); if (event.key === 'Enter' && filteredItems[0]) navigate(filteredItems[0].id) }} /><kbd>ESC</kbd></div><div className="search-results-label">NAVEGAÇÃO</div>{filteredItems.length ? filteredItems.map(({ id, label, icon: Icon }) => <button className="search-result" key={id} onClick={() => navigate(id)}><Icon size={16} /><span>{label}</span><span className="search-result-hint">Abrir <span>↵</span></span></button>) : <div className="search-empty">Nenhum resultado para “{search}”</div>}<div className="search-footnote">Demonstração · pesquisa limitada à navegação</div></div></div>}
      {modal && <CreateModal kind={modal} onClose={() => setModal(null)} onSave={(name) => { if (modal !== 'quick') setCreated((current) => ({ ...current, [modal]: [name, ...current[modal]] })); setModal(null); notify(`${name} criado no estado local de demonstração`) }} />}
      {toast && <div className="toast-message"><span className="toast-check">✓</span>{toast}</div>}
    </div>
  )
}


function CreateModal({ kind, onClose, onSave }: { kind: 'agent' | 'skill' | 'mcp' | 'quick'; onClose: () => void; onSave: (name: string) => void }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const titles = { agent: 'Criar novo Agent', skill: 'Adicionar Skill', mcp: 'Conectar servidor MCP', quick: 'Criar novo' }
  const labels = { agent: 'Nome do Agent', skill: 'Nome da Skill', mcp: 'Nome do servidor', quick: 'O que você quer criar?' }
  const placeholders = { agent: 'Ex.: Especialista em Direito Digital', skill: 'Ex.: Análise de documentos', mcp: 'Ex.: Meu servidor MCP', quick: 'Digite um nome' }
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="modal-heading"><div><span className="eyebrow">LEXIA AI · DEMONSTRAÇÃO</span><h2 id="modal-title">{titles[kind]}</h2></div><button className="icon-button" onClick={onClose} aria-label="Fechar"><X size={18} /></button></div><label className="form-label" htmlFor="create-name">{labels[kind]}</label><input id="create-name" className="form-input" value={name} onChange={(event) => setName(event.target.value)} placeholder={placeholders[kind]} autoFocus />{kind !== 'quick' && <><label className="form-label" htmlFor="create-description">Descrição</label><textarea id="create-description" className="form-input form-textarea" value={description} onChange={(event) => setDescription(event.target.value)} placeholder={kind === 'mcp' ? 'Endpoint e objetivo (não insira credenciais neste protótipo)' : 'Descreva o objetivo e as instruções principais'} /></>}{kind === 'mcp' && <div className="modal-note"><ShieldCheck size={15} /> Credenciais e conexões reais devem ser configuradas no backend. Esta ação é apenas demonstrativa.</div>}<div className="modal-actions"><button className="button-secondary" onClick={onClose}>Cancelar</button><button className="button-primary" disabled={!name.trim()} onClick={() => onSave(name.trim())}><Plus size={15} />{kind === 'mcp' ? 'Salvar configuração' : 'Criar'}</button></div></section></div>
}
