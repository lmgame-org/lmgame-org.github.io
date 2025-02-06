import json
import os
import pandas as pd
from .db_query import get_db, query_table
import numpy as np
import pandas as pd
import trueskill as ts
from trueskill import *
import numpy as np
import json

OUTPUT_MODEL_SCORE_PATH = 'precomputed_data/1_1_2_5/model_scores.json'
OUTPUT_USER_SCORE_PATH = 'precomputed_data/1_1_2_5/user_scores.json'
# Initialize Mapping Data or Files
PROMPT_MAPPING_FILE = "utilities/prompt_mapping.json"

model_name_mapping = {
    "llama-3-405b": 0,
    "gpt-4o-2024-11-20": 1,
    "gemini-1.5-pro": 2,
    "claude-3-5-sonnet-20240620": 3,
    "grok-2-beta": 4,
    "qwen-max": 5,
    "gemini-2.0-flash-thinking-exp-01-21": 6,
    "o1-mini": 7,
    "o3-mini": 8,
    "deepseek-reasoner": 9
}
legacy_model_name_mapping = {
    "gpt-4o-2024-08-06": 1,
    "gemini-2.0-flash-thinking-exp": 6
}
reasoning_models = [
    "gemini-2.0-flash-thinking-exp-01-21",
    "o1-mini",
    "o3-mini",
    "deepseek-reasoner"
]
reasoning_technique_mapping = {
    "CoT": 0,
    "longCoT": 1
}

def classify_level(user_id: int):
    # Query the user_stars table with the specified roblox_id
    result = query_table("user_stars", filters={"roblox_id": user_id})

    if not result:
        # Raise an error if the user is not found
        raise ValueError(f"User with roblox_id {user_id} not found in user_stars table.")

    # Extract the stars value
    stars = result[0]["stars"]


    # Example logic for classification based on stars
    if stars > 9:
        return 2
    elif stars > 4:
        return 1
    else:
        return 0
    
# Main data processing function
def process_data(output_path='./feature_vector.parquet'):
    data = query_table("game_sessions")
    with open(PROMPT_MAPPING_FILE, "r") as file:
        prompt_mapping = json.load(file)

    # Processed data storage
    processed_data = []

    # Iterate over each entry in the data
    for entry in data:
        # Map template_name to model index
        
        # Ignore story_scenario
        if entry.get("game_name") == 'StoryScenario':
            continue 
        
        model_index = model_name_mapping.get(entry.get("model").strip().lower(), None)

        # NOTE: handle legacy data (will be deprecated soon)
        if model_index is None:
            model_index = legacy_model_name_mapping.get(entry.get("model"), None)
            if model_index is None:
                print(F"MODEL: {entry.get("model")} is not supported.")
                continue
                # raise NotImplementedError(F"MODEL: {entry.get("model")} is not supported.")

        # Extract user_name and get user score classification
        user_id = entry.get('user_id')
        username = entry.get("username")
        session_id = entry.get("session_id")
        game_name = entry.get("game_name")
        level_index = classify_level(user_id)

        # Extract prompt index and reasoning technique index - delete them for now due to incomplete info
        prompt = entry.get("system_prompt")
        prompt_values = [prompt_value[:100].lower().strip() for prompt_value in prompt_mapping[game_name].values()]
        prompt_index = prompt_values.index(prompt[:100].lower().strip())
        
        # Assign reasonining technique used
        reasoning_technique = entry.get("reasoning_technique")
        if model_name_mapping.get(entry.get("model"), None) in reasoning_models:
            # longCoT
            reasoning_technique_index = reasoning_technique_mapping.get(reasoning_technique, 1)
        else:
            reasoning_technique_index = reasoning_technique_mapping.get(reasoning_technique, 0)

        # Determine outcome index based on game_status
        game_status = entry.get("game_status")
        if game_status == "ONGOING":
            outcome_index = -1
        elif game_status == "PLAYER_LOSE":
            outcome_index = 1
        elif game_status == "PLAYER_WIN":
            outcome_index = 0
        else:
            outcome_index = None  # Handle any unexpected values

        # Append the processed entry
        processed_data.append({
            "user_id": user_id,
            "user_name": username,
            "session_id": session_id,
            "game_name": game_name,
            "model_index": model_index,
            "prompt_index": prompt_index,
            "user_level_index": level_index,
            "reasoning_technique_index": reasoning_technique_index,
            "outcome_index": outcome_index
        })

    # Convert to DataFrame and save as a Parquet file
    df = pd.DataFrame(processed_data)

    # Filter out rows with outcome_index = -1 and None
    df = df[(df["outcome_index"] != -1) & (df["outcome_index"].notna())]

    return df


