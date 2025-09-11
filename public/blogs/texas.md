# Multi-Agent Evaluation in Lmgame-Bench: Texas Hold’em Case Study

> Author: Lmgame Team

> Date: Aug 25, 2025

> TL;DR: We extend Lmgame-Bench to a multi-agent evaluation setting using Texas Hold’em. Built on PettingZoo and adapted to our harness, the environment lets LLMs face each other in imperfect-information play. We report tournament results across eight models, use TrueSkill2 for ranking, and analyze play patterns using Aggression Factor and Fold Frequency to characterize strategic tendencies. 

<div style="font-size:18px; text-align:left; letter-spacing:1px;">
  <a href="https://arxiv.org/pdf/2505.15146">Paper</a>
  <span style="margin: 0 12px;"></span>
  <a href="https://github.com/lmgame-org/GamingAgent?tab=readme-ov-file#lmgame-bench">Lmgame Bench</a>
  <span style="margin: 0 12px;"></span>
  <a href="https://huggingface.co/spaces/lmgame/lmgame_bench">Leaderboard</a>
  <span style="margin: 0 12px;"></span>
  <a href="https://discord.gg/YYjVCVAbQd">Discord</a>
  <span style="margin: 0 12px;"></span>
  <a href="https://www.youtube.com/@large-model-game">Gallery</a>
</div>

<div style="height:32px;"></div>

## 1. **Overview: Why Multi-Agent?**
Most benchmark tasks evaluate LLMs in a single-agent setting, where performance depends on solving puzzles or progressing in an environment under fixed rules. Multi-agent games are different: here, the opponent is not scripted but another intelligent agent. In this setting, there is no definitive way to gauge correctness—success is not about producing a single right answer, but about adapting to dynamic opponents, showing robustness, and exhibiting diverse strategies.
Among multi-agent games,  Texas Hold’em is particularly compelling. Unlike deterministic perfect-information games, poker introduces hidden information, betting strategies, and psychological pressure. It requires balancing risk and reward, making decisions under uncertainty, and sometimes bluffing to induce mistakes. These qualities make it a powerful probe for whether LLMs can display competitive and adaptive behavior.

![texasgameplay](07_texas_cover.gif "Figure 1: Example Texas Hold'em game play.")



## 2. **Setup**

### 2.1 Game Environment 
We adapt the PettingZoo Texas Hold’em environment on Lmgame Bench. Each model observes its private hole cards, the shared board state, stack sizes, pot size, and legal actions, then chooses from the four canonical moves: **fold, call, raise, or check.**

Our tournament format is a round-robin, with every model playing against every other model. Each head-to-head consists of 40 hands with equal stacks and fixed blinds. Matches are logged in detail, and videos are generated for post-game analysis. We support single-command launch of the tournament: 

```bash
python lmgame-bench/multi_agent_runner.py \
  --game_name texasholdem \
  --player_models claude-sonnet-4-20250514 grok-4-0709 deepseek-ai/DeepSeek-R1 kimi-k2-0711-preview \
  --harness --tournament_hands 40 --record_video true --no_strategy_prompts
```

### 2.2 Game Prompts
To test the impact of instruction framing, we designed three versions of prompts: 
- **V0 (Rules-Only Baseline)**: Provides only the formal game rules, with no strategic guidance, leaving the model to improvise its own playstyle.
- **V1 (Strategic Heuristics)**: Adds common poker principles such as position, pot odds, and stack management, steering models toward more disciplined, human-like reasoning.
- **V2 (Passive Bias)**: Frames play around “seeing more cards,” emphasizing checks, calls, and pot control. Despite the label of moderated aggression, this prompt often produces more cautious and passive decisions.

#### 2.2.1 DSPy Prompt Optimizer
We automate prompt iteration with a lightweight DSPy-based optimizer that automates prompt rewriting, evaluation, and selection. 

The system generates N variants of a chosen prompt section, preserving placeholders such as {textual_representation}. Each candidate is evaluated against the current baseline in controlled self-play, with the same model occupying both seats. To avoid positional bias, we run two mirrored tournaments: 
- Tournament 1: candidate vs. baseline (H hands)
- Tournament 2: baseline vs. candidate (H hands)

The score is the average chip differential across both seat orders, and the best performer is kept for the next generation.

Key knobs: --hands (more = stable), --num_variants, --generations, --dspy_model.
Outputs: candidates + results are saved in prompt_runs/, and the optimizer prints the best path.

This makes prompt optimization reproducible, model-stable, and faster than manual trial-and-error, helping us refine rule-only, strategic, and passive prompt families.


### 2.3 Ranking with TrueSkill2
To evaluate performance, we employ TrueSkill2, a Bayesian skill rating system originally developed for competitive gaming. Each model starts with a prior skill distribution **N(μ=25, σ≈8.333)**, the standard default where σ = μ/3, representing moderate initial uncertainty. Ratings are updated only once at the end of each tournament, not after every hand. This prevents excessive noise from the high variance of single-hand outcomes in poker. Evidence Model: Instead of binary win/loss, we order players by their final chip stacks. These are converted into weighted ranks, normalized by relative chip counts, and then passed into TrueSkill2’s update rule.

