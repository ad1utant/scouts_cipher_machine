import {useRef} from "react";

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
          <form ref={formRef}>
              <input type={"text"} name={'promptInput'} placeholder={'prompt'}/>
              <input type={"text"} name={'keyInput'} placeholder={'key'}/>
              <button type={"submit"} onClick={handleSubmit}>submit</button>
          </form>
      </div>
  )
}

export default App;
