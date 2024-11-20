// components
import {ThemeProvider} from "@/components/theme-provider";
import PairCiphers from "@/components/PairCiphers.jsx";
import Nav from "@/components/Nav.jsx";
import Footer from "@/components/Footer.jsx";
import Fractions from "@/components/Fractions.jsx";
import Morsea from "@/components/Morsea.jsx";
import Rsa from "@/components/Rsa.jsx";

//other
import {Routes, Route, Navigate} from "react-router-dom";

function App(){
    return(
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className={'grid grid-cols-12'}>
                <div className={'col-span-12'}>
                        <Nav/>
                </div>

                <div className={'col-span-1 md:col-span-2'}/>

                <div className={'col-span-10 md:col-span-8'}>
                    <Routes>
                        <Route path={'/pair'} element={<PairCiphers/>}/>
                        <Route path={'/'} element={<Navigate to={'/pair'}/>}/>
                        <Route path={'/fract'} element={<Fractions/>} />
                        <Route path={'/morse'} element={<Morsea/>} />
                        <Route path={'/rsa'} element={<Rsa/>} />
                    </Routes>
                </div>

                <div className={'col-span-1 md:col-span-2'}/>

                <div className={'col-span-12'}>
                    <Footer/>
                </div>
            </div>
        </ThemeProvider>
    )
}
export default App