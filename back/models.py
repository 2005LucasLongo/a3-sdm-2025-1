from pydantic import BaseModel

class Pessoa(BaseModel):
    cpf: str | None
    nome: str | None
    telefone: str | None

class Carrinho(BaseModel):
    nome: str
    setor: str

class Reserva(BaseModel):
    carrinho: Carrinho
    pessoa: Pessoa