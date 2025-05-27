from fastapi import FastAPI
from fastapi import HTTPException
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from models import *

api = FastAPI()

uri = "mongodb+srv://grupo1:123@cluster0.npjy8wq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri, server_api=ServerApi('1'))

SDM = client.SDM

@api.get("/carrinhos")
def carrinhos():
    return SDM.carrinhos.find({'disponivel': True}, {'_id': 0}).to_list()

    
@api.post("/reserva")
def reserva(reserva: Reserva):
    pessoa_doc = reserva.pessoa.dict()    
    SDM.pessoas.insert_one(pessoa_doc)
    SDM.reservas.insert_one(reserva.dict())
    return "OK"
