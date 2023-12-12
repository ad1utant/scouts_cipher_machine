from functions.transliteration import Transliteration
from functions.createdict import CreateDict

if __name__ == '__main__':
    key = input('type a key: ')
    inp = Transliteration(input('type a prompt to code or decode: '))
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
    print(newConsole)