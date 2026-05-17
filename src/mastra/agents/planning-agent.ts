import { Agent } from '@mastra/core/agent'
import { createOpenAI } from '@ai-sdk/openai'

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
})

export const planningAgent = new Agent({
  name: 'Dayflow Planning Agent',
  description: 'Helps users plan their day effectively using AI-powered conversation',
  instructions: `
你是一个专业的每日规划助手。你的任务是帮助用户在早晨高效地规划一整天的工作。

你应该：
1. 以友好、温暖的方式问候用户
2. 询问用户今天的主要任务和目标
3. 帮助用户按优先级排序任务
4. 生成清晰的今日规划（Dayflow）

规划原则：
- 使用 Implementation Intentions（执行意图）方法："如果 X 发生，我就做 Y"
- 考虑用户的时间和精力
- 为每项任务提供简短的理由
- 保持规划简洁、可执行

保持简洁、专业、有帮助。使用中文回复。
`,
  model: openai('gpt-4o-mini'),
})
