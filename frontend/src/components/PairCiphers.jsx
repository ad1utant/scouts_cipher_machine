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
    const formRef = useRef();
    const [comboboxOpen, setComboboxOpen] = React.useState(false)
    const [comboboxValue, setComboboxValue] = React.useState("")
    const [cipheredMessage, setCipheredMessage] = useState("")
    const handleSubmit = (event) => {
        event.preventDefault();
        const promptValue =  formRef.current.elements.promptInput.value;
        const keyValue = comboboxValue;
        async function fetchRequest(){
            try {
                const response = await fetch(`http://127.0.0.1:8000/${keyValue}+${promptValue}`);
                const newConsole = await response.json();
                const {newPrompt} = newConsole;
                console.log(newPrompt)
                setCipheredMessage(newPrompt)

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
          <p className={'mt-4 col-span-3 text-xl text-muted-foreground'}>W słowie szyfrowanym każdą kolejną literę podmieniamy na literę będącą w parze z literą podmienianą. W przypadku niewystępowania danej litery w kluczu, zostaje ona przepisana. Szyfry te nie uwzględniają polskich znaków.</p>
            <code className={'mt-4 col-span-5 whitespace-pre-line relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'}>

                Szyfr: GA-DE-RY-PO-LU-KI{'\n'}
                Wiadomość: MOTYL {'\n'}

                O zamieniamy na P{'\n'}
                Y zamieniamy na R{'\n'}
                L zamieniamy na U{'\n'}

                Kryptogram: MPTRU{'\n'}

            </code>

          <form className={'gap-4 mt-4 col-span-5 grid grid-cols-12'} ref={formRef}>
              <Textarea className={'col-span-7'} type={"text"} name={'promptInput'} placeholder={'zaszyfruj lub odszyfruj wiadomość'}/>
              <div className={'col-span-5 grid grid-cols-1'}>
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
                  <Button type={"submit"} onClick={handleSubmit}>submit</Button>
              </div>
          </form>


              {cipheredMessage ? <blockquote className={'mt-6 col-span-5 border-l-2 pl-6 italic'}>{cipheredMessage}</blockquote> : <blockquote className={'mt-6 col-span-5 border-l-2 pl-6 italic'}>Tutaj wyświetli się zaszyfrowana lub odszyfrowana wiadomość.</blockquote>}

      </div>
  )
}

export default PairCiphers;
