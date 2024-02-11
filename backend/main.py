from functions.transliteration import Transliteration
from functions.createdict import CreateDict
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

def cipher(key,prompt):
    inp = Transliteration(prompt)
    dict = CreateDict(key)
    temp = True
    newConsole = ""
    for i in inp:
        for j in dict:
            if i == j:
                temp = False
                newConsole += dict[j]
                break
        if temp:
            newConsole += i
        temp = True
    return newConsole


app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)
@app.get('/')
async def root():
    return {'message' : 'sample'}


@app.get('/{key}+{prompt}')
async def cipher_route(key: str, prompt: str):
    newConsole = cipher(key, prompt)

    return {'key': key,
            'prompt' : prompt,
            'newPrompt' : newConsole}





