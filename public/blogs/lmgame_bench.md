# Lmgame-Bench: How Good are LLMs at Playing Games?

> Author: Game Arena Team

> Date: June 6, 2025

> TL;DR: We introduce lmgame-bench that evaluates latest large (vision) language models (LLMs/VLMs) with video games. We share our intial benchmarking results and rankings of the latest models on a diverse suite of video games in both agentic and non-agentic settings. In addition, this blog also goes over challenges encountered in evaluating LLMs with games and our solutions.

<br>

[gamingAgent](https://github.com/lmgame-org/GamingAgent) | [leaderboard](https://huggingface.co/spaces/lmgame/lmgame_bench) | [Discord](https://discord.gg/YYjVCVAbQd) | [Gallery](https://www.youtube.com/@large-model-game)

## Introduction

How human babies play games.

As natively trained agentic LLMs/VLMs and increasingly sophisticated agentic workflows continue to advance in handling complex interactive tasks, gaming environments have emerged as very valuable testbeds for evaluation and development. Thousands of popular video games offer rich, meticulously crafted mechanics and reward systems, making them excellent environments for evaluating and training agentic reasoning models.

However, putting LLMs/VLMs in games shows even top reasoning models of today are not good game players. It turns out they suffer from brittle vision perception, poor long-horizon planning and spatial reasoning. In many cases, model gaming performance is barely comparable with than random action-taking baselines. In the example provided in Table 1, Only four models (bolded) perform better than random baseline in both games. 

In this blog, we introduce lmgame-bench that is desigend for drawing more meaning comparisons among models with games.


| Model                                     |2048   | Candy Crush | 
|-------------------------------------------|-------|-------------|
| Random                                    | 100.4 | 116.5       |
| **deepseek-R1-0528 (T)**                  | 105.2 | 447.3       |
| **grok-3-mini-beta (T)**                  | 118.6 | 254.0       |
| **gemini-2.5-pro-preview-05-06 (T)**      | 120.5 | 177.3       |
| **claude-3-7-sonnet-20250219 (T)**        | 114.2 | 126.3       |
| o4-mini-2025-04-16                        | 97.6  | 110.7       |
| o3-2025-04-16 *                           | 128.2 | 106.0       |
| gemini-2.5-flash-preview-04-17 (T)        | 107.4 | 97.7        |
| o1-2024-12-17 *                           | 128.1 | 90.0        |

![hidetable](placeholder.jpg "Table 1: Top reasoning models ranking on Candy Crush and 2048.")

---

## Single-Model Leaderboard

We present our full leaderboard in this [link](https://huggingface.co/spaces/lmgame/lmgame_bench) over 6 diverse video games: Super Mario Bros, Tetris, Sokoban, Candy Crush, 2048 and Ace Attorney. The game genres span from visual novel, spatial reasoning, long-horizon planning to pattern matching. For the leading models, we summarize their scores and ranking in the following table.

| Model                                     | SMB     | Sokoban | 2048  | Candy Crush | Tetris | Ace Attorney |
|-------------------------------------------|---------|---------|-------|-------------|--------|--------------|
| Random                                    | 987.0   | 0.0     | 100.4 | 116.5       | 10.2   | 0.0          |
| claude-3-5-sonnet-20241023                | 1540.0  | 0.0     | 57.8  | 17.0        | 12.3   | 1.0          |
| claude-3-7-sonnet-20250219 (T)            | 1430.0  | 0.0     | 114.2 | 126.3       | 13.0   | 3.0          |
| deepseek-R1-0528 (T)                      | N/A     | N/A     | 105.2 | 447.3       | N/A    | N/A          |
| gemini-2.5-flash-preview-04-17 (T)        | 1540.7  | 0.0     | 107.4 | 97.7        | 19.0   | 1.0          |
| gemini-2.5-pro-preview-05-06 (T)          | 1025.3  | 1.0     | 120.5 | 177.3       | 12.3   | 8.0          |
| gpt-4.1-2025-04-14                        | 1991.3  | 0.0     | 94.5  | 101.0       | 13.0   | 0.0          |
| gpt-4o-2024-11-20                         | 1028.3  | 0.0     | 70.4  | 59.0        | 14.7   | 0.0          |
| grok-3-mini-beta (T)                      | N/A     | N/A     | 118.6 | 254.0       | 21.3   | 0.0          |
| llama-4-maverick-17b-128e-instruct-fp8    | 786.0   | 0.0     | 44.6  | 32.3        | 11.7   | 0.0          |
| o1-2024-12-17 *                           | 1434.0  | 0.0     | 128.1 | 90.0        | 13.0   | 3.0          |
| o3-2025-04-16 *                           | 1955.0  | 2.0     | 128.2 | 106.0       | 31.0   | 8.0          |
| o4-mini-2025-04-16                        | 1348.3  | 1.3     | 97.6  | 110.7       | 15.0   | 2.0          |

![hidetable](placeholder.jpg "Table 2: Model performance in non-agentic settings.")


## Agentic Leaderboard



| Model                                     | SMB     | Sokoban | 2048  | Candy Crush | Tetris  | Ace Attorney |
|-------------------------------------------|---------|---------|-------|-------------|---------|--------------|
| Random                                    | 986.97  | 0       | 100.4 | 116.5       | 10.2    | 0            |
| claude-3-5-sonnet-20241023                | 1267.7  | 0       | 108.2 | 106         | 14.7    | 2            |
| claude-3-7-sonnet-20250219 (T)            | 1418.7  | 2.33    | 113.3 | 484         | 16.3    | 7            |
| deepseek-R1-0528 (T)                      | N/A     | 1.33    | 105.2 | 447.3       | 14.3    | 0            |
| gemini-2.5-flash-preview-04-17 (T)        | 1385    | 1.67    | 106.6 | 334.7       | 16.3    | 4            |
| gemini-2.5-pro-preview-05-06 (T)          | 1498.3  | 4.33    | 117.3 | 416.3       | 23.3    | 7            |
| gpt-4.1-2025-04-14                        | 2126.3  | 0       | 105.7 | 182         | 13.7    | 2            |
| gpt-4o-2024-11-20                         | 2047.3  | 0       | 106.7 | 147.3       | 14      | 0            |
| grok-3-mini-beta (T)                      | N/A     | 5.67    | 118.6 | 254         | 21.3    | 0            |
| llama-4-maverick-17b-128e-instruct-fp8    | 1468.7  | 0       | 106   | 128.7       | 10.3    | 0            |
| o1-2024-12-17 *                           | 855     | 2.33    | 128.9 | 159         | 35      | 16           |
| o3-2025-04-16 *                           | 3445    | 8       | 128   | 647         | 42      | 16           |
| o4-mini-2025-04-16                        | 1448    | 5.33    | 120.6 | 487.3       | 25.3    | 4            |

![hidetable](placeholder.jpg "Table 3: Model performance in agentic settings.")

---

## Evaluation



### Game State Representations and Actions 



### Evaluation Metrics

Sokoban: Total number of boxes pushed onto targets, summed over all levels, until the first deadlock.

Super Mario Bros.: Cumulative horizontal distance traveled by Mario (in game units) across all levels, until all three lives are lost or the final level is completed.

Tetris: Total pieces dropped plus total lines cleared, measured up to the point of game over.

2048: Sum of all merged tile values (e.g.\ merging two 2’s yields +4), recorded until the board stagnates (no merges or moves that change the board for ten consecutive turns). We then report their total scores.
Candy Crush: Total number of candies eliminated over a fixed 50–move session.

Ace Attorney: Total count of correct actions (evidence submissions, dialogue choices, etc.) across all case levels, measured until five incorrect decisions (lives) have been used.

---

## Last Few Words

Recent studies have shown that integrating reinforcement learning (RL) can enhance LLMs' reasoning abilities in tasks like math and coding. Evidence suggests that even simple RL algorithms can improve planning and decision-making, a capability that becomes particularly significant when interacting with complex environments. These developments highlight how game environments can serve as effective benchmarks for evaluating LLMs, especially in reasoning and decision-making tasks.

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
article{hu2025lmgame,
  title={lmgame-Bench: How Good are LLMs at Playing Games?},
  author={Hu, Lanxiang and Huo, Mingjia and Zhang, Yuxuan and Yu, Haoyang and Xing, Eric P and Stoica, Ion and Rosing, Tajana and Jin, Haojian and Zhang, Hao},
  journal={arXiv preprint arXiv:2505.15146},
  year={2025}
}
```
