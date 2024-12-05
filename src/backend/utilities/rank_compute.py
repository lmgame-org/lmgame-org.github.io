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

prompt_mapping_file = "./prompt_mapping.json"
# Mapping dictionaries - do we need chatgpt -1???
model_name_mapping = {
    "llama-3-405b": 0,
    "gpt-4o-2024-08-06": 1,
    "gemini-1.5-pro": 2,
    "claude-3-5-sonnet-20240620": 3
}

reasoning_technique_mapping = {
    "CoT": 0
}

# Main data processing function
def process_data(output_path='./feature_vector.parquet'):
    data = query_table("game_sessions")
    with open(prompt_mapping_file, "r") as file:
        prompt_mapping = json.load(file)

    # Processed data storage
    processed_data = []

    # Iterate over each entry in the data
    for entry in data:
        # Map template_name to model index
        model_index = model_name_mapping.get(entry.get("model"), None)

        # Extract user_name and get user score classification
        user_id = entry.get('user_id')
        username = entry.get("username")
        session_id = entry.get("session_id")
        game_name = entry.get("game_name")
        level_index = entry.get("level")

        # Extract prompt index and reasoning technique index - delete them for now due to incomplete info
        prompt = entry.get("system_prompt")
        prompt_values = [prompt_value[:100].lower().strip() for prompt_value in prompt_mapping[game_name].values()]
        prompt_index = prompt_values.index(prompt[:100].lower().strip())

        reasoning_technique = entry.get("reasoning_technique")
        reasoning_technique_index = reasoning_technique_mapping.get(reasoning_technique, None)

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
    df.to_parquet(output_path, index=False)
    print(f"Data saved to {output_path}")

    return processed_data


def create_one_hot(index, size):
    one_hot = np.zeros(size)
    if index is not None:  # Check if the index is not None
        one_hot[index] = 1
    return one_hot

def calculate_bt_model_scores(input_file='./feature_vector.parquet', 
                              output_json_file='./coefficients.json',
                              model_size_count = 4,
                              user_level_count = 3,
                              prompt_size_count = 5,
                              reasoning_technique_count = 1):
    # Load the Parquet file
    df = pd.read_parquet(input_file)

    # Define maximum indices for each category to determine one-hot vector dimensions
    model_size_count = 4
    user_level_count = 3
    prompt_size_count = 5
    reasoning_technique_count = 1

    # Filter out rows with outcome_index = -1 and None
    df = df[(df["outcome_index"] != -1) & (df["outcome_index"].notna())]

    # Initialize a list to hold all feature vectors and outcome labels
    feature_vectors = []
    outcome_labels = []

    # Iterate through each row to construct one-hot vectors and concatenate
    for _, row in df.iterrows():
        model_one_hot = create_one_hot(row["model_index"], model_size_count)
        user_score_one_hot = create_one_hot(row["user_level_index"], user_level_count)
        prompt_one_hot = create_one_hot(row["prompt_index"], prompt_size_count)
        reasoning_technique_one_hot = create_one_hot(row["reasoning_technique_index"], reasoning_technique_count)

        # Concatenate all one-hot vectors for this row
        full_vector = np.concatenate([model_one_hot, user_score_one_hot, prompt_one_hot, reasoning_technique_one_hot])
        feature_vectors.append(full_vector)

        # Add outcome label (0 for MODEL_LOSE, 1 for MODEL_WIN)
        outcome_labels.append(row["outcome_index"])

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

    beta_adjusted = []
    for b in beta:
        b *= 400
        b += 1000
        beta_adjusted.append(b)
    # Display final beta coefficients
    print("Final model coefficients:", beta_adjusted)

    # Save to JSON file
    with open(output_json_file, 'w') as json_file:
        json.dump(beta.tolist(), json_file, indent=4)

    return beta_adjusted

def compute_trueskill_rankings(input_file='./feature_vector.parquet', 
                               coefficients_file='./coefficients.json', 
                               model_size_count = 4,
                               user_level_count = 3,
                               prompt_size_count = 5,):
    # Load the Parquet file
    df = pd.read_parquet(input_file)

    # Load coefficients from JSON file
    with open(coefficients_file, 'r') as file:
        coefficients = json.load(file)


    # Extract and normalize model coefficients
    all_coefficients_raw = list(coefficients)
    all_coefficients = []
    for c in all_coefficients_raw:
        c *= 200
        c += 1000
        all_coefficients.append(c)

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

    # Assign unique user levels
    user_levels = df['user_level_index']
    user_ids = df['user_id']
    user_level_mapping = dict(zip(user_ids, user_levels))

    # Initialize user TrueSkill ratings based on logistic regression coefficients
    user_ratings = {}
    for user_id, level in user_level_mapping.items():
        base_mu = user_coefficients[level]  # Adjust for stronger model with more negative score
        user_ratings[user_id] = ts.Rating(mu=base_mu, sigma=base_sigma)

    # Initialize win tracking
    win_counts = {user_id: 0 for user_id in user_ids}
    total_counts = {user_id: 0 for user_id in user_ids}

    # Calculate virtual opponent's rating based on match factors
    def calculate_virtual_opponent_rating(row):
        model_coefficient = model_coefficients[row["model_index"]]
        prompt_coefficient = prompt_coefficients[row["prompt_index"]]
        reasoning_coefficient = reasoning_technique_coefficient

        combined_mu = (model_coefficient + prompt_coefficient + reasoning_coefficient) / 3
        return ts.Rating(mu=combined_mu, sigma=base_sigma)

    # Update TrueSkill ratings for users based on outcomes
    for _, row in df.iterrows():
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



def get_model_scores(input_file='./utilities/coefficients.json', model_size_count = 4 ):
    with open(input_file, "r") as file:
        beta = json.load(file)
    beta_adjusted = []
    for b in beta:
        b *= 400
        b += 1000
        beta_adjusted.append(b)
    # Display final beta coefficients
    print("Final model coefficients:", beta_adjusted)
    json_output = []
    all_model_scores = dict(zip(model_name_mapping.keys() ,beta_adjusted[:model_size_count]))
    for model, score in all_model_scores.items():
        json_output.append({'name':model, 'score':score})
    return json_output



def main():
    process_data()
    calculate_bt_model_scores()
    compute_trueskill_rankings()


# if __name__ == "__main__":
#     main()