import * as React from "react";
import keys from '../assets/data/mors_blocks.json';
import {Separator} from "@/components/ui/separator.jsx";
import {Textarea} from "@/components/ui/textarea.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useRef} from "react";

function Morsea(){
    const morseRef = useRef();
    const handleMorseSubmit = (event) => {
        event.preventDefault()
        console.log(morseRef.current.elements.textarea.value)
    }



    return(
        <div className={'grid grid-cols-5'}>
            <h1 className={'col-span-5 scroll-m-20 text-4xl font-extrabold lg:text-5xl mt-4'}>Alfabet Morse'a</h1>
            <p className={'mt-4 col-span-5 text-xl text-muted-foreground'}>
                W alfabecie Morse'a każda litera ma swoje odpowiedniki w postaci kombinacji kropek i kresek. Poszczególne litery są oddzielane znakiem "/". Słowa oddzielane są znakiem "//". Zdania oddzielane są znakiem "///".
            </p>
            <div className={'flex col-span-5 grid grid-cols-12'}>{
                Object.entries(keys).map(([key, value]) => (
                    <div key={key} className={'col-span-4 pe-4 pt-4 grid'}>
                    <div key={value} className={'bg-muted p-4'}>
                        {Object.entries(value).map(([letter, code]) => (
                        <p key={letter}>{letter.toUpperCase()} = {code}</p>
                ))
                        }</div></div>
                ))

            }
            </div>

            <Separator className={'mt-10 mb-10 col-span-5'}/>


            <h2 className={'col-span-5 scroll-m-20 text-3xl font-extrabold tracking first:mt-0'}>Zaszyfruj wiadomość!</h2>
            <p className={'col-span-5 text-xl text-muted-foreground mt-4'}>Poniżej znajduje się program, dzięki któremu możesz zaszyfrować swoją wiadomość w błyskawicznym tempie. Wystarczy podać treść, a następnie nacisnąć przycisk!</p>
            <form className={'gap-4 mt-4 col-span-5 grid grid-cols-12'} ref={morseRef}>
                <Textarea className={'col-span-12 md:col-span-7 mr-2 md:mr-0'} type={"text"} name={'textarea'} placeholder={"zaszyfruj wiadomość alfabetem morse'a!"}/>
                <div className={'col-span-12 md:col-span-5 grid grid-cols-2'}>
                    <Button type={'submit'} className={'col-span-1 md:col-span-2'} disabled variant={'outline'}>morse'a</Button>
                    <Button className={'col-span-1 md:col-span-2 ml-2 md:ml-0'} variant={'secondary'} type={"submit"} onClick={handleMorseSubmit}>submit</Button>
                </div>
            </form>

            

        </div>
    )
}
export default Morsea