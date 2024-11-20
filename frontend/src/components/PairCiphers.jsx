//js functions
import convertFormat from "@/functions/convertFormat.js";

//react stuff
import * as React from "react";
import {useRef, useState} from "react";

//ui components
import {Heading1, Heading2, Form, MutedParagraph, Output, Heading4} from "@/components/Components.jsx";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea.jsx";
import {Separator} from "@/components/ui/separator.jsx";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

//other
import '../styles/index.css';
import config from '../../../config.json';
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";


function PairCiphers(props) {
    const cipherRef = useRef();
    const [cipheredMessageData, setCipheredMessageData] = useState("");

    const decipherRef = useRef();
    const [decipheredMessageData, setDecipheredMessageData] = useState("");

    const [comboboxOpen, setComboboxOpen] = useState(false);
    const [comboboxValue, setComboboxValue] = useState("");


    //defining data from backend -> deciphering message
    const handleDecipherSubmit = (event) => {
        event.preventDefault();
        const textareaValue =  decipherRef.current.elements.textarea.value;

        //sending and receiving deciphered message from backend
        async function fetchRequest(){
            try {
                const response = await fetch(`http://127.0.0.1:8000/pair/${textareaValue}`);
                const newConsole = await response.json();
                const mostLikelyKey = newConsole.most_likely[0]
                const mostLikelyMessage = newConsole.most_likely[1]
                console.log(newConsole)
                setDecipheredMessageData(newConsole)

            } catch (err) {
                console.error(err)
            }
        }
        fetchRequest()

    }

    //defining data from backend -> ciphering message
    const handleCipherSubmit = (event) => {
        event.preventDefault();
        const promptValue =  cipherRef.current.elements.promptInput.value;
        const keyValue = comboboxValue;

        //sending and receiving ciphered message from backend
        async function fetchRequest(){
            try {
                const response = await fetch(`http://127.0.0.1:8000/pair/${keyValue}+${promptValue}`);
                const newConsole = await response.json();
                const {newPrompt} = newConsole;
                console.log(newPrompt)
                setCipheredMessageData(newPrompt)

            } catch (err) {
                console.error(err)
            }
        }
        fetchRequest()
    }


  return (
      <div className={'grid grid-cols-5'}>


          {/*presenting section*/}
          <Heading1 className={'mt-4'}>Monoalfabetyczne szyfry podstawieniowe</Heading1>
          <MutedParagraph className={'mt-4'}>W słowie szyfrowanym każdą kolejną literę podmieniamy na literę będącą w parze z literą podmienianą. W przypadku niewystępowania danej litery w kluczu, zostaje ona przepisana. Szyfry te nie uwzględniają polskich znaków.</MutedParagraph>

          <div className={'grid grid-cols-6 col-span-5 justify-between'}>
              <div className={'items-start rounded mt-4 bg-muted p-4 col-span-6 md:col-span-3 sm:col-span-6 md:mr-2'}>
                  <Heading4>Lista szyfrów monoalfabetycznych</Heading4>
                  <ul className="list-disc p-0 m-0 ps-1 [&>li]:mt-1 list-inside">

                      {config.pairCiphers.map((key) => (
                          <li key = {key}>{convertFormat(key)}</li>
                      ))}

                  </ul>
              </div>

              <div className={'items-start rounded mt-4 bg-muted p-4 col-span-6 md:col-span-3 sm:col-span-6 md:ml-2'}>
                  <Heading4>Proces Szyfrowania</Heading4>
                <p className={'leading-7 [&:not(:first-child)]:mt-1 whitespace-pre-line'}>
                    szyfr: GA-DE-RY-PO-LU-KI{'\n'}
                    wiadomość: MOTYL {'\n'}
                    O zamieniamy na P{'\n'}
                    Y zamieniamy na R{'\n'}
                    L zamieniamy na U{'\n'}
                    kryptogram: MPTRU{'\n'}
                </p>
              </div>
          </div>
          <Separator className={'mt-10 mb-10 col-span-5'}/>


          {/*ciphering section*/}
          <Heading2>Zaszyfruj lub odszyfruj wiadomość!</Heading2>
          <MutedParagraph>Poniżej znajduje się program, dzięki któremu możesz zaszyfrować lub odszyfrować swoją wiadomość w błyskawicznym tempie. Wystarczy podać treść, wybrać klucz, a następnie nacisnąć przycisk!</MutedParagraph>

          <form className={'gap-4 mt-4 col-span-5 grid grid-cols-12'} ref={cipherRef}>
              <Textarea className={'col-span-12 md:col-span-7'} type={"text"} name={'promptInput'} placeholder={'zaszyfruj lub odszyfruj wiadomość'}/>
              <div className={'md:col-span-5 col-span-12 grid grid-cols-2 border-box'}>
                  <div className={'col-span-1 md:col-span-2 mr-2 md:mr-0 grid grid-cols-1  border-box'}>
                    <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
                      <PopoverTrigger asChild>
                          <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={comboboxOpen}
                              className="col-span-6 justify-between"
                          >
                              {comboboxValue
                                  ? convertFormat(config.pairCiphers.find((key) => key === comboboxValue))
                                  : "Wybierz klucz..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                      </PopoverTrigger>
                      <PopoverContent className="col-span-6 p-0">
                          <Command>
                              <CommandInput placeholder="Wybierz klucz..." />
                              <CommandEmpty>No key found.</CommandEmpty>
                              <CommandGroup>
                                  {config.pairCiphers.map((key) => (
                                      <CommandItem
                                          key={key}
                                          value={key}
                                          onSelect={(currentValue) => {
                                              setComboboxValue(currentValue === comboboxValue ? "" : currentValue)
                                              setComboboxOpen(false)
                                          }}
                                      >
                                          <Check
                                              className={cn(
                                                  "mr-2 h-4 w-4",
                                                  comboboxValue === key ? "opacity-100" : "opacity-0"
                                              )}
                                          />
                                          {convertFormat(key)}
                                      </CommandItem>
                                  ))}
                              </CommandGroup>
                          </Command>
                      </PopoverContent>
                  </Popover>
                  </div>
                  <div className={'col-span-1 md:col-span-2 ml-2 md:ml-0 grid grid-cols-1 border-box'}>
                    <Button type={"submit"} variant={'secondary'} onClick={handleCipherSubmit}>submit</Button>
                  </div>
              </div>
          </form>

          <Output space={true} className={'bg-muted'}>
              {cipheredMessageData ? <>{cipheredMessageData}</> : <>{"Tutaj wyświetli się zaszyfrowana lub odszyfrowana wiadomość."}</>}
          </Output>
          <Separator className={'mt-10 mb-10 col-span-5'}/>


          {/*deciphering section*/}
          <Heading2>Odszyfruj wiadomość bez znajomości klucza!</Heading2>
          <MutedParagraph>Poniżej znajduje się program, dzięki któremu możesz odszyfrować wiadomość, bez znajomości klucz. Wystarczy podać treść, a następnie nacisnąć przycisk!</MutedParagraph>
          <Form reference={decipherRef} placeholder={'odszyfruj wiadomość o nieznanym kluczu'} buttonLabel={'nieznany klucz'} onClick={handleDecipherSubmit}></Form>

          {//works when program recognize cipher
                decipheredMessageData ?
                (decipheredMessageData.most_likely ?
                    <Output className={'bg-muted_green'}>
                        {decipheredMessageData.most_likely[0]} {'\n'}
                        {decipheredMessageData.most_likely[1]}
                    </Output>
            : null) :
                    <Output space={true} className={'bg-muted'}>
                        Tutaj wyświetli się odszyfrowana wiadomość.
                    </Output>}

            {//works when program can't recognize cipher
                decipheredMessageData ? decipheredMessageData.deciphered.map((arr) => {
                return(
                  arr[1] !== decipheredMessageData.most_likely[0] ? (
                      <Output key={arr[1]} className={decipheredMessageData.most_likely ? 'bg-muted_red' : 'bg-muted'}>
                        {arr[1]}{'\n'}
                        {arr[0]}
                      </Output>) : null
              );}) : null}

      </div>
  )
}

export default PairCiphers;