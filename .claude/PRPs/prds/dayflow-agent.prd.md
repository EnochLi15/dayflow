# Dayflow Agent

## Problem Statement

工程师/研发人员每天面临任务多且杂的困境：多个项目跟进、多人沟通协作、业务交付与团队管理并行。传统 todo 软件难以坚持使用，梳理待办时心智负担重——昨天的待办需要额外整理完成情况，还要回头 check，缺乏高效的早晨规划工具。

## Evidence

- 用户痛点：普通 todo 软件"难以坚持，收效不高"，梳理时"心智负担重"
- 现象：事情多且杂，昨天待办需额外梳理完成情况，认知负担过重
- 假设：需要通过用户访谈验证痛点普遍性

## Proposed Solution

构建一个基于 Mastra Agent 框架的智能早晨规划助手，通过文件系统、CLI 等方式获取上下文，利用 AI Agent 的记忆与推理能力，科学地帮助用户完成 dayflow 规划。不做传统 todo app，而是专注"规划"而非"管理"，利用 Implementation Intentions（执行意图）等心理学方法降低认知负荷。

## Key Hypothesis

我们相信智能规划能帮用户更合理规划一整天的工作，提高效率。
我们会知道自己是正确的，当用户每天早晨能流畅地完成规划，且规划质量与执行率显著提升。

## What We're NOT Building

- **传统 todo 应用** — 市场已饱和，不符合"智能规划"定位
- **系统对接集成** — 不做 Notion/Linear/飞书等第三方工具的深度集成，保持产品聚焦
- **团队协作功能** — V1 专注个人规划，团队功能延后
- **移动端 App** — 先做桌面端 CLI/Web，移动端延后

## Success Metrics

| Metric | Target | How Measured |
|--------|--------|--------------|
| 早晨规划完成率 | > 80% | 完成规划会话 / 启动规划会话 |
| 规划执行率 | > 70% | 实际完成任务 / 计划任务 |
| 用户留存（7日） | > 50% | 7日后仍活跃用户比例 |
| 平均规划时长 | < 5 分钟 | 规划会话时长中位数 |

## Open Questions

- [ ] 用户交互方式：CLI、Web、还是混合？需要用户测试
- [ ] 上下文来源：具体从哪些文件/系统获取？需要技术调研
- [ ] 心理学方法融入：如何将 Implementation Intentions 自然地融入交互流程？
- [ ] 语音输入：是否在 V1 支持？

---

## Users & Context

**Primary User**
- **Who**: 工程师/研发人员，身兼项目跟进、沟通协作、业务交付、团队管理多职
- **Current behavior**: 使用普通 todo 软件，难以坚持，每天早晨花费大量时间梳理待办
- **Trigger**: 每天早晨开启工作前，需要规划当天任务
- **Success state**: 流畅完成一天工作规划，心智负担低，对今天的安排有信心

**Job to Be Done**

当早上开启一天工作之前，我想要通过这个 agent/app 流畅地完成一天工作的规划，以便高效有序地开展当天工作。

**Non-Users**
- 不愿接受 AI 辅助的人
- 不愿从传统 todo 软件转型的人
- 需要深度系统集成的企业用户（V1 阶段）

---

## Solution Detail

### Core Capabilities (MoSCoW)

| Priority | Capability | Rationale |
|----------|------------|-----------|
| Must | 上下文理解 | 核心差异化能力，基于用户现有信息智能规划 |
| Must | Dayflow 展示 | 用户需要可视化看到今天的规划 |
| Must | Agent 规划交互 | AI Agent 主动引导用户完成规划 |
| Should | 记忆持久化 | Agent 记住用户偏好、历史规划，提供个性化建议 |
| Should | 心理学方法融入 | 降低认知负荷，提高规划科学性 |
| Could | 语音输入 | 提升交互效率，但非 V1 必须 |
| Won't | 传统 todo CRUD | 明确定位为"规划"而非"任务管理" |
| Won't | 第三方系统集成 | V1 保持聚焦，延后集成 |

### MVP Scope

1. **上下文获取**：从本地文件系统读取用户待办、笔记等
2. **Agent 对话规划**：通过 CLI/Web 与 Agent 交互，完成早晨规划
3. **Dayflow 展示**：生成今日规划的可视化展示
4. **基础记忆**：记住用户偏好和历史规划

### User Flow

```
早晨启动 → Agent 问候 → 回顾昨日/待办 → 引导规划今日 → 确认 Dayflow → 开始执行
     ↓                                                        ↓
  (可选语音)                                            (可随时调整)
```

---

## Technical Approach

**Feasibility**: HIGH

**Tech Stack**
- **Backend**: TypeScript + Mastra Agent Framework
- **Frontend**: Vue3 (可选，V1 可先用 CLI)
- **Memory**: LibSQL (本地) / Upstash (云端)
- **LLM**: OpenAI / Claude API

