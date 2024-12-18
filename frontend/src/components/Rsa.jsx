import "react";
import {Form, FormRsa, Heading1, Heading2, Heading4, MutedParagraph, Output} from "@/components/Components.jsx";
import convertFormat from "@/functions/convertFormat.js";
import {Separator} from "@/components/ui/separator.jsx";
import {useRef, useState} from "react";


function Rsa(props){
    const RsaGeneratingRef = useRef(null);
    const [cipheredData, setCipheredData] = useState(0);
    const handleGenerateRsa = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`http://127.0.0.1:8000/generate_rsa/${RsaGeneratingRef.current.elements.textarea.value}`)
            const ciphered = await response.json()
            setCipheredData(ciphered)
            console.log(ciphered)
        }catch (err) {
            console.error(err)
        }
    }
    return(
        <div className={'grid grid-cols-5'}>
            <Heading1 className={'mt-4'}>Algorytm Rivesta-Shamira-Adlemana</Heading1>
            <MutedParagraph className={'mt-4'}>W szyfrowaniu RSA, opartym na dużych liczbach pierwszych, program
                generuje parę kluczy: publiczny i prywatny. Klucz publiczny jest używany do szyfrowania wiadomości,
                podczas gdy klucz prywatny, który powinien pozostać tajny, służy do ich deszyfrowania. Klucz prywatny
                należy chronić, ponieważ umożliwia dostęp do odszyfrowanych danych.</MutedParagraph>
            <div className={'rounded mt-4 bg-muted p-4 col-span-5'}>
                <Heading4>Przykładowy klucz prywatny</Heading4>
                <p className={'break-words'}>-----BEGIN PRIVATE
                    KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCtz10ygQDalhiy\nTEBrD75levWvGMZ2MLZJaAii9yoLXRpxyuDqgPG3cC833EHR9yY6zMjt/Fj1xFvS\nWzg5p1UqAMveH28bmrHe1c2KS+w/xBmGsC1rSsDH99utA5LdJIQV9TGEASwcE6hv\nKRYfy5TQfsRgOy37X/a8/D2aDNSw0I9xsugnx6+aZXEJqNmHl1AJwLBkDLBn8nwn\nNKhWnSaOKZEvzn4G4Ez+oqS4RyJZRMA0/HWK4iUoauaCz10cS9HkGsB5rmsbn8QR\nEFbi4UQP4aNt2i8oydHIs83tl4vSzbwmFBUB/H<br/>-----END
                    PRIVATE KEY-----</p>
            </div>


            <MutedParagraph className={'pt-2 pb-2'}>w rzeczywistości klucze są o wiele dłuższe, ale równie
                skomplikowane...</MutedParagraph>
            <div className={'rounded bg-muted p-4 col-span-5'}>
                <Heading4>Przykładowy klucz publiczny</Heading4>
                <p className={'break-words'}>-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArc9dMoEA2pYYskxAaw++\nZXr1rxjGdjC2SWgIovcqC10accrg6oDxt3AvN9xB0fcmOszI7fxY9cRb0ls4OadV\nKgDL3h9vG5qx3tXNikvsP8QZhrAta0rAx/fbrQOS3SSEFfUxhAEsHBOobykWH8uU\n0H7EYDst+1/2vPw9mgzUsNCPcbLoJ8evmmVxCajZh5dQCcCwZAywZ/J8JzSoVp0m\njimRL85+BuBM/qKkuEciWUTANPx1iuIlKGrmgs9dHEvR5BrAea5rG5/EERBW4uFE\nD+GjbdovKMnRyLPN7ZeL0s28JhQVAfx1u9u8DuC0AOecz66q0+OrBl1EMgmVguk2\nQQIDAQAB\n<br/>-----END PUBLIC KEY-----</p>
            </div>

            <Separator className={'mt-10 mb-10 col-span-5'}/>
            <Heading2>Wygeneruj parę kluczy!</Heading2>
            <MutedParagraph>Poniżej znajduje się program, którym wygenerujesz swoją własną parę kluczy RSA! Aby wygenerować parę kluczy należy wpisać bitową długość klucza - możesz wpisać wartość pomiędzy 1024 - 4096. Klucz uznawany za bezpieczny w dzisiejszych czasach zaczyna się od 2048 bitów.</MutedParagraph>
            <FormRsa reference={RsaGeneratingRef} onClick={handleGenerateRsa}/>
            {cipheredData['request'] === 'ok' ? <div className={'col-span-5'}>
                <Heading2 className={'mt-4'}>Twój klucz publiczny:</Heading2>
                <MutedParagraph> Poniżej znajduje się twój klucz publiczny, możesz podać go każdemu od kogo chcesz otrzymać zaszyfrowaną wiadomość.</MutedParagraph>
                <Output className={'bg-muted p-4 col-span-5'}>
                    <p className={'break-words'}>{cipheredData.public_key}</p>
                </Output>

                <Heading2 className={'mt-4'}>Twój klucz prywatny:</Heading2>
                <MutedParagraph>Poniżej znajduje się twój klucz prywatny - służy on do deszyfrowania. Pamiętaj, żeby nie podawac go nikomu!</MutedParagraph>
                <Output className={'bg-muted p-4 col-span-5'}>
                    <p className={'break-words'}>{cipheredData.private_key}</p>
                </Output>
            </div> : null}
        </div>
    )
}

export default Rsa;