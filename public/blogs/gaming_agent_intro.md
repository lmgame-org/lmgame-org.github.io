# Evaluating Foundation Models with Platformer and Puzzle Games

> Author: Game Arena Team

> Date: March 20, 2025

> TL;DR: Classic platformer and puzzle games are designed to challenge human intelligence through carefully crafted difficulties and metrics with evolving mechanics. These designs are invaluable yet underutilized for benchmarking foundation models as their environment interaction capabilities continue to improve.

<br>

[gamingAgent](https://github.com/lmgame-org/GamingAgent) | [lmgame](https://x.com/largemodelgame)

## Introduction

Over the past few weeks, our team has been testing large foundation models across various games and analyzing their performance. From real-time challenges like Super Mario Bros to complex spatial reasoning tasks in Tetris, we aim to share key insights from our explorations and benchmarking results. Surprisingly, even the most advanced reasoning models excelling in math and coding struggle with tasks that are intuitive to humans, such as determining exactly which block to stack on top of another in Tetris.

Here, we showcase examples of how various models compare in performance across different games. 

### Gallery

![Super-Mario-Bros](02_mario-demo.gif "Figure 1: Super Mario Bros Gameplay Comparison.")

![Sokoban](02_sokoban-reasoning-demo.gif "Figure 2: Sokoban Reasoning Models Gameplay Comparison.")

![2048](02_2048-reasoning-demo.gif "Figure 3: 2048 Reasoning Models Gameplay Comparison.")

![Candy-Crash](02_candycrash-reasoning-demo.gif "Figure 4: Candy Crash Reasoning Models Gameplay Comparison.")

---

## Evaluation

### What is New to Our Benchmark?

Previous research on using games for evaluations has explored various methods for assessing LLM capabilities through game environments, examples include GameBench [1], SmartPlay [2] and BALROG [3]. GameBench and SmartPlay adapted game mechanics specifically for LLM evaluations. For instance, in SmartPlay, the Minecraft benchmark is simplified to focus on a limited set of creative tasks, primarily aimed at identifying specific biomes in Minecraft. BALROG focuses on games that involve long-horizon planning and decision-making, including exploration- and progression-based games like TextWorld, MiniHack, Crafter etc.

But in reality, most games are designed to challenge human perception, reaction, and intelligence, yet there lacks a benchmark that evaluates AI models under the same conditions of intelligence and environmental interaction as humans. In this blog, we investigate foundation models' performance across a range of game settings, including their unaltered versions, and assess how the outcomes reflect their underlying capabilities.


### Integaring Foundating Models with Gaming Agents

Our objective is to integrate models into games and evaluate their performance in ways analogous to how these games assess human abilities. However, current foundation models exhibit limitations in various critical areas, including Vision understanding, spatial reasoning, long-horizon planning, and Realtime reasoning. To address these challenges, we augmented model evaluations using specialized modules such as a vision-to-text-table conversion module, memory module, and game-freezing mechanisms.
The following table summarizes the specific capabilities tested by each game and each game’s fault tolerance levels:


| **Game**    | **Capabilities**             |  **Fault Tolerance** |
|:------------:|:-----------------------------------:|:------------------------:|
| Super Mario Bros  | Realtime reasoning, Spatial reasoning, (Vision understanding)  | high |
| Tetris     | Realtime reasoning, Long-horizon planning, Spatial reasoning, (Vision understanding) | low |
| 2048  | Long-horizon planning, Spatial reasoning | high |
| Candy Crash | Long-horizon planning, Spatial reasoning, (Vision understanding) | medium |
| Sokoban  | Long-horizon planning, Spatial reasoning, (Vision understanding)  | low |

![hidetable](placeholder.jpg "Table 1: Capabilities tested and in-game fault tolerance by each of our supported games.")

---

## Results

### Rankings

We conducted each game on every model at least three times and reported the average performance for each model. The summarized results are presented in the tables below.

| Model              | Score | Progress | Time (s) |
|--------------------|-------|----------|----------|
| Claude 3.7         | 710   | 1-1      | 64.2     |
| GPT 4o             | 560   | 1-1      | 58.6     |
| Gemini 2.0 flash   | 320   | 1-1      | 51.8     |
| GPT-4.5            | 160   | 1-1      | 62.8     |
| Claude 3.5 haiku   | 140   | 1-1      | 76.4     |


![hidetable](placeholder.jpg "Table 2: Model rankings in Super Mario Bros (reasoning models are excluded due to their high Realtime reasoning).")


| Model                     | Score | Steps | Time (mins) |
|---------------------------|-------|-------|-------------|
| Claude 3.7 thinking       | 256   | 114   | >200        |
| o1                        | 256   | 116   | >200        |
| o3-mini-medium            | 256   | 119   | >200        |
| Claude 3.7                | 256   | 130   | ∼20         |
| Gemini 2.0 flash          | 128   | 111   | ∼18         |
| Gemini 2.0 flash thinking | 128   | 132   | >100        |
| Claude 3.5 haiku          | 128   | 151   | ∼1          |
| GPT-4.5                   | 34    | 34    | ∼8          |
| GPT 4o                    | 16    | 21    | ∼1          |

![hidetable](placeholder.jpg "Table 3: Model rankings in 2048.")

| Model            | Tetris (C) Score | Tetris (C) Steps | Tetris (P) Score | Tetris (P) Steps |
|------------------|------------------|------------------|------------------|------------------|
| Claude 3.7       | 95               | 27               | 110              | 29               |
| Claude 3.5 haiku | 90               | 25               | 92               | 25               |
| Gemini 2.0 flash | 82               | 23               | 87               | 24               |
| GPT 4o           | 54               | 19               | 56               | 20               |

![hidetable](placeholder.jpg "Table 4: Model rankings in Tetris (with complete (C) and planning-only (P), where each block doesn't fall until command actions are executed, variants).")

| Model                      | Score | Steps |
|----------------------------|-------|-------|
| o1                         | 97    | 25    |
| o3-mini-medium             | 90    | 25    |
| Deepseek-R1                | 91    | 25    |
| Claude 3.7                 | 35    | 25    |
| Gemini 2.0 flash thinking  | 18    | 25    |

![hidetable](placeholder.jpg "Table 5: Model rankings in Candy Crush (non-reasoning models are excluded due to their poor performance).")

| Model                      | Levels Cracked | Steps           |
|----------------------------|----------------|-----------------|
| o3-mini-medium             | 2 (3)        | [20,51,70,91]   |
| Claude 3.7 thinking        | 1 (2)        | [16,38]         |
| Deepseek-R1                | 1 (1)        | [17,39]         |
| Gemini 2.0 flash thinking  | 0 (0)        | [17]            |
| Claude 3.7                 | 0            | [37]            |
| GPT 4o                     | 0 (0)        | [113]           |

![hidetable](placeholder.jpg "Table 6: Model rankings in Sokoban (parenthesis reports the highest level ever reached).")

From the rankings, several insights emerge:

- Long-horizon planning: In games that demand long-horizon planning and decision-making, reasoning models like o3-mini, o1, and Claude 3.7 thinking perform better.

- High complexity challenge: All models—including reasoning models—struggle in games such as Sokoban and Tetris, where the decision-making space is exceptionally large. There is still a big gap between human-level performance

- Visual perception: While Gemini 2.0 flash and Claude 3.7 are good in visual perception, their performance degrades when the field of vision expands and the number of objects to track increases.

- Realtime reasoning-sensitive environments: For Realtime reasoning-sensitive games like Super Mario Bros and Tetris (C), models that strike a balance between low Realtime reasoning, robust visual perception, and effective planning—such as Claude 3.7, Claude 3.5, and Gemini 2.0 flash—are most effective.


---

## Last Few Words

Recent studies have shown that integrating reinforcement learning (RL) can enhance foundation models' reasoning abilities in tasks like math and coding. Evidence suggests that even simple RL algorithms can improve planning and decision-making, a capability that becomes particularly significant when interacting with complex environments. These developments highlight how game environments can serve as effective benchmarks for evaluating foundation models, especially in reasoning and decision-making tasks.

Classic games are meticulously designed to challenge human minds. Skilled designers have carefully engineered the difficulties through in-game metrics, such as points and levels, and relentlessly developed new types of games to challenge different aspects of human intelligence. 

We believe these game designs are invaluable yet underutilized resources for benchmarking AI. With decades of high-quality games from human society, we see a highly scalable path ahead for evaluations.

In this journey, our mission is to study new perspectives for AI evaluations and the evolving roles humans play in evaluations. 

---

## Research and Open-sourced Commitments

We invite you to try out [our codebase](https://github.com/lmgame-org/GamingAgent) and build your own gaming agents!

---

## References

[1] Costarelli, Anthony, et al. "Gamebench: Evaluating strategic reasoning abilities of llm agents." arXiv preprint arXiv:2406.06613 (2024).

[2] Wu, Yue, et al. "Smartplay: A benchmark for llms as intelligent agents." arXiv preprint arXiv:2310.01557 (2023).

[3] Paglieri, Davide, et al. "Balrog: Benchmarking agentic llm and vlm reasoning on games." arXiv preprint arXiv:2411.13543 (2024).

---

## Citation

```bibtex
article{hu2024gamearena,
  title={GameArena: Evaluating LLM Reasoning through Live Computer Games},
  author={Hu, Lanxiang and Li, Qiyu and Xie, Anze and Jiang, Nan and Stoica, Ion and Jin, Haojian and Zhang, Hao},
  journal={arXiv preprint arXiv:2412.06394},
  year={2024}
}
```
