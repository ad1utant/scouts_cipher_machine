import PairCiphers from "@/components/PairCiphers.jsx";
import Nav from "@/components/Nav.jsx";

function App(){
    return(
        <div className={'grid grid-cols-12'}>
            <div className={'col-span-12'}>
                    <Nav/>
            </div>
            <div className={'col-span-2'}/>
            <div className={'col-span-8'}>
                <PairCiphers/>
            </div>
            <div className={'col-span-2'}/>
        </div>
    )
}
export default App