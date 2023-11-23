import os
import yaml

# Get the path to the directory containing the script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Navigate up one folder to the parent directory
parent_dir = os.path.abspath(os.path.join(script_dir, os.pardir))

# Construct the path to the YAML file
yaml_path = os.path.join(script_dir, 'config.yml')

with open(yaml_path, 'r') as config_file:
    config = yaml.safe_load(config_file)
    print('🍓 config.yml loaded')

def get_config(key: str) -> dict:
    return config[key]