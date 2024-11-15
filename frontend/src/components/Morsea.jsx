//react stuff
import * as React from "react";
import {useRef, useState} from "react";

//data
import keys from '../assets/data/mors_blocks.json';

//ui components
import {Separator} from "@/components/ui/separator.jsx";
import {Textarea} from "@/components/ui/textarea.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Heading1, Heading2, Output, Form, MutedParagraph} from "@/components/Components.jsx";

function Morsea(){
    const morseCipheringRef = useRef();
    const morseDecipheringRef = useRef();
    const [cipheredData, setCipheredData] = useState()
    const [decipheredData, setDecipheredData] = useState()

    //defining data from backend -> ciphering message to morse
    const handleMorseCipher = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`http://127.0.0.1:8000/morse/ciphering/${morseCipheringRef.current.elements.textarea.value}`)
            const ciphered = await response.json()
            setCipheredData(ciphered)
            console.log(ciphered)
        }catch (err) {
            console.error(err)
        }
    }
    const handleMorseDecipher = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`http://127.0.0.1:8000/morse/deciphering/${(morseDecipheringRef.current.elements.textarea.value).replace(/\//g, "@")}`)
            const deciphered = await response.json()
            setDecipheredData(deciphered)
            console.log(deciphered)
        }catch (err) {
            console.error(err)
        }
    }


    return(
        <div className={'grid grid-cols-5'}>


            {/*presenting section*/}
            <Heading1 className = {'mt-4'}>Alfabet Morse'a</Heading1>
            <MutedParagraph>
                W alfabecie Morse'a każda litera ma swoje odpowiedniki w postaci kombinacji kropek i kresek. Poszczególne litery są oddzielane znakiem "/". Słowa oddzielane są znakiem "//". Zdania oddzielane są znakiem "///".
            </MutedParagraph>
            <div className={'flex col-span-5 grid grid-cols-12'}>{
                Object.entries(keys).map(([key, value]) => (
                    <div key={key} className={'col-span-4 pe-4 pt-4 grid'}>
                    <div key={value} className={'rounded bg-muted p-4'}>
                        {Object.entries(value).map(([letter, code]) => (
                        <p key={letter}>{letter.toUpperCase()} = {code}</p>
                ))}</div>
                </div>
                ))
            }
            </div>
            <Separator className={'mt-10 mb-10 col-span-5'}/>


            {/*ciphering section*/}
            <Heading2>Zaszyfruj wiadomość!</Heading2>
            <MutedParagraph>
                Poniżej znajduje się program, dzięki któremu możesz zaszyfrować swoją wiadomość w błyskawicznym tempie. Wystarczy podać treść, a następnie nacisnąć przycisk!
            </MutedParagraph>
            <Form reference={morseCipheringRef} onClick={handleMorseCipher} buttonLabel={"morse'a"} placeholder={"zaszyfruj wiadomość alfabetem morse'a!"}></Form>
            <Output space={true} className={'bg-muted mt-4'}>
                {cipheredData ? ( <>{cipheredData.ciphered}</>
                ) : ( <>Tutaj wyświetli się zaszyfrowana wiadomość.</>
                )}
            </Output>
            <Separator className={'mt-10 mb-10 col-span-5'}/>


            {/*deciphering section*/}
            <Heading2>Odszyfruj wiadomość!</Heading2>
            <MutedParagraph>
                Poniżej znajduje się program, dzięki któremu możesz odszyfrować wiadomość zaszyforwaną alfabetem morse'a. Wystarczy podać treść w formacie podanym powyżej, a następnie nacisnąć przycisk!
            </MutedParagraph>
            <Form reference={morseDecipheringRef} onClick={handleMorseDecipher} placeholder={'odszyfruj wiadomość zaszyfrowaną alfabetem morse\'a!'} buttonLabel={"morse'a"}></Form>
            <Output space={true} className={'bg-muted mt-4'}>
                {decipheredData ? ( <>{decipheredData.deciphered}</>
                ) : ( <>Tutaj wyświetli się zaszyfrowana wiadomość.</>
                )}
            </Output>
        </div>
    )
}
export default Morsea