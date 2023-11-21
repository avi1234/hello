import requests

import redis_dal

def http_get_request(key_name: str, url: str, params: dict = {}) -> dict:
    value_from_cache = redis_dal.get_json(key_name)
    if value_from_cache != None:
        return value_from_cache
    http_response = requests.get(url, params=params)
    redis_dal.set_text(key_name, http_response.text)
    return http_response.json()