def create_one_hot(index, size):
    one_hot = np.zeros(size)
    if index is not None:  # Check if the index is not None
        one_hot[index] = 1
    return one_hot

def calculate_bt_model_scores(sample_df: pd.DataFrame,
                              model_size_count: int = 4,
                              user_level_count: int = 3,
                              prompt_size_count: int = 5,
                              reasoning_technique_count: int = 2):

    # Define maximum indices for each category to determine one-hot vector dimensions
    model_size_count = model_size_count
    user_level_count = user_level_count
    prompt_size_count = prompt_size_count
    reasoning_technique_count = reasoning_technique_count

    # Initialize a list to hold all feature vectors and outcome labels
    feature_vectors = []
    outcome_labels = []

    print("start iterating through each row to construct one-hot feature vector.")
    # Iterate through each row to construct one-hot vectors and concatenate
    for _, row in sample_df.iterrows():
        model_one_hot = create_one_hot(row["model_index"], model_size_count)
        user_score_one_hot = create_one_hot(row["user_level_index"], user_level_count)
        prompt_one_hot = create_one_hot(row["prompt_index"], prompt_size_count)
        reasoning_technique_one_hot = create_one_hot(row["reasoning_technique_index"], reasoning_technique_count)

        # Concatenate all one-hot vectors for this row
        full_vector = np.concatenate([model_one_hot, user_score_one_hot, prompt_one_hot, reasoning_technique_one_hot])
        feature_vectors.append(full_vector)

        # Add outcome label (0 for MODEL_LOSE, 1 for MODEL_WIN)
        outcome_labels.append(row["outcome_index"])

    print("converting list into np arrays.")
    # Convert lists into numpy arrays for feature matrix and outcome labels
    feature_matrix = np.array(feature_vectors)
    outcome_labels = np.array(outcome_labels)

    # Output the shape of the final feature matrix for verification
    print("Feature matrix shape:", feature_matrix.shape)
    print("Outcome labels shape:", outcome_labels.shape)

    # Online logistic regression
    step_size = 0.01
    _, d = feature_matrix.shape
    beta = np.zeros(d)  # Initialize coefficients

    # Sigmoid function
    def sigmoid(z):
        return 1 / (1 + np.exp(-z))

    # Online training loop
    for i in range(len(feature_matrix)):
        if i % 100 == 0:
            print(f"performing {i}th iterations...")
        x_i = feature_matrix[i]
        y_i = outcome_labels[i]
        
        # Compute the gradient
        z = np.dot(x_i, beta)
        h = sigmoid(z)
        gradient = x_i * (h - y_i)
        
        # Update beta
        beta -= step_size * gradient

    return beta

def compute_trueskill_rankings(sample_df: pd.DataFrame,
                               coefficients, 
                               model_size_count = 4,
                               user_level_count = 3,
                               prompt_size_count = 5,):

    # Extract and normalize model coefficients
    all_coefficients_raw = list(coefficients)
    all_coefficients = []
    for c in all_coefficients_raw:
        c *= 200
        c += 1000
        all_coefficients.append(c)

    print("all user coeffiicents:")
    print(all_coefficients)

    model_coefficients = all_coefficients[:model_size_count]

    # Extract other coefficients
    user_coefficients = all_coefficients[model_size_count:model_size_count + user_level_count]
    prompt_coefficients = all_coefficients[model_size_count + user_level_count:model_size_count + user_level_count + prompt_size_count]
    reasoning_technique_coefficient = all_coefficients[model_size_count + user_level_count + prompt_size_count:][0]

    # Define base sigma (uncertainty) for all players in TrueSkill
    base_sigma = 10.0

    # Initialize TrueSkill environment
    ts.setup(draw_probability=0)

    # Assign unique user levels and usernames
    unique_users = sample_df[['user_id', 'user_level_index', 'user_name']].drop_duplicates()

    # Create mappings
    user_level_mapping = dict(zip(unique_users['user_id'], unique_users['user_level_index']))
    user_name_mapping = dict(zip(unique_users['user_id'], unique_users['user_name']))

    # Initialize user TrueSkill ratings based on logistic regression coefficients
    user_ratings = {}
    for user_id, level in user_level_mapping.items():
        base_mu = user_coefficients[level]  # Adjust for stronger model with more negative score
        user_ratings[user_id] = ts.Rating(mu=base_mu, sigma=base_sigma)

    # Initialize win tracking
    win_counts = {user_id: 0 for user_id in user_level_mapping.keys()}
    total_counts = {user_id: 0 for user_id in user_level_mapping.keys()}

    # Calculate virtual opponent's rating based on match factors
    def calculate_virtual_opponent_rating(row):
        model_coefficient = model_coefficients[row["model_index"]]
        prompt_coefficient = prompt_coefficients[row["prompt_index"]]
        reasoning_coefficient = reasoning_technique_coefficient

        combined_mu = (model_coefficient + prompt_coefficient + reasoning_coefficient) / 3
        return ts.Rating(mu=combined_mu, sigma=base_sigma)

    # Update TrueSkill ratings for users based on outcomes
    for _, row in sample_df.iterrows():
        user_id = row["user_id"]
        outcome = row["outcome_index"]

        # Get the user's rating
        user_rating = user_ratings[user_id]
        opponent_rating = calculate_virtual_opponent_rating(row)

        # Update ratings based on outcome and track win/loss
        if outcome == 1:  # Model wins (user loses)
            new_opponent_rating, new_user_rating = ts.rate_1vs1(opponent_rating, user_rating)
        else:  # User wins
            new_user_rating, new_opponent_rating = ts.rate_1vs1(user_rating, opponent_rating)
            win_counts[user_id] += 1  # Count win for the user

        # Update total games played
        total_counts[user_id] += 1
        user_ratings[user_id] = new_user_rating

    # Display user rankings, sorted by mu (highest to lowest)
    sorted_users = sorted(user_ratings.items(), key=lambda x: x[1].mu, reverse=True)
    print("User rankings based on TrueSkill ratings (from highest to lowest mu):")
    for user_id, rating in sorted_users:
        print(f"User {user_id} (Level {user_level_mapping[user_id]}): mu={rating.mu}, sigma={rating.sigma}")

    print(f"\nOpponent: mu={new_opponent_rating.mu}, sigma={new_opponent_rating.sigma}")
    return [{user_id: [user_name_mapping[user_id], rating.mu, rating.sigma]} for user_id, rating in sorted_users]



