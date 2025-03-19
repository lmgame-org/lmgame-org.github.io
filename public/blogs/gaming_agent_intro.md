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

![Mechanical Tic-Tac-Toe](xxx.png "Figure 1: ...")


### Games as Foundation Model Testbeds in Years to Come

Recently, it has be shown that integrating reinforcement learning (RL) can further enhance foundation models' reasoning abilities in tasks like math and coding. Increasing evidence suggest that training these models with even simple RL algorithms can yield robust search capabilities, a feature that is crucial for interacting with complex environments. This capability becomes especially significant in evaluation scenarios, where gaming platforms are frequently used as standardized testbeds for performance.

These developments highlight a synergistic relationship between foundation models and RL, paving the way for more sophisticated and adaptable AI systems capable of complex reasoning and interaction.

![Large model Gaming](xxx.png "Figure 2: ...")


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

Previous research on using games for evaluations has explored various methods for assessing LLM capabilities through game environments, examples include GameBench and SmartPlay. Due to limitations in contemporary LLMs, such as insufficient visual understanding, these studies have often adapted game mechanics specifically for LLM evaluations. For instance, in SmartPlay, the Minecraft benchmark is simplified to focus on a limited set of creative tasks, primarily aimed at identifying specific biomes in Minecraft.

But in reality, most games are designed to challenge human perception, reaction, and intelligence, yet there misses a benchmark that evaluate AI models under the same conditions of intelligence and environmental interaction as humans. In this blog, we investigate foundation models' performance across a range of game settings, including their unaltered versions, and assess how the outcomes reflect their underlying capabilities.


### Integaring Foundating Models with Gaming Agents

...


| **Game**    | **Capabilities**             |
|:------------:|:------------------------------------------------------------------------------:|
| Super Mario Bros  | Latency, Spatial reasoning  |
| Tetris     | Latency, Long-horizon planning, Spatial reasoning |
| Sokoban  | Long-horizon planning, Spatial reasoning  |
| ...  | ...  |

![hidetable](placeholder.jpg "Table 1: ...")

---

## Results

### Rankings

...

![User Test](xxx.png "Figure 7: ...")


---

## Research and Open-sourced Commitments

We also invite you to try out [our codebase](https://github.com/lmgame-org/GamingAgent) and build your own gaming agents!


---

## Acknowledgement

...

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
