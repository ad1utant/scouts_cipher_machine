import '../styles/index.css'
import {useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input.jsx";
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Textarea} from "@/components/ui/textarea.jsx";
import {Separator} from "@/components/ui/separator.jsx";
const keys = [
    {
        value: "gaderypoluki",
        label: "GA-DE-RY-PO-LU-KI",
    },
    {
        value: "kularyminote",
        label: "KU-LA-RY-MI-NO-TE",
    },
    {
        value: "koniecmatury",
        label: "KO-NI-EC-MA-TU-RY",
    },
    {
        value: "politykarenu",
        label: "PO-LI-TY-KA-RE-NU",
    },
    {
        value: "malinowebuty",
        label: "MA-LI-NO-WE-BU-TY",
    },
]
function PairCiphers(props) {
    const cipherDecipherRef = useRef();
    const decipherRef = useRef();
    const [comboboxOpen, setComboboxOpen] = React.useState(false)
    const [comboboxValue, setComboboxValue] = React.useState("")
    const [cipheredDecipheredMessage, setCipheredDecipheredMessage] = useState("")
    const [decipheredMessageData, setDecipheredMessageData] = useState("")

    const handleDecipherSubmit = (event) => {
        event.preventDefault();
        const textareaValue =  decipherRef.current.elements.textarea.value;
        async function fetchRequest(){
            try {
                const response = await fetch(`http://127.0.0.1:8000/${textareaValue}`);
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


    const handleCipherDecpiherSubmit = (event) => {
        event.preventDefault();
        const promptValue =  cipherDecipherRef.current.elements.promptInput.value;
        const keyValue = comboboxValue;
        async function fetchRequest(){
            try {
                const response = await fetch(`http://127.0.0.1:8000/${keyValue}+${promptValue}`);
                const newConsole = await response.json();
                const {newPrompt} = newConsole;
                console.log(newPrompt)
                setCipheredDecipheredMessage(newPrompt)

            } catch (err) {
                console.error(err)
            }
        }
        fetchRequest()


    }
  return (
      <div className={'grid mt-4 grid-cols-5'}>
          <h1 className={'col-span-3 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'}>Monoalfabetyczne szyfry podstawieniowe</h1>
          <div className={'col-span-2'}></div>
          <p className={'mt-4 col-span-5 text-xl text-muted-foreground'}>W słowie szyfrowanym każdą kolejną literę podmieniamy na literę będącą w parze z literą podmienianą. W przypadku niewystępowania danej litery w kluczu, zostaje ona przepisana. Szyfry te nie uwzględniają polskich znaków.</p>
          <div className={'grid grid-cols-6 col-span-5 justify-between'}>
              <div className={'items-start rounded mt-4 bg-muted p-4 col-span-3 mr-2'}>
                  <h4 className={'col-span-1 scroll-m-20 text-xl font-bold tracking-tight'}>Lista szyfrów monoalfabetycznych</h4>
                  <ul className="list-disc p-0 m-0 ps-1 [&>li]:mt-1 list-inside">
                      <li>GA-DE-RY-PO-LU-KI</li>
                      <li>KU-LA-RY-MI-NO-TE</li>
                      <li>KO-NI-EC-MA-TU-RY</li>
                      <li>PO-LI-TY-KA-RE-NU</li>
                      <li>MA-LI-NO-WE-BU-TY</li>
                  </ul>
              </div>

              <div className={'items-start rounded mt-4 bg-muted p-4 col-span-3 ml-2'}>
                <h4 className={'col-span-1 scroll-m-20 text-xl font-bold tracking-tight'}>Proces Szyfrowania</h4>
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
          <Separator className={'mt-4 col-span-5'}/>
          <h2 className={'col-span-5 mt-4 scroll-m-20 pb-2 text-3xl font-extrabold tracking-tight first:mt-0'}>Zaszyfruj lub odszyfruj wiadomość!</h2>
          <p className={'col-span-5 text-xl text-muted-foreground'}>Poniżej znajduje się program, dzięki któremu możesz zaszyfrować lub odszyfrować swoją wiadomość w błyskawicznym tempie. Wystarczy podać treść, wybrać klucz, a następnie nacisnąć przycisk!</p>

          <form className={'gap-4 mt-4 col-span-5 grid grid-cols-12'} ref={cipherDecipherRef}>
              <Textarea className={'col-span-7'} type={"text"} name={'promptInput'} placeholder={'zaszyfruj lub odszyfruj wiadomość'}/>
              <div className={'col-span-5 grid grid-cols-1 border-box'}>
                  <div className={'col-span-5 grid grid-cols-1 border-box'}>
                    <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
                      <PopoverTrigger asChild>
                          <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={comboboxOpen}
                              className="col-span-6 justify-between"
                          >
                              {comboboxValue
                                  ? keys.find((key) => key.value === comboboxValue)?.label
                                  : "Wybierz klucz..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                      </PopoverTrigger>
                      <PopoverContent className="col-span-6 p-0">
                          <Command>
                              <CommandInput placeholder="Wybierz klucz..." />
                              <CommandEmpty>No key found.</CommandEmpty>
                              <CommandGroup>
                                  {keys.map((key) => (
                                      <CommandItem
                                          key={key.value}
                                          value={key.value}
                                          onSelect={(currentValue) => {
                                              setComboboxValue(currentValue === comboboxValue ? "" : currentValue)
                                              setComboboxOpen(false)
                                          }}
                                      >
                                          <Check
                                              className={cn(
                                                  "mr-2 h-4 w-4",
                                                  comboboxValue === key.value ? "opacity-100" : "opacity-0"
                                              )}
                                          />
                                          {key.label}
                                      </CommandItem>
                                  ))}
                              </CommandGroup>
                          </Command>
                      </PopoverContent>
                  </Popover>
                  </div>
                  <div className={'col-span-5 grid grid-cols-1 border-box'}>
                    <Button type={"submit"} onClick={handleCipherDecpiherSubmit}>submit</Button>
                  </div>
              </div>
          </form>
          <div className={'rounded  col-span-5 bg-muted mt-4 p-4 items-center'}>
            {cipheredDecipheredMessage ? <blockquote className={'col-span-5 border-l-2 whitespace-pre-line pl-6 italic'}>{cipheredDecipheredMessage}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</blockquote> : <blockquote className={'col-span-5 border-l-2 whitespace-pre-line pl-6 italic'}>Tutaj wyświetli się zaszyfrowana lub odszyfrowana wiadomość. {'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</blockquote>}
          </div>
          <Separator className={'mt-4 col-span-5'}/>
          <h2 className={'col-span-5 mt-4 scroll-m-20 pb-2 text-3xl font-extrabold tracking-tight first:mt-0'}>Odszyfruj wiadomość bez znajomości klucza!</h2>
          <p className={'col-span-5 text-xl text-muted-foreground'}>Poniżej znajduje się program, dzięki któremu możesz odszyfrować wiadomość, bez znajomości klucz. Wystarczy podać treść, a następnie nacisnąć przycisk!</p>

          <form className={'gap-4 mt-4 col-span-5 grid grid-cols-12'} ref={decipherRef}>
              <Textarea className={'col-span-7'} type={"text"} name={'textarea'} placeholder={'odszyfruj wiadomość o nieznanym kluczu'}/>
              <div className={'col-span-5 grid grid-cols-1e'}>
                        <Button type={'submit'} className={'col-span-1 flex justify-center'} disabled variant={'outline'}>Kryptogram o nieznanym kluczu</Button>
                        <Button className={'col-span-1'} variant={''} type={"submit"} onClick={handleDecipherSubmit}>submit</Button>
              </div>


          </form>
          <div className={'rounded  col-span-5 bg-muted_green mt-4 p-4 items-center'}>
            {decipheredMessageData ? <blockquote className={'col-span-5 border-l-2 pl-6 italic whitespace-pre-line'}>
                {decipheredMessageData.most_likely[0]} {'\n'}
                {decipheredMessageData.most_likely[1]} {'\n'}

            </blockquote> : <blockquote className={'whitespace-pre-line col-span-5 border-l-2 pl-6 italic'}>Tutaj wyświetli się odszyfrowana wiadomość.{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</blockquote>}
          </div>


          
          {decipheredMessageData ? decipheredMessageData.deciphered.map((arr) => {
              return(
                  arr[1] !== decipheredMessageData.most_likely[0] ? (<div className={'rounded col-span-5 bg-muted_red mt-4 p-4 items-center'}>
                  <blockquote className={'col-span-5 border-l-2 pl-6 italic whitespace-pre-line'}>
                      {arr[1]}{'\n'}
                      {arr[0]}{'\n'}
                  </blockquote>
              </div>) : null
              );}) : null}
      </div>
  )
}

export default PairCiphers;