def get_model_scores(game_name: str, model_size_count = 4 ):
    with open(OUTPUT_MODEL_SCORE_PATH, "r") as file:
        beta = json.load(file)
    beta_adjusted = []
    for b in beta[game_name]:
        b *= 200
        b += 1000
        beta_adjusted.append(b)
    # Display final beta coefficients
    print("Final model coefficients:", beta_adjusted)
    json_output = []
    all_model_scores = dict(zip(model_name_mapping.keys() ,beta_adjusted[:model_size_count]))
    for model, score in all_model_scores.items():
        json_output.append({'name':model, 'score':score})
    return json_output

def get_average_model_scores(model_size_count = 4 ):
    with open(OUTPUT_MODEL_SCORE_PATH, "r") as file:
        beta = json.load(file)
    all_beta_adjusted = []
    for beta_value in beta.values():
        beta_value = [b * 200 + 1000 for b in beta_value]
        all_beta_adjusted.append(beta_value)

    average_beta = np.mean(all_beta_adjusted, axis=0)

    # Display final beta coefficients
    print("Final model coefficients:", average_beta)
    json_output = []
    all_model_scores = dict(zip(model_name_mapping.keys() ,average_beta[:model_size_count]))
    for model, score in all_model_scores.items():
        json_output.append({'name':model, 'score':score})
    return json_output

def get_user_scores(game_name: str):
    with open(OUTPUT_USER_SCORE_PATH, "r") as file:
        user_mus = json.load(file)
    
    json_output = []
    for user_mu in user_mus[game_name]:
        for score_data in user_mu.values():
            json_output.append({'name': score_data[0], 'score':score_data[1]})
    return json_output


def update_scores():
    # Process data
    df = process_data()
    model_dict = dict()
    user_dict = dict()

    # Iterate over unique game names
    for game_name in df['game_name'].unique():
        sample_df = df[df["game_name"] == game_name]
        model_dict[game_name] = list(calculate_bt_model_scores(sample_df, model_size_count=len(model_name_mapping.keys()), reasoning_technique_count=len(reasoning_technique_mapping.keys())))
        user_dict[game_name] = compute_trueskill_rankings(sample_df=sample_df, coefficients=model_dict[game_name], model_size_count=len(model_name_mapping.keys()))
    # Save model_dict to JSON
    with open(OUTPUT_MODEL_SCORE_PATH, 'w') as model_file:
        json.dump(model_dict, model_file, indent=4)

    # Save user_dict to JSON
    with open(OUTPUT_USER_SCORE_PATH, 'w') as user_file:
        json.dump(user_dict, user_file, indent=4)

    print(f"Model scores saved to {OUTPUT_MODEL_SCORE_PATH}")
    print(f"User scores saved to {OUTPUT_USER_SCORE_PATH}")
