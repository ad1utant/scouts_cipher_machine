import '../styles/index.css'
import {useRef} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input.jsx";

function App() {
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
      <div>
          <form className={'flex justify-center gap-2'} ref={formRef}>
              <Input type={"text"} name={'promptInput'} placeholder={'prompt'}/>
              <Input type={"text"} name={'keyInput'} placeholder={'key'}/>
              <Button type={"submit"} onClick={handleSubmit}>submit</Button>
          </form>
      </div>
  )
}

export default App;
