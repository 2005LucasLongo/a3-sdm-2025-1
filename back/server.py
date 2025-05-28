from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from models import *

api = FastAPI()

# Configuração do CORS
api.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Conexão com o MongoDB
uri = "mongodb+srv://grupo1:123@cluster0.npjy8wq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri, server_api=ServerApi('1'))

SDM = client.SDM


@api.get("/carrinhos")
def carrinhos():
    carrinhos_disponiveis = list(SDM.carrinhos.find({'disponivel': True}, {'_id': 0}))
    return carrinhos_disponiveis


@api.post("/reserva")
def reserva(reserva: Reserva):
    # Salvar a pessoa
    pessoa_doc = reserva.pessoa.dict()
    SDM.pessoas.insert_one(pessoa_doc)

    # Salvar a reserva
    SDM.reservas.insert_one(reserva.dict())

    # Atualizar carrinho para não disponível
    result = SDM.carrinhos.update_one(
        {
            "nome": reserva.carrinho.nome,
            "setor": reserva.carrinho.setor,
            "disponivel": True
        },
        {
            "$set": {"disponivel": False}
        }
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Carrinho não encontrado ou já reservado")

    return {"message": "Reserva realizada com sucesso"}