**Architecture Notes**
```
┌─────────────────────────────────────────────────────────┐
│                    Dayflow Agent                         │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ Context     │  │ Planning    │  │ Memory      │     │
│  │ Tools       │  │ Agent       │  │ System      │     │
│  │ (File/CLI)  │  │ (Mastra)    │  │ (LibSQL)    │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ Dayflow     │  │ User        │  │ Psychology  │     │
│  │ Display     │  │ Interface   │  │ Methods     │     │
│  │ (Vue3/CLI)  │  │ (CLI/Web)   │  │ (If-Then)   │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
```

**Technical Risks**

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Mastra 框架生态较新 | 中 | 关注官方更新，保持版本同步 |
| Memory 向量检索准确性 | 中 | 测试调优 semantic recall 参数 |
| 用户交互方式变化 | 中 | 设计灵活的 UI 层，支持 CLI/Web 切换 |

---

## Implementation Phases

| # | Phase | Description | Status | Parallel | Depends | PRP Plan |
|---|-------|-------------|--------|----------|---------|----------|
| 1 | 基础架构 | 项目初始化、Mastra Agent 搭建、基础 CLI | complete | - | - | [report](../reports/phase-1-infrastructure-report.md) |
| 2 | 上下文工具 | 文件系统读取、待办解析、笔记提取 | pending | - | 1 | - |
| 3 | 规划 Agent | 核心规划逻辑、对话交互、Dayflow 生成 | pending | - | 2 | - |
| 4 | 记忆系统 | 用户偏好记忆、历史规划存储、语义检索 | pending | with 5 | 3 | - |
| 5 | 展示界面 | CLI 展示优化 / Vue3 Web 界面 | pending | with 4 | 3 | - |
| 6 | 心理学增强 | Implementation Intentions 融入、认知负荷优化 | pending | - | 4, 5 | - |

### Phase Details

**Phase 1: 基础架构**
- **Goal**: 搭建可运行的 Mastra Agent 基础框架
- **Scope**: 项目初始化、依赖安装、基础 Agent 创建、CLI 入口
- **Success signal**: `dayflow plan` 命令能启动 Agent 对话

**Phase 2: 上下文工具**
- **Goal**: Agent 能读取并理解用户现有待办/笔记
- **Scope**: 文件系统读取工具、待办格式解析、笔记关键词提取
- **Success signal**: Agent 能读取指定目录下的待办文件并提取任务

**Phase 3: 规划 Agent**
- **Goal**: Agent 能引导用户完成早晨规划
- **Scope**: 规划对话流程、任务优先级推理、Dayflow 结构生成
- **Success signal**: 完成一次完整的规划对话，生成有效的 Dayflow

**Phase 4: 记忆系统**
- **Goal**: Agent 能记住用户偏好和历史规划
- **Scope**: LibSQL 存储、语义检索配置、Working Memory 实现
- **Success signal**: Agent 能引用之前规划中的偏好和习惯

**Phase 5: 展示界面**
- **Goal**: 用户能清晰看到 Dayflow 规划
- **Scope**: CLI 格式化输出、或 Vue3 Web 界面
- **Success signal**: Dayflow 以清晰可视化的方式展示

**Phase 6: 心理学增强**
- **Goal**: 融入心理学方法，提升规划科学性
- **Scope**: Implementation Intentions 生成、认知负荷优化提示
- **Success signal**: 规划建议包含 If-Then 语句，用户反馈认知负担降低

### Parallelism Notes

- Phase 4（记忆系统）和 Phase 5（展示界面）可以并行开发，都依赖 Phase 3 完成
- Phase 6 需要等 Phase 4 和 5 完成后，在现有基础上增强

---

## Decisions Log

| Decision | Choice | Alternatives | Rationale |
|----------|--------|--------------|-----------|
| Agent 框架 | Mastra | LangChain, AutoGen | TS 原生、Memory 能力完整、官方文档完善 |
| 前端方案 | Vue3 / CLI | React, 纯 CLI | 用户熟悉 Vue3，CLI 更轻量，两者可并存 |
| 存储方案 | LibSQL | SQLite, PostgreSQL | Mastra 官方支持，本地文件无需额外服务 |
| 产品定位 | 规划助手 | Todo 管理 | 区别于传统 todo，聚焦"规划"场景 |

---

## Research Summary

**Market Context**
- AI-powered daily planning 是热门赛道（Vela, Priority One, Doable, Morgen 等）
- 核心差异化：跨工具聚合、语音输入、ADHD 友好设计
- 心理学方法：Implementation Intentions (If-Then Planning)、MCII 被验证有效

**Technical Context**
- Mastra 框架：TS 原生，Memory/Tools/Workflows 完整支持
- Memory 系统：支持对话历史、语义检索、工作记忆
- 部署灵活：本地开发、Serverless、自托管均可

---

*Generated: 2026-05-17*
*Status: DRAFT - needs validation*
