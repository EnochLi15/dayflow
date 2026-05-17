import { Mastra } from '@mastra/core'
import type { Mastra as MastraType } from '@mastra/core'
import { planningAgent } from './agents/planning-agent.js'

export const mastra: MastraType = new Mastra({
  agents: { planningAgent },
})
