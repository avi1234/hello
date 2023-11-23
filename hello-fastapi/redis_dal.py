import json
import redis

from helpers.config import get_config

redis_config = get_config('redis')
expiration_in_seconds = redis_config['expiration_in_seconds']
client = redis.Redis(host=redis_config['host'], port=redis_config['port'], db=redis_config['db'])
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
    json_data = json.dumps(val)
    return client.set(key, json_data, ex=expiration_in_seconds)

def set_text(key: str, val: str) -> bool:
    print(f'ℹ️ redis dal: {key} is set as text.')
    return client.set(key, val, ex=expiration_in_seconds)