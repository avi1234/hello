import api_call_dal

keyword = 'python'
url = 'https://api.github.com/search/repositories'
res = api_call_dal.http_get_request(f'github_repo:{keyword}', url, {"q": keyword})

print("🧚‍♂️🧚‍♂️🧚‍♂️🧚‍♂️")

# https://api.github.com/search/repositories?q=topic:python