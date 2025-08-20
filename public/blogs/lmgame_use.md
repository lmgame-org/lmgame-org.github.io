# A Practical Guideline to Using Lmgame-Bench 

> Author: Lmgame Team

> Date: Aug 6, 2025

> TL;DR: This guideline contains a detailed overview of the repository setup of Lmgame-Bench as well as how to use it for evaluation as well as the integration of new games. It covers the process of evaluation in the single/multi-agent mode as well as the various LLMs that you can use. 

## Overview
LMGame-Bench is an end-to-end benchmarking suite that visualizes and measures LLM/VLM performances across interactive game environments. It evaluates model performance across vision and text modalities, supporting both agentic runs with harness and single-model runs without one. All evaluations can be launched with a single, one-line command.
Whether you are curious about how a single agent tackles a classical game like Tetris, or how two agents play side by side, we have both modes ready to go. We will take you through the high-level overview of the repository design as well as example commands you can try out for evaluation as well as integrating new games into the environment. Let’s get started. 

## Design Overview
![agent_env](05_agent_env.png "Figure 1: BaseAgent and Env interaction.")

At the heart of the repository design is the BaseAgent class and Env configuration. The BaseAgent class serves as the foundation for game-specific agents which inherit from it, and provides common functionalities like module management, caching, and workflow. The Env configuration stands for the game world that agents operate in. In other words, it is a gymnasium environment that encapsulates the game’s rules, the current state, and the mechanics of its progression, which you have to custom define for each of the games yourself by inheriting from gym.Env. This dual setup ensures a separation of concerns: the custom game agents defined from BaseAgent focus on strategic thinking, and the environment is responsible for the logic and the reward for the game as it progresses. The interaction between the two is cyclical: the environment presents its current state as observation to the agent, which then processes the information (with or without the help of the three different harnesses) and decides a chosen action. The environment then takes the action and updates its internal state and calculates the reward, which the agent can use to make its next round of decisions, mimicking the continuous loop of a human player interacting with a game. This modular design allows you to quickly swap between using different LLMs and configure various game-specific environment and agent behaviors, making the integration of new games flexible. In order to set up a new game, you simply have to define the new game-specific environment as well as the specific actions for the game agent, and you are good to go. 
## Episode
An episode represents the complete workflow of the agent and environment interaction for an entire game. In other words, it consists of each step of the agent’s action, the response from the environment, the agent’s next step, and so on and so forth until the game’s completion. 
Each episode begins with a call to the environment’s reset() method, which sets the game to its initial state. Then, the agent would take in the game state, and go through a series of internal processing in order to make an action through agent.get_action(). More specifically, if the harness mode is set to true, then the perception, memory, and reasoning modules would be activated to go through a series of steps of looking at the captured game image, storing the relevant information, and thinking about the best action to make next. This action is then sent through the env.step() function, where the environment is responsible for applying the action to the game world and updating its internal state according to the game rules, including the reward calculation. This observation and action cycle would continue until we encounter the termination flag (representing that the game has ended). All the game-specific information and the agent decision-making process is recorded within the cache directory, allowing you to refer back to the agent trajectory within the episode. 

## Single-Agent and Multi-Agent Evaluation Settings

There are two different modes for how you can launch the game, namely single agent playing the game, and multi-player (player 1 vs. player 2). To launch the game for a single agent, simply use the single_agent_runner.py script. To launch the game for two agents, use the multi_agent_runner.py script. The specific games that are supported for the two modes are mentioned in the Model Support section below. Below is an example of how to launch the scripts for the tic-tac-toe game. 


## EXAMPLE (text only)

Here is an example of playing the game of tic-tac-toe (for the text only version). Make sure you install all the dependencies as mentioned in the README, as well as import the necessary api keys for the proprietary models that we support, before performing the steps below.
In order to play in the single agent mode, you would use a single-line command inside the GamingAgent directory:
```bash
python lmgame-bench/single_agent_runner.py --game_name tictactoe --model_name gpt-4o --num_runs 1 --observation_mode text
```

Here is a more detailed description of what the command entails. The single_agent_runner.py script is being launched, and you need to specify the game name, such as tictactoe, as well as other helpful parameters like whether you want to use the harness mode (--harness), how many game runs you want, and the specific game mode (which in this case, is just text only). 

Once you do this, you will see the game state for each turn in the terminal with detailed information, such as the current game board state as follows:

```
  0 1 2
0 X O . 
1 . X . 
2 . O . 
```

Representing the different pieces on the board at the current moment. Additionally, the game-specific state as well as the agent's specific decision-making process is logged into the "cache" directory with the game name and the model name as the subdirectories, so that you can see the detailed summary of how the agent decides what moves it makes.
 
Similarly, for the multi-agent option for the game of tic-tac-toe, you would use a similar command inside the GamingAgent repository:
```bash
python lmgame-bench/multi_agent_runner.py --game_name tictactoe --model_x gemini-2.5-flash --model_o claude-3-5-sonnet-latest --num_runs 1 --observation_mode text
```

By running this command, you are using the multi_agent_runner.py script, and specifying the game. Additionally, you would choose which model would be player 1 (gemini-2.5-flash in this case) as well as model_o (claude-3-5-sonnet-latest). You would see similar information being logged on the terminal, but this time, since two agents are playing, you have to wait longer for each of the agents to make decisions. Additionally, each of these two player agents' decision-making process as well as the board state would be logged into a separate subdirectory structure similar to the one for the single-agent game, and you can see a graphical view of the board state under the observations directory as shown below. 

![tic_tac_toe](05_tic_tac_toe.png "Figure 2: Tic-tac-toe game.")

You can use similar commands for the other games as well, and you have a lot of flexibility in terms of choosing which base LLMs you want to use for the agent, whether you want to enable harness models, how many game runs you want to play, and so on. 

## Model and Harness Support Details
We currently support integrations with the OpenAI, Gemini, Anthropic, xAI, and DeepSeek APIs, along with Together-hosted Qwen 3 and Llama 4 models. Additionally, we support the evaluation of models with harness or without harness, as well as the choice of playing in single agent and multi-agent (two-player) mode. Here is a high level sketch of the evaluation process as well as a more detailed summary table. 

| Game Names | Modality Support | Single-model Run | Agentic Run | Multi-Player |
|------------|------------------|------------------|-------------|--------------|
| sokoban | text/vision | yes | yes | no |
| tetris | text/vision | yes | yes | no |
| candy_crush | text/vision | yes | yes | no |
| 2048 | text/vision | yes | yes | no |
| 1942 | vision | yes | yes | no |
| doom | vision | yes | yes | no |
| super_mario_bros | vision | yes | yes | no |
| ace_attorney | vision | yes | yes | no |
| pokemon_red | vision | yes | yes | no |
| tic_tac_toe | vision | yes | yes | yes |
| texas_holdem | text | yes | yes | yes |

## Conclusion

This is a basic walkthrough of the key components within LMGame-Bench and how you would use it to run the games in the single agent mode and multi-agent mode. Additionally, due to the modularity of the repository setup with the separation of the design for agent and environment, you can add in similar games by following the structure of the other games. We hope that this guideline is useful for providing the essential information so that you can try out [our codebase](https://github.com/lmgame-org/GamingAgent) for model evaluations and build your own gaming agents!

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


