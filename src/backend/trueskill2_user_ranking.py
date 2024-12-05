import pandas as pd
import trueskill as ts
from trueskill import *
import numpy as np
import json

# Load the Parquet file
input_file = "/home/ubuntu/AI-ESP-serve/bt_model/test_suite/feature_vector.parquet"
df = pd.read_parquet(input_file)

# Load coefficients from JSON file
coefficients_file = "/home/ubuntu/AI-ESP-serve/bt_model/test_suite/coefficients.json"
with open(coefficients_file, 'r') as file:
    coefficients = json.load(file)

# Define coefficient sizes
model_size_count = 5
user_level_count = 4
prompt_size_count = 5
reasoning_technique_count = 1

# Extract and normalize model coefficients
all_coefficients_raw = list(coefficients)
all_coefficients = []
for c in all_coefficients_raw:
    c *= 200
    c += 1000
    all_coefficients.append(c)
    # Display final beta coefficients

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
user_levels = [0] * 2 + [1] * 8 + [2] * 5 + [3] * 5
user_ids = list(range(20))
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

# Calculate and display win rate for each user
#print("\nWin rates for each user:")
#for user_id in user_ids:
#    win_rate = win_counts[user_id] / total_counts[user_id] if total_counts[user_id] > 0 else 0
#    print(f"User {user_id}: Win Rate = {win_rate:.2%} (Wins: {win_counts[user_id]}, Total Games: {total_counts[user_id]})")

print(f"\nOpponent: mu={new_opponent_rating.mu}, sigma={new_opponent_rating.sigma}")
