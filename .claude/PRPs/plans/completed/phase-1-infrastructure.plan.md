# Plan: Phase 1 - 基础架构

## Summary
搭建可运行的 Mastra Agent 基础框架，包括项目初始化、基础规划 Agent 创建、CLI 入口，实现 `dayflow plan` 命令启动 Agent 对话。

## User Story
As a 开发者, I want 一个可运行的 Mastra Agent 基础项目, So that 我可以在其上构建 dayflow 规划功能.

## Problem → Solution
空白项目 → 可运行的 AI 规划助手基础框架

## Metadata
- **Complexity**: Medium
- **Source PRD**: `.claude/PRPs/prds/dayflow-agent.prd.md`
- **PRD Phase**: Phase 1 - 基础架构
- **Estimated Files**: 8-12 files

---

## UX Design

### Before
```
┌─────────────────────────────┐
│  空白项目目录                │
│  无任何代码                  │
│  无法执行任何操作            │
└─────────────────────────────┘
```

### After
```
┌─────────────────────────────────────────────────────┐
│  $ dayflow plan                                     │
│                                                     │
│  🌅 Good morning! Let's plan your day.              │
│                                                     │
│  I'm your Dayflow planning assistant.               │
│  What would you like to focus on today?             │
│                                                     │
│  > _                                                │
└─────────────────────────────────────────────────────┘
```

### Interaction Changes
| Touchpoint | Before | After | Notes |
|---|---|---|---|
| CLI | 无 | `dayflow plan` 启动规划对话 | 核心入口 |
| Agent | 无 | Planning Agent 回应用户 | 基础对话能力 |
| 配置 | 无 | `.env` 配置 API Key | 用户需提供 LLM API Key |

---

## Mandatory Reading

| Priority | Source | Why |
|---|---|---|
| P0 | Mastra Docs - Agent Creation | 核心 Agent 创建模式 |
| P0 | Mastra Docs - Project Structure | 项目结构规范 |
| P1 | Mastra Docs - CLI Commands | 开发和构建命令 |

## External Documentation

| Topic | Key Takeaway |
|---|---|
| Project Init | `npm create mastra@latest` 或 `npx mastra@latest init` |
| Agent Creation | `new Agent({ name, instructions, model })` |
| Project Structure | `src/mastra/` 包含 `agents/`, `tools/`, `index.ts` |
| CLI Dev | `mastra dev` 启动开发服务器 |

---

## Patterns to Mirror

### PROJECT_STRUCTURE
```
src/
└── mastra/
    ├── agents/           # Agent definitions
    │   └── planning-agent.ts
    ├── tools/            # Tool definitions (Phase 2)
    └── index.ts          # Main Mastra config
```

### AGENT_CREATION
```typescript
import { Agent } from '@mastra/core/agent'
import { openai } from '@ai-sdk/openai'

export const planningAgent = new Agent({
  name: 'Dayflow Planning Agent',
  description: 'Helps users plan their day effectively',
  instructions: `你是一个专业的每日规划助手...`,
  model: openai('gpt-4o-mini'),
})
```

### MASTRA_CONFIG
```typescript
import { Mastra } from '@mastra/core'
import { planningAgent } from './agents/planning-agent'

export const mastra = new Mastra({
  agents: { planningAgent },
})
```

---

## Files to Change

| File | Action | Justification |
|---|---|---|
| `package.json` | CREATE | 项目配置和依赖 |
| `tsconfig.json` | CREATE | TypeScript 配置 |
| `.env.example` | CREATE | 环境变量模板 |
| `src/mastra/index.ts` | CREATE | Mastra 主配置 |
| `src/mastra/agents/planning-agent.ts` | CREATE | 规划 Agent 定义 |
| `src/cli.ts` | CREATE | 自定义 CLI 入口 |
| `.gitignore` | CREATE | Git 忽略配置 |
| `README.md` | CREATE | 项目说明 |

## NOT Building

- 上下文读取工具（Phase 2）
- 记忆系统（Phase 4）
- Vue3 Web 界面（Phase 5）
- 飞书集成
- 语音输入

---

## Step-by-Step Tasks

### Task 1: 项目初始化
- **ACTION**: 使用 Mastra CLI 初始化项目
- **IMPLEMENT**: 运行 `npx mastra@latest init`
- **VALIDATE**: 项目目录结构正确，`mastra dev` 可启动

### Task 2: 创建规划 Agent
- **ACTION**: 创建 `src/mastra/agents/planning-agent.ts`
- **IMPLEMENT**:
  ```typescript
  import { Agent } from '@mastra/core/agent'
  import { openai } from '@ai-sdk/openai'

  export const planningAgent = new Agent({
    name: 'Dayflow Planning Agent',
    description: 'Helps users plan their day effectively',
    instructions: `
      你是一个专业的每日规划助手。
      你的任务是帮助用户在早晨高效地规划一整天的工作。
      你应该：
      1. 以友好的方式问候用户
      2. 询问用户今天的主要任务和目标
      3. 帮助用户按优先级排序
      4. 生成清晰的今日规划
      保持简洁、专业、有帮助。
    `,
    model: openai('gpt-4o-mini'),
  })
  ```
- **VALIDATE**: Agent 可被导入，无类型错误

### Task 3: 配置 Mastra 主入口
- **ACTION**: 创建 `src/mastra/index.ts`
- **IMPLEMENT**:
  ```typescript
  import { Mastra } from '@mastra/core'
  import { planningAgent } from './agents/planning-agent'

  export const mastra = new Mastra({
    agents: { planningAgent },
  })
  ```
- **VALIDATE**: `mastra dev` 可启动开发服务器

### Task 4: 创建自定义 CLI 入口
- **ACTION**: 创建 `src/cli.ts`
- **IMPLEMENT**:
  ```typescript
  #!/usr/bin/env node
  import { mastra } from './mastra'

  async function main() {
    const agent = mastra.getAgent('planningAgent')
    console.log('🌅 Good morning! Let\'s plan your day.')
    const result = await agent.generate('Help me plan my day')
    console.log(result.text)
  }

  main().catch(console.error)
  ```
- **VALIDATE**: `npx tsx src/cli.ts` 可运行

### Task 5: 配置 package.json
- **ACTION**: 更新 scripts 和 dependencies
- **VALIDATE**: `npm run dayflow` 可执行

### Task 6: 配置环境变量
- **ACTION**: 创建 `.env.example`
- **VALIDATE**: Agent 可读取 API Key

### Task 7: 创建 README
- **ACTION**: 创建项目说明文档
- **VALIDATE**: 文档清晰可读

---

## Validation Commands

### Static Analysis
```bash
npx tsc --noEmit
```
EXPECT: Zero type errors

### Run CLI
```bash
npm run dayflow
```
EXPECT: Agent 输出问候语，开始规划对话

### Dev Server
```bash
npm run dev
```
EXPECT: Mastra Studio 可访问

---

## Acceptance Criteria
- [ ] 项目结构符合 Mastra 规范
- [ ] Planning Agent 可创建并运行
- [ ] `mastra dev` 启动成功
- [ ] `dayflow plan` 命令可启动 Agent 对话
- [ ] 无 TypeScript 类型错误
- [ ] 环境变量配置正确

## Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Mastra 版本更新导致 API 变化 | 中 | 中 | 锁定版本号，关注 CHANGELOG |
| OpenAI API 配额限制 | 低 | 低 | 支持 Claude 作为备选 |

## Notes
- V1 先用 OpenAI gpt-4o-mini，成本低、速度快
- Mastra Studio 提供可视化调试界面
