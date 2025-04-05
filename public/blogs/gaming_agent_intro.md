# Evaluating Foundation Models with Platformer and Puzzle Games

> Author: Lanxiang Hu, Mingjia Huo, Yuxuan Zhang, Haoyang Yu, Haojian Jin, Hao Zhang

> Date: March 17, 2025

> TL;DR: Classic platformer and puzzle games are designed to challenge human intelligence through carefully crafted difficulties and metrics with evolving mechanics. These designs are invaluable yet underutilized for benchmarking foundation models as their environment interaction capabilities continue to improve.

<br>

[Demos](placeholder) | [gamingAgent](https://github.com/lmgame-org/GamingAgent) | [lmgame](https://x.com/largemodelgame)

## Introduction

### Games as AI Testbeds in Past Decades

Games often offer diverse challenges, from long-horizon planning in games like Go to real-time decision-making in video games like Super Mario Bros, for researchers to assess and develop RL algorithms across various scenarios.

Since the 1960s, during the era of mechanical computers, researchers have been testing RL algorithms on games like tic-tac-toe. For decades, games have served as ideal testbeds for evaluating RL algorithms due to their controlled environments, well-defined objectives, and quantifiable rewards.

Over the past few years, platforms like OpenAI Gym and the Arcade Learning Environment (ALE) have been instrumental in advancing RL research. These structured frameworks enable consistent evaluation, foster reproducibility, and facilitate the comparison of different RL approaches. 

![Mechanical Tic-Tac-Toe](gaming_agent/mechanical_computer.png "Figure 1: mechanical computer made from 304 matchboxes designed and built by artificial intelligence researcher Donald Michie in 1961.")


### Games as Foundation Model Testbeds in Years to Come

Recently, it has been shown that integrating reinforcement learning (RL) can further enhance foundation models' reasoning abilities in tasks like math and coding. Increasing evidence suggests that training these models with even simple RL algorithms can improve planning and decision-making. This capability becomes especially significant in s crucial when interacting with complex environments.

These developments demonstrate how game environments can serve as effective benchmarks for evaluating foundation models, particularly in reasoning and decision-making tasks.

![Large model Gaming](game_control.png "Figure 2: Claude-3.7 controlling PC to play Super Mario Bros.")


### Our Intiatives

Over the past few weeks, our team has been testing large foundation models across various games and analyzing their performance. From real-time challenges like Super Mario Bros to complex spatial reasoning tasks in Tetris, we aim to share key insights from our explorations and benchmarking results. Surprisingly, even the most advanced reasoning models excelling in math and coding struggle with tasks that are intuitive to humans, such as determining exactly which block to stack on top of another in Tetris.

Here, we showcase examples of how various models compare in performance across different games. 

### Gallery

![Super-Mario-Bros](gallery/gamingAgent-3-17-25/mario-demo.gif "Figure 3: Super Mario Bros Gameplay Comparison.")

![Sokoban](gallery/gamingAgent-3-17-25/sokoban-reasoning-demo.gif "Figure 4: Sokoban Reasoning Models Gameplay Comparison.")

![2048](gallery/gamingAgent-3-17-25/2048-reasoning-demo.gif "Figure 5: 2048 Reasoning Models Gameplay Comparison.")


![2048](gallery/gamingAgent-3-17-25/2048-non-reasoning-demo.gif "Figure 6: 2048 non-Reasoning Models Gameplay Comparison.")

---

## Evaluation

### What is Missing from Existing Benchmarks?


#### Static Benchmarks

Static benchmarks, such as MMLU, Spider, HumanEval, AIME, and GPQA, are meticulously designed by experts to assess domain-specific capabilities. However, they are notably susceptible to data contamination.

#### Dynamic Benchmarks

Dynamic benchmarks, such as Chatbot Arena, rank models based on human preferences. However, they rely on human feedback to determine the superior model, a task that becomes increasingly challenging as model capabilities advance.

#### Gaming Benchmarks

Previous research on using games for evaluations has explored various methods for assessing LLM capabilities through game environments, examples include GameBench [1], SmartPlay [2] and BALROG [3]. GameBench and SmartPlay adapted game mechanics specifically for LLM evaluations. For instance, in SmartPlay, the Minecraft benchmark is simplified to focus on a limited set of creative tasks, primarily aimed at identifying specific biomes in Minecraft. BALROG focuses on games that involve long-horizon planning and decision-making, including exploration- and progression-based games like TextWorld, MiniHack, Crafter etc.

But in reality, most games are designed to challenge human perception, reaction, and intelligence, yet there lacks a benchmark that evaluates AI models under the same conditions of intelligence and environmental interaction as humans. In this blog, we investigate foundation models' performance across a range of game settings, including their unaltered versions, and assess how the outcomes reflect their underlying capabilities.


### Integaring Foundating Models with Gaming Agents

Our objective is to integrate models into games and evaluate their performance in ways analogous to how these games assess human abilities. However, current foundation models exhibit limitations in various critical areas, including spatial perception, spatial reasoning, long-horizon planning, and latency. To address these challenges, we augmented model evaluations using specialized modules such as a vision-to-text-table conversion module, memory module, and game-freezing mechanisms.
The following table summarizes the specific capabilities tested by each game and each game’s fault tolerance levels:


| **Game**    | **Capabilities**             |  **Fault Tolerance** |
|:------------:|:-----------------------------------:|:------------------------:|
| Super Mario Bros  | Latency, Spatial reasoning, (Spatial perception)  | high |
| Tetris     | Latency, Long-horizon planning, Spatial reasoning, (Spatial perception) | low |
| 2048  | Long-horizon planning, Spatial reasoning | high |
| Candy Crash | Long-horizon planning, Spatial reasoning, (Spatial perception) | high |
| Sokoban  | Long-horizon planning, Spatial reasoning, (Spatial perception)  | low |

![hidetable](placeholder.jpg "Table 1: Capabilities tested by each of our supported games and in-game fault tolerance.")

---

## Results

### Rankings

We conducted each game on every model at least three times and reported the average performance for each model. The summarized results are presented in the table below:

| Model                     | SMB Score | SMB Progress | SMB Time (s) | 2048 Score | 2048 Steps | 2048 Time (mins) | Tetris (C) Score | Tetris (C) Steps | Tetris (P) Score | Tetris (P) Steps | Candy Crush Score | Candy Crush Steps | Sokoban Levels Cracked | Sokoban Steps                 |
|---------------------------|-----------|--------------|--------------|------------|------------|-----------|------------------|------------------|------------------|------------------|-------------------|-------------------|------------------------|-------------------------------------|
| Claude 3.7                | 710       | 1-1          | 64.2         | 256        | 130        | 20:36     | 95               | 27               | 110              | 29               | 35         | 25                | 0                  | [37]                                   |
| Claude 3.7 thinking       | -         | -            | -            | 256        | 114        | >200      | -                | -                | -                | -                | -                 | -                 | 1 (2)                  | [16,38]              |
| Claude 3.5 haiku          | 140       | 1-1          | 76.4         | -          | -          | -         | 90               | 25               | 92               | 25               | -                 | -                 | -                  |     -     |
| GPT-4.5        | 160       | 1-1          | 62.8         | 34         | 34         | 8:25      | -                | -                | -                | -                | -                 | -                 | -                      | -                                   |
| GPT 4o                    | 560       | 1-1          | 58.6         | 16         | 21         | 1:17      | 54               | 19               | 56               | 20               | -                 | -                 | 0 (0)                 | [113]             |
| Gemini 2.0 flash          | 320       | 1-1          | 51.8         | 128        | 111        | 18:43     | 82               | 23               | 87               | 24               | -                 | -                 | -                      | -                                   |
| Gemini 2.0 flash thinking | -         | -            | -            | 128        | 132        | >100      | -                | -                | -                | -                | 18           | 25                | 0 (0)                 | [17]                      |
| Deepseek-R1               | -         | -            | -            | -          | -          | -         | -                | -                | -                | -                | 91       | 25                | 1 (1)                  | [17, 39]          |
| o1                        | -         | -            | -            | 256        | 116        | >200      | -                | -                | -                | -                | 97         | 25                | -                      | -                                   |
| o3-mini-medium            | -         | -            | -            | -          | -          | -         | -                | -                | -                | -                | 90                | 25                | 2 (3)                  | [20, 51, 70, 91] |


![hidetable](placeholder.jpg "Table 2: Models rankings across different games.")

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
