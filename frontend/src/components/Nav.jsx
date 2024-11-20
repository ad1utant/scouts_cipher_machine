import {Separator} from "@/components/ui/separator.jsx";
import {Link} from "react-router-dom";
import {Code2, Github, Instagram, Sun} from 'lucide-react'
import {Button} from "@/components/ui/button.jsx";
import {ModeToggle} from "@/components/mode-toggle.jsx";
function Nav(){
    return(
        <>
        <div className={'grid grid-cols-12 items-center p-2'}>
            <div className={'col-span-1 md:col-span-2'}/>
            <div className={'flex justify-end md:justify-between col-span-10 md:col-span-8'}>
                <div className={'font hidden md:flex gap-4 items-center text-sm text-muted-foreground font-semibold'} >
                    <Link className={'text-lg text-foreground gap-1 font-semibold flex items-center'} to={'/'}>
                        <Code2 />
                        Scout&nbsp;Ciphers
                    </Link>
                    <Link to={'/pair'}>
                        Podstawieniowe
                    </Link>
                    <Link to={'/morse'}>
                        Morse'a
                    </Link>
                    <Link to={'/fract'}>
                        Ułamkowy
                    </Link>
                    <Link to={'/rsa'}>
                        RSA
                    </Link>
                </div>

                <div className={'flex items-center gap-4'}>
                    <a target={'_blank'} href={'https://github.com/ad1utant/scouts_cipher_machine'}>
                        <Button variant={'ghost'} size={'icon'}>
                            <Github/>
                        </Button>
                    </a>
                    <a href={'https://www.instagram.com/mikolaj.marasek/'} target={'_blank'}>
                        <Button variant={'ghost'} size={'icon'}>
                            <Instagram/>
                        </Button>
                    </a>
                    <ModeToggle/>
                </div>

            </div>
            <div className={'col-span-1 md:col-span-2'}/>
        </div>
        <Separator/>
    </>
    )
}
export default Nav