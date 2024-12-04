import json
import os
import pandas as pd
import argparse

# Mapping dictionaries
model_name_mapping = {
    "chatgpt": -1,
    "llama-3": 0,
    "gpt-4-turbo-2024-04-09": 1,
    "mistral": 2,
    "gemini-1.5-pro": 3,
    "claude-3-5-sonnet-20240620": 4
}

reasoning_technique_mapping = {
    "CoT": 0
}

# Scores directory
scores_directory = "/home/ubuntu/AI-ESP-serve/database/users/scores"

# Function to classify user score
def classify_score(score):
    if score < 0:
        return 0  # bad player
    elif 0 <= score < 500:
        return 1  # beginner
    elif 500 <= score <= 1500:
        return 2  # intermediate
    elif score > 1500:
        return 3  # advanced

# Function to get user score from game-specific score file
def get_user_score(user_name, game_name):
    score_file_path = os.path.join(scores_directory, f"{game_name.lower()}_scores.json")
    try:
        with open(score_file_path, "r") as score_file:
            scores = json.load(score_file)
            return scores.get(user_name, None)
    except FileNotFoundError:
        print(f"Score file for {game_name} not found.")
        return None

# Main data processing function
def process_data(input_path):
    # Load input JSON data
    with open(input_path, "r") as file:
        data = json.load(file)

    # Processed data storage
    processed_data = []

    # Iterate over each entry in the data
    for entry in data:
        # Map template_name to model index
        model_index = model_name_mapping.get(entry.get("template_name"), None)

        # Extract user_name and get user score classification
        user_name = entry.get("user_name")
        game_name = entry.get("game_name")
        score = get_user_score(user_name, game_name)
        score_index = classify_score(score) if score is not None else None

        # Extract prompt index and reasoning technique index
        prompt_index = entry.get("system_prompt_index")
        reasoning_technique = entry.get("reasoning_technique")
        reasoning_technique_index = reasoning_technique_mapping.get(reasoning_technique, None)

        # Determine outcome index based on game_status
        game_status = entry.get("game_status")
        if game_status == "ONGOING":
            outcome_index = -1
        elif game_status == "MODEL_WIN":
            outcome_index = 1
        elif game_status == "MODEL_LOSE":
            outcome_index = 0
        else:
            outcome_index = None  # Handle any unexpected values

        # Append the processed entry
        processed_data.append({
            "user_name": user_name,
            "game_name": game_name,
            "model_index": model_index,
            "user_score_index": score_index,
            "prompt_index": prompt_index,
            "reasoning_technique_index": reasoning_technique_index,
            "outcome_index": outcome_index
        })

    return processed_data

def main(input_path, output_path):
    # Process the data
    output_data = process_data(input_path)

    # Convert to DataFrame and save as a Parquet file
    df = pd.DataFrame(output_data)
    df.to_parquet(output_path, index=False)
    print(f"Data saved to {output_path}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Process data and save as a feature vector file.")
    parser.add_argument("--input-path", required=True, help="Input JSON file path")
    parser.add_argument("--output-path", required=True, help="Output file path for the feature vector in Parquet format")

    # Parse the arguments
    args = parser.parse_args()

    # Run main with the provided paths
    main(args.input_path, args.output_path)