import fastapi
import uvicorn

app = fastapi.FastAPI()

@app.get('/')
def index():
    return {'message': 'hello'}

@app.get('/car/{car_id}')
def get_car(car_id: int):
    return {'id': car_id, 'name': 'audi'}

uvicorn.run(app, host='127.0.0.1', port=8000)