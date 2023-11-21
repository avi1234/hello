import json
import redis

client = redis.Redis(host="localhost", port=6379, db=0)
print('ℹ️ redis client initiated')

def get_json(key: str) -> dict:
    retreived_value = client.get(key)
    if retreived_value == None:
        print(f'ℹ️ redis dal: {key} cannot be found.')
        return retreived_value
    print(f'ℹ️ redis dal: {key} was successfuly retreived.')
    return json.loads(retreived_value)

def set_json(key: str, val: dict) -> bool:
    print(f'ℹ️ redis dal: {key} is set as json.')
    expiration_in_seconds = 60
    json_data = json.dumps(val)
    return client.set(key, json_data, ex=expiration_in_seconds)

def set_text(key: str, val: str) -> bool:
    print(f'ℹ️ redis dal: {key} is set as text.')
    expiration_in_seconds = 60
    return client.set(key, val, ex=expiration_in_seconds)