from functions.transliteration import Transliteration
from functions.createdict import CreateDict
from functions.keyformat import KeyFormat
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json



keys = [
    'gaderypoluki',
    'kularyminote',
    'koniecmatury',
    'politykarenu',
    'malinowebuty'
]

def cipher_pairs(key, prompt):
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
async def defult():
    return {"server" : "online"}
@app.get('/pair/{key}+{prompt}')
async def cipher_route_pairs(key: str, prompt: str):
    newConsole = cipher_pairs(key, prompt)

    return {'key': key,
            'prompt' : prompt,
            'newPrompt' : newConsole}

@app.get('/pair/{ciphered_message}')
async def cipher_break(ciphered_message: str):
    array = []

    polish_words = []

    with open('slowa_ascii.txt', 'r') as ff:
        for line in ff:
            polish_words.append(line.strip())

    most_likely = 0
    for key in keys:
        procent = 0
        deciphered = cipher_pairs(key, ciphered_message)
        array.append((deciphered, KeyFormat(key)))



        for word in deciphered.split():
            if word.lower() in polish_words:
                procent += 1

        if procent / len(deciphered.split()) > 0.3:
            most_likely = [KeyFormat(key), deciphered, round((procent / len(deciphered.split())) * 100)]

    return {'ciphered' : ciphered_message,
            'deciphered' : array,
            'most_likely' : most_likely}

@app.get('/morse/')
async def cipher_morse():
    return {"server" : "morse section works correctly"}

@app.get('/morse/ciphering/{ciphered_message}')
async def cipher_morse(ciphered_message):
    with open('assets\\mors.json', 'r') as f:
        mors = json.load(f)
    new_console = ''
    for sign in ciphered_message:
        for key in mors.keys():
            if key == sign or key.upper() == sign:
                new_console += mors[key]
                break

        new_console += '/' if sign != ' ' else ''
    if new_console != '':
        new_console = new_console[:-1]
    return {'ciphered' : new_console}

@app.get('/morse/deciphering/{ciphered_message}')
async def cipher_morse(ciphered_message):
    with open('assets\\mors.json', 'r') as f:
        mors = json.load(f)
    new_console, letter, word_list = '','',[]
    for sign_index in range(len(ciphered_message)):
        if ciphered_message[sign_index] == '@' and ciphered_message[sign_index - 1] == '@':
            new_console += ' '
        if ciphered_message[sign_index] == '@':
            continue
        letter += ciphered_message[sign_index]
        if sign_index == len(ciphered_message) - 1 or ciphered_message[sign_index + 1] == '@':
            print(letter)
            for key, value in mors.items():
                if value == letter:
                    new_console += key
                    letter = ''
                    break
    return {'deciphered' : new_console}