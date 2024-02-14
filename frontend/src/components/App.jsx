import PairCiphers from "@/components/PairCiphers.jsx";
import Nav from "@/components/Nav.jsx";
import { ThemeProvider } from "@/components/theme-provider"
function App(){
    return(
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
        </ThemeProvider>
    )
}
export default App