- μ (mu) reflects estimated skill; higher μ means stronger consistent play.
- σ (sigma) captures uncertainty in that estimate (lower = more confident), it shrinks as more tournaments are completed.

This approach ensures ratings are stable, sample-efficient, and sensitive to chip performance, rather than noisy hand-level variance.

### 2.4 Behavioral Metrics
We characterize each model’s play with two reproducible statistics: 
- **Aggression Factor (AF)** :`AF = (Bets + Raises) / Calls`   
    It measures how often a model chooses an aggressive action when it has the option to act. 
- **Fold Rate (FR)**: `FR = (# of folds) / (# of hands)`  
    It captures how cautiously a model plays.  

This metric highlights that quantitative success often correlates with balanced styles, while extreme tendencies (always folding or always over-raising) lead to lower performance.

### 2.5 Style Taxonomy
We classify models using FR (tight vs. loose) and AF (aggressive vs. passive). Thresholds are tunable; by default we use:
- Tight vs. Loose: tight if FR ≥ 0.72, else loose.  
- Aggressive vs. Passive: aggressive if AF ≥ 1, else passive.

This yields four canonical styles we report alongside TrueSkill2:
- **Tight-Aggressive (TAG):** high FR, high AF — selective entry, applies pressure when involved.  
- **Tight-Passive (TP):** high FR, low AF — selective entry, prefers checking/calling.  
- **Loose-Aggressive (LAG):** low FR, high AF — frequent entry, pushes edges across streets.  
- **Loose-Passive (LP):** low FR, low AF — frequent entry, rarely pressures opponents.


## 3. **Results & Insights**
### 3.1 Eight-Model Leaderboard (V1)
Using the **V1 (Strategic Heuristics) prompt**, we ran a **110-round** tournament across eight models. The final ranking (highest to lowest by posterior mean μ) was: 
```bash
o3 > grok-4 > kimi-k2 > gemini-2.5-pro > claude-4-sonnet > deepseek-r1 > o4-mini > gemini-2.5-flash
```
![8ranks](07_8model_ranks.png "Figure 2: Left — Bar chart of 8 model ranks. Right — Table with model, model name, μ (mean), and σ (uncertainty).")


### 3.2 Prompt Sensitivity (4 models × 3 prompts)

Our analysis reveals clear behavioral shifts across prompt designs. Models using the rules-only baseline (v0) clustered on the left side of the chart, displayed **loose-aggressive** tendencies, betting and raising frequently with minimal folding. However, the variance is quite large within v0, as different models drifted toward either extreme aggression or more cautious but inconsistent styles. 

Adding the strategy-focused prompt (v1), models shifted to the right cluster. Here, we observe more **tight-aggressive** behavior: folding more selectively, playing stronger ranges, and demonstrating steadier chip accumulation. 

By contrast, the passive prompt (v2) concentrated models in the bottom cluster, displayed **passive** tendencies. As expected, decisions became overly cautious — less betting, excessive checking, and a tendency to give up in marginal spots. This reduced risk-taking limited upside potential, producing consistent but weak chip betting outcomes.

![4models](07_4model_3prompt.png "Figure 3: Left — Scatter plot showing 4 models across 3 prompt versions (shape = prompt, color = model) with axes Aggression Factor (AF) vs Fold Rate. Right — Table summarizing each model’s AF, Fold Rate, and inferred player style.")



### 3.3 Takeaways:
Rather than fixed “personalities,” what we observe are better described as **stylistic priors or defaults**. Prompts exert strong control over model behavior, often shifting the same system between loose-aggressive, tight-aggressive, and loose-passive play. Yet these shifts are not uniform: certain models show consistent leanings that resurface whenever instructions are weaker or more ambiguous. For example, Grok-4-0709 remains biased toward loose-aggressive play, even under strategic prompts, while DeepSeek-R1 defaults to loose-passive unless guided by detailed heuristics. Claude and Kimi also gravitate toward loose-aggressive styles, though with more modulation. 
Overall, the three clusters in the figure illustrate how prompting acts as a control knob: v0 expands variance, v1 narrows play into disciplined aggression, and v2 compresses decisions into overly passive patterns.
## 4. **Conclusion**
Introducing multi-agent evaluation into Lmgame-Bench through Texas Hold’em opens a new dimension of LLM benchmarking: strategic behavior. By combining round-robin tournaments, **TrueSkill2 ranking**, and behavioral profiling with measures such as aggression and fold frequency, we obtain a fuller picture of how models compete, adapt, and expose their **latent strategy tendencies** under pressure. Future work could scale to larger multi-player tables, increase hand counts for stronger statistical confidence, and test whether models can adjust strategies dynamically in response to tight or aggressive opponents. In this way, poker serves not only as a benchmark for decision-making under uncertainty, but also as a lens for examining the hidden biases that shape large models in competitive, interactive settings.
Our code is now available in the main branch. https://github.com/lmgame-org/GamingAgent 

## **🏆 Upcoming Live Tournament** 
From **October 1–3**, we will host a **live multi-agent Texas Hold’em tournament** with all six models. Each model will begin with 300 chips per day, and the competition will run across three consecutive days. The event will provide quantitative rankings and reveal latent strategic tendencies in real time. We will release match updates, hand histories, and video highlights throughout.
