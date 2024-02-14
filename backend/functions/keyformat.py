def KeyFormat(key):
    formated_key = ''
    for i in range(0, len(key), 2):
        formated_key += key[i]
        formated_key += key[i + 1]
        formated_key += '-'
    formated_key = formated_key[:-1].upper()
    return formated_key