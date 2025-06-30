# From Pokémon Red to Standardized Game-as-an-Eval
 
> Author: Lmgame Team

> Date: June 27, 2025

> TL;DR: Pokémon is increasingly used to evaluate modern large language models, but current practices lack standardization, and depend heavily on game-specific harness. The Pokémon Red involves three major tasks—navigation, combat control and training a competitive Pokémon team. We find they come with limitations: navigation tasks are too hard, combat control is too simple, and Pokémon training is too expensive. We address these issues in Lmgame Bench, a new framework offering standardized evaluations and initial results across diverse games.

<div style="font-size:18px; text-align:left; letter-spacing:1px;">
  <a href="https://arxiv.org/pdf/2505.15146">Paper</a>
  <span style="margin: 0 12px;"></span>
  <a href="https://github.com/lmgame-org/GamingAgent">GamingAgent</a>
  <span style="margin: 0 12px;"></span>
  <a href="https://huggingface.co/spaces/lmgame/lmgame_bench">Leaderboard</a>
  <span style="margin: 0 12px;"></span>
  <a href="https://discord.gg/YYjVCVAbQd">Discord</a>
  <span style="margin: 0 12px;"></span>
  <a href="https://www.youtube.com/@large-model-game">Gallery</a>
</div>

 
Pokémon Red holds a special place in the childhood memories of an entire generation. Its simple controls and richly diverse Pokémon make it approachable even for young children, who can quickly make meaningful progress. However, cracking the game is non-trivial; it requires ahead-of-time planning and dozens of hours of effort to raise a competitive Pokémon team.

![side-by-side-scaffolds](04_side_by_side_scaffolds.png "Figure 1: Perception scaffolding implementations for Claude (left) and Gemini (right) with [different levels of details](https://www.lesswrong.com/posts/7mqp8uRnnPdbBzJZE/is-gemini-now-better-than-claude-at-pokemon).")

