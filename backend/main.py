from functions.transliteration import Transliteration
from functions.createdict import CreateDict
from functions.keyformat import KeyFormat
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

keys = [
    'gaderypoluki',
    'kularyminote',
    'koniecmatury',
    'politykarenu',
    'malinowebuty'
]

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

@app.get('/{ciphered_message}')
async def cipher_break(ciphered_message: str):
    array = []

    polish_words = []

    with open('slowa_ascii.txt', 'r') as ff:
        for line in ff:
            polish_words.append(line.strip())

    most_likely = 0
    for key in keys:
        procent = 0
        deciphered = cipher(key, ciphered_message)
        array.append((deciphered, KeyFormat(key)))



        for word in deciphered.split():
            if word.lower() in polish_words:
                procent += 1

        if procent / len(deciphered.split()) > 0.3:
            most_likely = [KeyFormat(key), deciphered, round((procent / len(deciphered.split())) * 100)]

    return {'ciphered' : ciphered_message,
            'deciphered' : array,
            'most_likely' : most_likely}





