def CreateDict(key):
    dict,i = {},0
    while i < len(key) -1 :
        dict[key[i]] = key[i+1]
        i+=2
    i,key = 0,key[::-1]
    while i < len(key) -1 :
        dict[key[i]] = key[i+1]
        i+=2
    i,key = 0,key[::-1]
    while i < len(key) -1 :
        dict[(key[i]).upper()] = (key[i+1]).upper()
        i+=2
    i,key = 0,key[::-1]
    while i < len(key) -1 :
        dict[(key[i]).upper()] = (key[i+1]).upper()
        i+=2

    return dict