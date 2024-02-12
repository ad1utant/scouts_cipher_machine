import '../styles/index.css'
import {useRef} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input.jsx";

function PairCiphers() {
    const formRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        const promptValue =  formRef.current.elements.promptInput.value;
        const keyValue = formRef.current.elements.keyInput.value;
        async function fetchRequest(){
            try {
                const response = await fetch(`http://127.0.0.1:8000/${keyValue}+${promptValue}`);
                const newConsole = await response.json();
                const {newPrompt} = newConsole;
                console.log(newPrompt)
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
          <p className={'mt-4 col-span-3 text-xl text-muted-foreground'}>W słowie szyfrowanym każdą kolejną literę podmieniamy na literę będącą w parze z literą podmienianą. W przypadku niewystępowania danej litery w kluczu, zostaje ona przepisana.</p>
            <code className={'mt-4 col-span-5 whitespace-pre-line relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'}>

                Szyfr: GA-DE-RY-PO-LU-KI{'\n'}
                Wiadomość: MOTYL {'\n'}

                O zamieniamy na P{'\n'}
                Y zamieniamy na R{'\n'}
                L zamieniamy na U{'\n'}

                Kryptogram: MPTRU{'\n'}

            </code>
          <form className={'col-span-5'} ref={formRef}>
              <Input type={"text"} name={'promptInput'} placeholder={'prompt'}/>
              <Input type={"text"} name={'keyInput'} placeholder={'key'}/>
              <Button type={"submit"} onClick={handleSubmit}>submit</Button>
          </form>
      </div>
  )
}

export default PairCiphers;
