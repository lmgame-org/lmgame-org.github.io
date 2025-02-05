# GameArena: Evaluating LLM Reasoning through Live Computer Games

[paper](https://arxiv.org/abs/2412.06394) | [lmgame-org](https://github.com/lmgame-org)

"Imagine the gods are playing a great game like chess, and you don’t know the rules. You’re allowed to observe the board occasionally, trying to deduce the rules of the pieces moving... Later on you might discover the law for the bishop is that it moves on a diagonal, which would explain the law that you understood before, that it maintains its color."

This analogy, drawn by the renowned physicist, Richard Feynman in his 1983 “Fun to Imagine” TV Series, likened understanding physics to learning the rules of playing a chess game solely by observation. It illustrates how the greatest scientists uncover the laws of nature: by observing patterns and inducting the underlying principles.

Forty years later, with the advent of modern AI, state-of-the-art large language models (LLMs) now show the potential to revolutionize scientific exploration. The power of inductive reasoning passes down from brilliant human minds to AIs.

Given the parallels between the reasoning involved in games and science, an interesting question arises: can games serve as a medium to evaluate AI's capabilities and potential? In this blog, we present a game we’ve developed over the past few months for both entertainment and evaluation, along with the techniques we used to achieve the evaluation goal.

![Game intro illustration](taboo_example.png "Figure 1: the Taboo reasoning challenge in our Roblox game: AI Space Escape. The project is designed to permit live computer gaming while evaluating SOTA AI models.")

## AI Space Escape

With the proliferation of static math and coding benchmarks, significant improvements in AI capabilities are being rigorously evaluated, yet that’s only part of the picture. Inspired by the potential of games to showcase reasoning capabilities, our team set out to evaluate how state-of-the-art AI models perform in tasks requiring interactive and strategic thinking. Unlike traditional static benchmarks, a great variety of reasoning tasks in real life require back-and-forth interactions and flexible problem-solving paths, which games naturally provide. We’re particularly interested in how different models compare in the context of a real game.

Our exploration of these research questions led to the development of our first game. The game is set in a space expedition where humans need to work closely with AIs. After months of dedication and hard work from our incredible team, we are thrilled to announce that **AI Space Escape** is now live on [Roblox](https://www.roblox.com/share?code=ca3442c9a6dcb547ae6c70968ec2ecab&type=ExperienceDetails&stamp=1732088094496)!

### Background Story

In **AI Space Escape**, you are part of a colonization mission to a habitable planet in Proxima Centauri in the year 2075. You’ve spent most of the 4.2-light-year journey in hibernation after being placed in a cryogenic pod. One day, you awaken to find the spaceship in emergency lockdown, with the self-destruction sequence already initiated.

Your mission is clear: collaborate with or outsmart AIs in various settings to reach the escape pod before time runs out. Through interactive puzzle-solving in “reasoning games” with AIs, you must demonstrate logical thinking and resourcefulness under pressure.

### Reasoning Games

To evaluate the AI’s reasoning abilities and to provide an exciting gameplay experience, we designed three key “mini reasoning games.” Each game tests an LLM’s capacity to connect context across multiple turns:

- **AI Akinator Game:** In this game, some AI guards have lost access to door passwords due to system failures. Your task is to help them deduce the password by answering a series of "YES" or "NO" questions, to avoid any suspicious behavior that could escalate the lockdown to critical levels. The LLM must synthesize information across multiple rounds to efficiently narrow down possibilities.

- **AI Taboo Game:** In some rooms, you can hack into systems to get passwords. But the doors require a voice check. The human player’s task is to outsmart the AI guards by cleverly steering the conversation to make them reveal the password without catching on. The LLM must infer the target word from incomplete clues and connect information from multiple prompts while maintaining conversational flow.

- **AI Bluffing Game:** System failures have erased your identity from certain AI robots. Convince them of your legitimacy by presenting on-record achievements and skills. The LLM asks up to five questions before it makes a decision.

### Get Started

We invite you to join and discover the cause of the threat to the spaceship. You will also explore a variety of adventure experiences throughout its many rooms. Start the adventure now! 🚀🌌  

[AI Space Escape on Roblox](https://www.roblox.com/share?code=ca3442c9a6dcb547ae6c70968ec2ecab&type=ExperienceDetails&stamp=1732088094496)


---

## LLM Evaluation

### Motivation

Beyond the fun, each game session provides valuable human-contributed feedback for the LLMs to form their in-game reasoning trajectories. This gaming data proves to be incredibly effective for evaluating LLMs. But before diving into how we conduct evaluations, you might wonder: **why is LLM evaluation so important?**

![Ranking eval illustration](eval_ranking.jpg "Figure 2: Chatbot Arena Ranking from LMSYS as of Feb the 5th, 2025 ([image source](https://informationisbeautiful.net/visualizations/the-rise-of-generative-ai-large-language-models-llms-like-chatgpt/)).")

LLMs are evolving rapidly, becoming increasingly powerful and often matching or even surpassing human performance in certain tasks, which necessitates continuous quantification of performance deltas.

Moreover, beyond their use in chat applications, LLMs hold immense potential for improving math/coding problem-solving capability and even facilitating scientific discovery, broadening their impact across diverse domains. This growing potential underscores the urgent need for a robust reasoning benchmark capable of effectively ranking and evaluating next-generation models.

### Limitations of Existing Benchmarks

Static evaluations, such as MMLU, Spider, and HumanEval, offer capability-specific assessments but rely on less intuitive metrics like F1, BLEU, and ROUGE. Additionally, their static nature makes benchmarks easier to exploit, as seen with MT-Bench. In contrast, dynamic evaluations like Chatbot Arena provide more intuitive metrics, such as win rates or Elo scores, and are harder to manipulate. However, they suffer from a low feedback rate (around 4% for Chatbot Arena) and the coupling of multiple capabilities within Elo scores, which limits their granularity in assessing specific skills.

### Gaming Data — Retrospective Analysis

To assess reasoning capabilities and reveal hidden chain-of-thought processes, we retrospectively analyze game session chat histories. By reenacting game trajectories with identical prompts, history, and parameters, we prompt models to generate intermediate outputs for quantitative and qualitative evaluation.

For instance, in the Akinator game, retrospective analysis evaluates the model’s multi-hop and deductive reasoning by prompting it to generate ranked lists of possible objects after each question-answer round. These lists reflect the model’s reasoning process, prioritizing likely candidates. For each session, we examine the rankings to determine if the secret object is correctly identified and its position in the lists.

### Gaming Data — Evaluation Metrics

To evaluate LLM reasoning through interactive games, we rank each LLM’s performance in each game according to the following metrics from gaming data:

- **Outcome metrics:** We compute win rate and average rounds across all game sessions. These metrics are most useful in games where winning rate and number of game rounds have strong correlations with model capabilities.

- **Procedural metrics:** We record and analyze the LLM's reasoning trajectories collected from retrospective analysis for each game. We design game-specific metrics to mirror and assess specific reasoning capabilities.

![Procedural metrics analysis](procedural_metrics.png "Figure 3: Procedural metrics for each game, and the reasoning capabilities involved.")

Here is a specific example of how procedural metrics are calculated and used:

- In the Akinator game, we compute procedural metrics such as recall rates, the average round of first appearance, the final rank of the target secret word, and the disparity ratio (information balance) of the candidate secret word lists.

- The **average first appearance** and **final rank** reflect the model's deductive reasoning ability to efficiently identify the target word.

- The **top-k recall rate** and **disparity ratio** evaluate the model's multi-hop reasoning skills, testing its capacity to leverage information from previous rounds and systematically narrow down potential choices.


---

## Results

### Rankings

#### Gaming Data Metrics

Our evaluation results show the following findings:

- GameArena’s ranking aligns with other static reasoning benchmarks (LiveBench-Reasoning, GPQA).

- GameArena’s ranking is weakly correlated with Chatbot Arena.

- Models with strong reasoning capabilities and multi-turn instruction-following capabilities, such as **claude-3.5-sonnet** and **GPT-4o**, are ranked high in GameArena.

- Models that excel at short conversations but with poor reasoning in extended game sessions, such as **Mistral-Large-2**, usually rank low in GameArena.

![Ranking Chart Placeholder](ranking_placeholder_september.png "Figure 4: GameArena Rankings as of September 2024.")

### User Tests

We conducted a user study to compare the user experience and willingness to participate from over 2000 gaming sessions in GameArena and the same number of conversation sessions in Chatbot Arena:

- Over 70% of users liked the games in GameArena, compared to only 45% who enjoyed voting in Chatbot Arena.

- Over 80% of participants reported satisfaction with gameplay experience in GameArena, compared to less than 40% of users who felt satisfied with Chatbot Arena.

- We found that about 87% of the gaming sessions from GameArena were complete and useful, while only 4% of total conversations in Chatbot Arena provided meaningful votes (due to its reliance on voluntary participation).

![User Test](user_test.png "Figure 5: User test results.")


---

## Research and Open-sourced Commitments

Please see [our paper](https://arxiv.org/pdf/2412.06394) for more details. Check out our [Hugging Face repository](#) (link placeholder) where you can find our gaming data and script for exploratory data analysis.

We also invite you to try out [our codebase](https://github.com/lmgame-org) to build your own games!


---

## Acknowledgement

We would like to thank Yonghao Zhuang, Xin (Kris) Gao, Yinmin Zhong, Yao Fu, Anastasios Angelopoulos, Roger Wang for providing insightful feedbacks.

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
