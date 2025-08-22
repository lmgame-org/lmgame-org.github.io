# GRL (Game Reinforcement Learning)

> Author: Lmgame Team

> Date: Aug 25, 2025

> TL;DR: GRL (Game Reinforcement Learning) is an agent-centric framework for multi-turn reinforcement learning of LLMs, designed to study generalization. While well-suited for game-based tasks, it extends naturally to training and evaluating diverse domains with verifiable rewards—including math, coding, and beyond. Experiments show that training on board games such as Sokoban and Tetris can drive cross-game transfer, improving planning ability and overall agentic task performance.

<div style="font-size:18px; text-align:left; letter-spacing:1px;">
  <a href="https://arxiv.org/pdf/2505.15146">Paper</a>
  <span style="margin: 0 12px;"></span>
  <a href="https://github.com/lmgame-org/GRL">GRL</a>
  <span style="margin: 0 12px;"></span>
  <a href="https://huggingface.co/spaces/lmgame/lmgame_bench">Leaderboard</a>
  <span style="margin: 0 12px;"></span>
  <a href="https://discord.gg/YYjVCVAbQd">Discord</a>
  <span style="margin: 0 12px;"></span>
  <a href="https://www.youtube.com/@large-model-game">Gallery</a>
</div>

<div style="height:32px;"></div>

---



## 1. **Agent-Centric Reinforcement Learning Framework**
Our framework treats each *agent unit* as a self-contained rollout manager—controlling the entire lifecycle from task assignment to execution and feedback. This encapsulation is driven by two declarative configs:
- **`agent_config`**: Governs the LLM interaction—defines prompts, reasoning structure, token and turn budgets, action formatting, etc.
- **`env_config`**: Dictates environment behavior—task dynamics, grid sizes, render modes, vocabularies, datasets, and gym-style dynamics.

This separation ensures each agent is **completely modular and self-contained**, which:
- Makes debugging straightforward and localized.
- Enables clean extensibility across diverse environment types.
- Enhances scalability by reducing cross-agent interference and simplifying configuration management.

## GRL vs. verl-agent vs. RAGEN

| Feature / Aspect          | **GRL (Ours)** – Advantage | verl-agent | RAGEN |
|---------------------------|---------------------------|------------|-------|
| **Design Focus**          | **Agent-centric**: each agent unit controls full rollout lifecycle | Gym-style multi-turn rollouts, less explicit agent isolation | Trajectory-level RL, less agent identity focus |
| **Config Structure**      | **Clear split**: `agent_config` (LLM behavior) + `env_config` (environment) | Mixed configs, memory modules, less separation | Unified config, environment-focused |
| **Scalability**           | **High** – modular agents scale cleanly across diverse envs | High throughput, grouped rollouts | Modular but less per-agent isolation |
| **Debugging Ease**        | **Easy** – localized to single agent unit | Possible, but configs less explicit | More global-level tuning required |
| **Cross-Domain Transfer** | **Built-in** – train/validate within isolated agent units | Possible with custom envs | Focused on stochastic env optimization |
| **Customization**         | **High** – plug-and-play new agents/envs | Flexible, but less structured | Flexible, but environment-centric |

(Please check [TUTORIAL.md](https://github.com/lmgame-org/LMGameRL/blob/main/docs/TUTORIAL.md) for further details)


---



## Training Results



Our experiments are primarily conducted on the Qwen2.5-7B-Instruct model. We trained on one board game (Sokoban or Tetris) using PPO, and evaluated on cross-game, planning, math, code and agentic tasks. Detailed settings are in our paper ([arXiv:2505.15146](https://arxiv.org/abs/2505.15146)).



Each game is trained twice. Reported values correspond to the step at which the training task (Sokoban or Tetris) achieves its peak performance on the validation set, averaged across the two runs.

![validation_curves](06_example_validation_success_curves.png "Figure 1: Validation success curves across tasks.")

<div style="height:16px;"></div>

---



**Part 1**


|                  | Sokoban 6×6 | Sokoban 8×8 | Tetris (1 type) | Tetris (2 types) | Blocksworld (text) |
|------------------|-------------|-------------|-----------------|------------------|--------------------|
| Qwen2.5-7B-Instruct | 12.7        | 5.5         | 2.2             | 9.9              | 67.3               |
| Train on Sokoban | **26.6**     | **7.4**     | 4.5             | 13.1             | **72.2**           |
| Train on Tetris  | 15.1         | 7.2         | **58.4**        | **23.1**         | 64.7               |



---

<div style="height:16px;"></div>

**Part 2**


|                  | Blocksworld (1d) | Blocksworld (2d) | GSM8K (1 turn) | GSM8K (5 turns) | WebShop |
|------------------|------------------|------------------|----------------|-----------------|---------|
| Qwen2.5-7B-Instruct | 17.3             | 13.5             | **88.3**       | 94.1            | 9.0     |
| Train on Sokoban | **24.3**          | 17.9             | 87.3           | 93.8            | 15.0    |
| Train on Tetris  | 20.8              | **20.6**         | 89.1           | **94.5**        | **15.8** |



---



### Observations from Sokoban and Tetris Training

- **Same-Game Generalization (robust within domain)**
  - Harder variants improve within the same game family.
  - Sokoban: 6×6 → 8×8 rises from 5.5% → 7.4%.
  - Tetris: 1 block type → 2 block types rises from 9.9% → 23.1%.
  - Takeaway: Structured symbolic training scales to more complex in-domain settings.

- **Cross-Game Generalization (symbolic transfer)**
  - Train on Sokoban → Tetris gains: 2.2% → 4.5% (1 type), 9.9% → 13.1% (2 types).
  - Train on Tetris → Sokoban gains: 12.7% → 15.1% (6×6), 5.5% → 7.2% (8×8).
  - Takeaway: Shared 2D symbolic structure enables transfer across different games.

- **Blocksworld: sensitivity to representation**
  - Symbolic formats (2D ASCII / 1D lists): consistent improvements after Sokoban/Tetris training.
  - Natural language format: inconsistent gains.
  - Takeaway: Symbolic-to-symbolic transfer is strong; symbolic-to-text is weaker.

- **GSM8K: neutral math impact**
  - Effects are negligible when training on Sokoban/Tetris.
  - Likely reasons: (a) domain misalignment (spatial vs arithmetic), (b) math already saturated in pretraining.

- **WebShop: multi-turn gains with instability**
  - Overall improvements align with multi-turn planning structure.
  - Run-to-run variance persists (e.g., one Tetris-trained run improves, another declines).

**Key insights**
- Game-based training helps most when tasks share symbolic or multi-turn structure.
- Representation matters; keep inputs symbolic to maximize transfer.
- Domains well-covered in pretraining (e.g., math) see limited additional gains.
- Stability is a challenge; curricula and stopping criteria deserve attention.

---



## Reproduce Training Results



**Sokoban Training Results:**

```bash
Source examples/sokoban_ppo/qwen_7b.sh
```



**Tetris Training Results:**

```bash
Source examples/tetris_ppo/qwen_7b.sh
```