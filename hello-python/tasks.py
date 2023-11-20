from celery import Celery
from time import sleep

app = Celery('tasks', broker='redis://localhost:6379/0', backend='redis://localhost:6379/0')

@app.task
def reverse(text):
    sleep(5)
    return text[::-1]


# celery -A tasks worker --loglevel=info