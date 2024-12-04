import json
import os
import pandas as pd
from db_query import get_db, query_table

prompt_mapping_file = "./prompt_mapping.json"
# Mapping dictionaries - do we need chatgpt -1???
model_name_mapping = {
    "chatgpt": -1,
    "llama-3-405b": 0,
    "gpt-4o-2024-08-06": 1,
    "gemini-1.5-pro": 2,
    "claude-3-5-sonnet-20240620": 3
}

reasoning_technique_mapping = {
    "CoT": 0
}

# Main data processing function
def process_data():
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

    return processed_data

def main(input_path, output_path):
    # Process the data
    output_data = process_data(input_path)

    # Convert to DataFrame and save as a Parquet file
    df = pd.DataFrame(output_data)
    df.to_parquet(output_path, index=False)
    print(f"Data saved to {output_path}")

print(process_data())
