export type OrganizationId = string & { readonly __brand: 'OrganizationId' }
export type UserId = string & { readonly __brand: 'UserId' }
export type AgentId = string & { readonly __brand: 'AgentId' }
export type RunId = string & { readonly __brand: 'RunId' }

export type AuthorizedActor = {
  userId: UserId
  organizationId: OrganizationId
  role: 'owner' | 'admin' | 'lawyer' | 'staff' | 'read_only'
}

export type SourceReference = {
  id: string
  label: string
  href?: string
  excerpt?: string
  verifiedAt?: string
}

export type GenerationRequest = {
  agentId: AgentId
  conversationId?: string
  message: string
  allowedResourceIds: string[]
  idempotencyKey: string
}

export type GenerationResult = {
  runId: RunId
  status: 'queued' | 'running' | 'completed' | 'failed' | 'needs_human_review'
  answer?: string
  sources: SourceReference[]
  warnings: string[]
}

export type ProviderModel = {
  providerId: string
  modelId: string
  displayName: string
  capabilities: Array<'text' | 'vision' | 'structured_output' | 'embeddings'>
}

export interface AiProviderAdapter {
  listModels(): Promise<ProviderModel[]>
  generate(request: GenerationRequest, actor: AuthorizedActor): Promise<GenerationResult>
}

export type McpToolPermission = {
  serverId: string
  toolName: string
  agentIds: AgentId[]
  requiresHumanApproval: boolean
}

export interface McpGateway {
  listTools(serverId: string, actor: AuthorizedActor): Promise<Array<{ name: string; description: string }>>
  invokeTool(input: {
    serverId: string
    toolName: string
    input: Record<string, unknown>
    idempotencyKey: string
  }, actor: AuthorizedActor): Promise<{ runId: RunId; status: 'completed' | 'needs_human_approval' | 'failed' }>
}
