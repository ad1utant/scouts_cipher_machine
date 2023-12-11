if __name__ == '__main__':
    dict = {'g': 'a', 'd': 'e', 'r': 'y', 'p': 'o', 'l': 'u', 'k': 'i', 'a': 'g', 'e': 'd', 'y': 'r', 'o': 'p',
            'u': 'l', 'i': 'k', 'ó': 'p', 'ą': 'g', 'ę': 'd', 'ł': 'u', 'ś': 's', 'ń': 'n', 'ź': 'z', 'ć': 'c',
            'ż': 'z'}
    console = input()
    temp = True
    newConsole = ""
    for i in console:
        for j in dict:
            if i == j:
                temp = False
                newConsole += dict[j]
                break
        if temp:
            newConsole += i
        temp = True

    print(newConsole)