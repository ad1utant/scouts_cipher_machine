import '../styles/fraction.css'
import * as React from "react";

function Fractions(){
    return (
        <div className={'grid grid-cols-5'}>
            <h1 className={'col-span-5 mt-4 scroll-m-20 text-4xl font-extrabold lg:text-5xl'}>Szyfr ułamkowy</h1>
            <p className={'mt-4 col-span-5 text-xl text-muted-foreground'}>Aby zaszyfrować literę, należy odnaleźć ją w
                kluczu i zastąpić ułamkiem według schematu:</p>
            <div className={'flex gap-4 mt-4 bg-muted col-span-5 p-4 rounded'}>
                <div className="frac">
                    <span>a&nbsp;b&nbsp;c&nbsp;d&nbsp;e</span>
                    <span className="symbol">/</span>
                    <span className="bottom">1</span>
                </div>
                <div className="frac">
                    <span>f&nbsp;g&nbsp;h&nbsp;i&nbsp;j</span>
                    <span className="symbol">/</span>
                    <span className="bottom">1</span>
                </div>
                <div className="frac">
                    <span>k&nbsp;l&nbsp;m&nbsp;n&nbsp;o</span>
                    <span className="symbol">/</span>
                    <span className="bottom">1</span>
                </div>
                <div className="frac">
                    <span>p&nbsp;r&nbsp;s&nbsp;t&nbsp;u</span>
                    <span className="symbol">/</span>
                    <span className="bottom">1</span>
                </div>
                <div className="frac">
                    <span>w&nbsp;y&nbsp;z</span>
                    <span className="symbol">/</span>
                    <span className="bottom">1</span>
                </div>

            </div>
            <p className={'mt-4 col-span-5 text-xl text-muted-foreground'}>licznik jest indeksem
                litery występującej w swoim „ułamku”, zaś mianownik jest przepisywany zgodnie z numerem grupy.</p>
        </div>
    )
}

export default Fractions