Recently, a new generation of advanced AI models is being tested on how well they can play [Pokémon Red](https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Red_and_Blue_Versions), but each uses slightly different setups. Anthropic gives the model navigation and game state memory reading tools. It played several gym battles and took around 35,000 in-game actions to reach the [Surge Gym Leader](https://pokemon.fandom.com/wiki/Lt._Surge), but didn't detail exactly what counts as an "action" or how many retries were allowed (Figure 1, left). Google’s Gemini 2.5 Pro reportedly finished [Pokémon Blue](https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Red_and_Blue_Versions) (and earned its 5th badge in Red) according to [a developer livestream supported by Google](https://x.com/OfficialLoganK/status/1913365614397182096). However, it relied on extra scaffolding code to extract more comprehensive textual representations of game states and guide decisions (Figure 1, right), so Claude vs. Gemini is not an apple-to-apple comparison.

Given how popular Pokémon Red has become as a way to test new AI models, it’s worth asking: is this game really a good way to evaluation for latest models? In this blog, we look at how Pokémon Red works as a benchmark in a standardized setting. We identify three key tasks involved in the game. Within our budget, our case studies show Pokémon Red as an eval involves at least three challenges:

- Navigation tasks are so hard that it becomes a gaming harness evaluation.
- Combat control by itself with sufficiently capable Pokémon is too easy. 
- Pokémon training as an eval is too costly. 

We find most of these challenges are largely addressable, and game as an eval remain a rich resource. To address these limitations, we introduce Lmgame Bench: a standardized framework that carefully selects a range of moderately challenging games, and offers varying degrees of gaming harness for model evaluation.

---

## Pokémon Red as an Eval

The Pokémon game comprises multiple long-horizon tasks. As highlighted in the [Gemini 2.5 technical report](https://storage.googleapis.com/deepmind-media/gemini/gemini_v2_5_report.pdf), these challenges include training a team to defeat powerful Gym Leaders and [the Elite Four](https://pokemon.fandom.com/wiki/Elite_Four), acquiring hidden moves (special abilities) necessary for progression, navigating [the Safari Zone](https://pokemon.fandom.com/wiki/Safari_Zone), and locating keys within multi-level dungeons.

Due to the substantial time investment required to run the full Pokémon game as reported in [Julian Bradshaw's Blog](https://www.lesswrong.com/posts/7mqp8uRnnPdbBzJZE/is-gemini-now-better-than-claude-at-pokemon#fnpo3z01lbur), which amounts to over 500 hours just to acquire the 5th badge—and incurs a four-digit API cost by our estimate—we instead focus our evaluation on a targeted subset of tasks that capture the game’s key gameplay elements. In our setup, we focus our evaluation to a targeted subset of tasks that capture key gameplay elements. Gameplay in Pokémon Red can be broadly categorized into control types: **navigation** and **combat**. Additionally, we include a cost analysis to estimate the cost-effectiveness of **Pokémon-training as an eval**. In total, we provide 3 case studies: navigation, combat control, and long-term planning for building and training a team in the early stage of the game.


### Navigation: Too Hard

The navigation tasks in Pokémon games range in difficulty, from simple routine movements—like visiting the [Pokémon Center](https://pokemon.fandom.com/wiki/Pok%C3%A9mon_Center) or heading to the local Gym—to more intricate mazes and Sokoban-style puzzles, such as the [Viridian Forest maze](https://bulbapedia.bulbagarden.net/wiki/Viridian_Forest) and [Strength boulder puzzles](https://pokemon.fandom.com/wiki/Tanoby_Key), all integrated into the game’s linear progression.

In our case study, we first evaluated Gemini-2.5-flash in the Viridian Forest maze without any navigation harness. As a result, we observed that Gemini-2.5-flash wandered aimlessly for 5000 actions in this maze and finally became stuck at the right corner of Viridian Forest. 

To analyze the reason behind this failure, we designed a simpler navigation task by placing the models in the very first room, where they only needed to navigate to the warp tile to exit. Surprisingly, without any harness, even top models like Gemini-2.5-pro mistook a potted plant for a staircase and repeatedly attempted to 'descend' into it (Video 1).

<iframe width="850" height="500" src="https://www.youtube.com/embed/KSoBNEyPSck" frameborder="0" allowfullscreen></iframe>

![hidetable](placeholder.jpg "Video 1: Gemini-2.5-Flash finds staircases to navigate through a multi-story house with image annotations (left). Without image annotations, it misidentifies potted plant as a staircase.")

After reviewing Joel Z.’s [navigation harness implementation](https://www.reddit.com/r/ClaudePlaysPokemon/comments/1jnq422/comment/mnn5sti/) from [Gemini 2.5 technical reports](https://storage.googleapis.com/deepmind-media/gemini/gemini_v2_5_report.pdf), we observed that he uses detailed image scaffolding to annotate each tile with its coordinates, walkability, and label (e.g., “warp”), effectively bypassing the need for VLMs to visually recognize in-game objects on their own. To help the model make progress and avoid lingering in the same area, he also prompts the model to leverage a tracking map that records visited tiles and guides exploration of unvisited regions.

This reveals the importance of a powerful navigation harness.  In [our implementation](https://github.com/lmgame-org/GamingAgent/blob/main/gamingagent/envs/custom_06_pokemon_red/pokemonRedEnv.py) inspired by [this open-source scaffolding idea](https://github.com/cicero225/llm_pokemon_scaffold), we applied a similar approach by scaffolding the image with a 9 × 10 grid and annotating each tile with its coordinates, walkability, and visitation status. Additionally, we maintained an internal tracking map that continuously updates to record all visited tiles. We then tested Gemini-2.5-flash again and found that, with a strong navigation harness, it executed approximately 1,300 actions, fully explored all previously unvisited areas of the Viridian Forest, and ultimately discovered the exit path as shown in Video 2.


<iframe width="850" height="500" src="https://www.youtube.com/embed/SrIb-qwEReI" frameborder="0" allowfullscreen></iframe>

![hidetable](placeholder.jpg "Video 2: Gemini-2.5-Flash successfully exits Viridian Forest with navigation harness support (up). It gets stuck without navigation support (down).")

Compared with the performance without any harness, this large performance gap implies that the navigation task heavily relies on an effective harness design. The overall navigation performance tends to reflect the quality of the image scaffolding and tracking map rather than the model’s inherent capabilities. Considering time and cost constraints, we did not extend our experiments to more complex navigation challenges such as the Safari Zone. However, our preliminary case study provides insight into how a fully developed navigation harness could significantly influence model performance. In this context, the Pokémon evaluation primarily measures the effectiveness of the navigation harness rather than the model’s capabilities.

### Pokémon Combat: Too Easy

The original Pokémon Red game only supports Player-versus-Computer (PvC) battles. In this setting, players are able to train teams that can become significantly stronger than the opposition, including wild Pokémon, standard trainers, Gym leaders, and the “Elite Four”. This fundamental difference means that the challenges and strategies involved in each environment are not directly comparable. Ultimately, a team's level and capabilities become the most important factors in determining the outcome of battles.

![over_leveling](04_elite_four_over_leveling.png "Figure 2: A battle snapshot from an Elite Four playthrough in [Pokémon Sapphire](https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Ruby_and_Sapphire_Versions), where players can train their Pokémon to much higher levels than those used by NPC trainers. For example, a level-76 [Tentacruel](https://pokemondb.net/pokedex/tentacruel) can easily defeat a level-48 [Sharpedo](https://pokemondb.net/pokedex/sharpedo).")

In our case study, we put Gemini-2.5-flash in the first trainer Gym for the [Boulder Badge](https://pokemon.fandom.com/wiki/Boulder_Badge). We find that unlike navigation tasks, without providing the model with any further knowledge augmentation and tools, they can both defeat the Gym leader even with competent Pokémon (even at lower levels). We can imagine a player’s Pokémon are significantly over-leveled—often the result of extended training—the advantage in combat becomes overwhelming. Our results demonstrate that Pokémon level and type matchups are by far the dominant factors in battle outcomes; strategy plays only a secondary role.

![boulder_badge](04_gym_1_without_harness_success.png "Figure 3: Gemini 2.5-flash wins Boulder Badge without the need for a gaming harness.")

### Pokémon-Training As an Eval: Too Costly

Pokémon Red is a rich test of long-horizon reasoning for Pokémon training, but it is slow, and expensive. Even an “early-game” run (just reaching [Professor Oak’s lab](https://bulbapedia.bulbagarden.net/wiki/Professor_Oak%27s_Laboratory)) can run into triple-digit dollar costs. Table 1 is a breakdown of why this benchmark is so costly and why it ends up being more of a luxury showcase than a practical eval.

| Model                  |    Steps to reach Oak’s Lab     |       Cost    |       Time    |
|-------------------------|----------------------------------------|---------------|----------------|
|  OpenAI o3           |                  1000                   |     $120     |       20h       |
| Gemini 2.5 Flash  |                     1000                   |      $50       |      13h       |

![hidetable](placeholder.jpg "Table 1: Evaluation Cost for o3 and Gemini-2.5-Flash for the first 1k steps.")

Gemini 2.5 report shows the model needing roughly **35,000** actions for a complete gamerun. Assume o3 and Gemini-2.5 takes roughly the same number of actions, an **o3** play-through would cost about **$120 × 35 ≈ $4.2k**, and **Gemini 2.5 Flash** roughly **$50 × 35 ≈ $1.75k**. Such costs are conservative estimates, since it requires enterprise-level harness and  less-capable models usually take even more steps. The time cost is just as steep as the dollar cost. Claude 3.7 took about 35 000 controller actions, almost a week of wall-clock time, to clear three gyms.

Gemini 2.5 Pro, outpaced Claude but only with heavy memory-inspection scaffolding, shifting cost rather than reducing it. For example, toward the later stage of the game, Gemini 2.5 Pro spent over 24 hours leveling up a [Pikachu](https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)) and a [Bellsprout](https://bulbapedia.bulbagarden.net/wiki/Bellsprout_(Pok%C3%A9mon)) (both super-effective against Water types) by around 25 levels in total to successfully defeat Misty from one of the trainer’s Gym.

---

## Lmgame Bench

Because of navigation tasks are too hard and combat control is easy, Pokémon gameplay ends up serving primarily as a test of the underlying navigation gaming harness, rather than a true measure of the model’s reasoning abilities. 

To better distinguish model capabilities even without custom gaming scaffolds, we introduce Lmgame Bench: a curated suite of moderately challenging video games paired with modular, easy-to-integrate gaming harnesses. Our benchmark aims to unleash the potential of game as an eval by providing standardized settings for meaningful model evalution rather than harness evaluation.

### Game Choice

To address these issues, we have been meticulous in selecting a diverse set of games with moderate difficulty levels. The game choices and metrics designs allow us to distinguish models, even in the absence of extensive harnessing.

**Sokoban**: scores are calculated as the total number of boxes pushed onto targets, summed over all levels from very simple to the hardest level in Sokoban 1989, until the first deadlock.

**Super Mario Bros**: scores are cumulative horizontal distance traveled by Mario (in game units) across all levels, until all three lives are lost or the final level is completed. Models with stronger physical intuition and spatial reasoning tend to achieve higher scores.

**Tetris**: scores are total pieces registered plus total lines cleared (with a x10 multiplicity), measured up to the point of game over.Different models sustain play for varying durations, depending on their ability to efficiently accommodate incoming tetrominoes. For example, o3-pro consistently maintains gameplay by effectively clearing more than 10 lines.

**2048**: Sum of all merged tile values (e.g. merging two 2’s yields +4), recorded until the board stagnates (no merges or moves that change the board for ten consecutive turns). We then report their total scores. Since the game can continue for more than 100k steps, it provides a strong basis for distinguishing model capabilities over long horizons.

**Candy Crush**: Total number of candies eliminated over a fixed 50–move session. While the game is relatively easy, it effectively differentiates between models based on their ability to optimize moves and clear candies.

**Ace Attorney**: Total count of correct actions (evidence submissions, dialogue choices, etc.) across all case levels, measured until five incorrect decisions (lives) have been used. This game evaluates models’ contextual understanding and deductive reasoning skills.

### Harness Design

Over the course of benchmark development, we observed that many models struggle with brittle visual understanding, leading to frequent misinterpretations of game states, and success in many games depends on effective memory mechanisms for long-horizon decision making.

As a result, in Lmgame Bench, we developed a modularized gaming harness that provides dedicated components for vision perception and memory. Each scaffold can be toggled to target specific LLM shortcomings, and additional modules can be integrated with minimal effort. All results will be synthesized by a reasoning module to generate a final action.

**Perception module**: converts raw game frames or UI elements into structured symbolic / textual state descriptions, reducing reliance on brittle vision. 

**Memory module**: stores recent states, actions, and reflection notes to shrink the action space and support long-horizon planning.

**Reasoning module**: synthesize information from all other modules and optionally turns on long chain-of-thought reasoning.

### Our Journey

The Lmgame project started out in March when we first launched a computer-use gaming agent to play Super Mario Bros, which was featured in [TechCrunch](https://techcrunch.com/2025/03/03/people-are-using-super-mario-to-benchmark-ai-now/). Evolved around community feedback, we quickly expanded the suite to six diverse games and developed a modular gaming harness. However, we soon discovered that benchmarking with computer-use agents had major drawbacks: every game requires unique computer-control actions (discrete or continuous), reliance on screenshot-based observations prone to perception errors, and unpredictable delays in latency-sensitive games all undermined consistency and comparability.

In the following month, we implemented a new standardized interface with Gym-style API. This paved the way for Lmgame Bench, an standardized evaluation framework, accompanied by a paper detailing our evaluation settings and what truly constitutes strong AI gaming performance. We also released [our leaderboard](https://huggingface.co/spaces/lmgame/lmgame_bench), which tracks performance in both agentic (with gaming harness) and non-agentic settings. Notably, the top rankings are held by o3, a model distinguished by its strong vision perception, spatial reasoning, and long-horizon planning abilities.

![gym_retro](04_gym_retro.png "Figure 4: Retro Games currently supported by Lmgame Bench and on our roadmap.")

Now with our [latest codebase](https://github.com/lmgame-org/GamingAgent), anyone can launch evaluations for any supported model-game combination with a single command. In addition to Pokémon Red, we’re expanding support to include classics like 1942 and Doom, with more on the horizon.


---

## Last Few Words

Recent studies have shown that integrating reinforcement learning (RL) can enhance LLMs' reasoning abilities in tasks like math and coding. Evidence suggests that even simple RL algorithms can improve planning and decision-making, a capability that becomes particularly significant when interacting with complex environments. These developments highlight how game environments can serve as effective benchmarks for evaluating LLMs, especially in reasoning and decision-making tasks.

Classic games are meticulously designed to challenge human minds. Skilled game designers have carefully engineered the difficulties through in-game metrics, such as points and levels, and relentlessly developed new types of games to challenge different aspects of human intelligence. 

We believe these game are invaluable yet underutilized resources for benchmarking AI. Since there are a large number of high-quality games, we envision a highly scalable path ahead for evaluations.

---

## Research and Open-sourced Commitments

We invite you to try out [our codebase](https://github.com/lmgame-org/GamingAgent) for model evaluations and build your own gaming agents! If you’re interested in the quantitative analysis and implications of strong gaming performance, be sure to check out [our paper](https://arxiv.org/pdf/2505.15146)!

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
