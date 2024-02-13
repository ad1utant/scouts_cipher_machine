polish_signs = ['ą','a','ć','c','ę','e','ł','l','ń','n','ó','o','ś','s','ż','z','ź','z']
def Transliteration(inp):
    for i in range(0,len(polish_signs)-1,2):
        inp = inp.replace(polish_signs[i], polish_signs[i+1])
        inp = inp.replace(polish_signs[i].upper(), polish_signs[i + 1].upper())
    return inp