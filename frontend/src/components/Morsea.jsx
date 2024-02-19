import * as React from "react";
import keys from  '../assets/data/mors.json';
const morseAlphabet = Object.entries(keys).map(([letter, code]) => ({ letter, code }));
function Morsea(){
    return(
        <div>
            <h1 className={'col-span-5 scroll-m-20 text-4xl font-extrabold lg:text-5xl mt-4'}>Alfabet Morse'a</h1>
            <p className={'mt-4 col-span-5 text-xl text-muted-foreground'}>
                W alfabecie Morse'a każda litera ma swoje odpowiedniki w postaci kombinacji kropek i kresek. Poszczególne litery są oddzielane znakiem● ▬ "/". Słowa oddzielane są znakiem "//". Zdania oddzielane są znakiem "///".
            </p>
                {morseAlphabet.map(({letter,code}) => (
                        <p>{letter.toUpperCase()} | {code}</p>
                ))}
        </div>
    )
}
export default Morsea