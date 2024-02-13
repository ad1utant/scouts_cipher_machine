import {Separator} from "@/components/ui/separator.jsx";
import {Link} from "react-router-dom";
import {Code2, Github, Instagram, Sun} from 'lucide-react'
import {Button} from "@/components/ui/button.jsx";
function Nav(){
    return(
        <>
        <div className={'grid grid-cols-12 items-center p-2'}>
            <div className={'col-span-2'}/>
            <div className={'flex justify-between col-span-8'}>
                <div className={'font flex gap-4 items-center text-sm text-muted-foreground font-semibold'} >
                    <Link className={'text-lg text-foreground gap-1 text-lg font-semibold flex items-center'} to={'/'}>
                        <Code2 />
                        Scout Ciphers
                    </Link>
                    <Link to={'/'}>
                        Home
                    </Link>
                    <Link to={'/signin'}>
                        Sign&nbsp;in
                    </Link>
                </div>

                <div className={'flex items-center gap-1'}>
                    <a target={'_blank'} href={'https://github.com/ad1utant/scouts_cipher_machine'}>
                        <Button variant={'ghost'}>
                            <Github/>
                        </Button>
                    </a>
                    <a href={'https://www.instagram.com/kapral.kowalski/'} target={'_blank'}>
                        <Button variant={'ghost'}>
                            <Instagram/>
                        </Button>
                    </a>
                    <Link to={'/whitemode'}>
                        <Button variant={'ghost'}>
                            <Sun/>
                        </Button>
                    </Link>
                </div>

            </div>
            <div className={'col-span-2'}/>
        </div>
        <Separator/>
    </>
    )
}
export default Nav