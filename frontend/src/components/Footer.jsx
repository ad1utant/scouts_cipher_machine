//import components
import {Link} from "react-router-dom";
import {Code2, Github, Instagram} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";
import {ModeToggle} from "@/components/mode-toggle.jsx";
import {Separator} from "@/components/ui/separator.jsx";

function Footer(){
    return(
        <div className={'mt-4'}>
            <Separator/>
            <div className={'grid grid-cols-12 items-center pt-4 pb-4'}>
                <div className={'col-span-1 md:col-span-2'}/>
                <div className={'flex justify-end md:justify-between col-span-10 md:col-span-8'}>
                    <div className={'font flex hidden md:block gap-4 items-center text-sm text-muted-foreground'} >
                        All rights reserved © 2024
                    </div>
                    <div className={'font flex gap-4 items-center text-sm text-muted-foreground'} >
                        Made by Mikołaj Marasek
                    </div>


                </div>
                <div className={'col-span-1 md:col-span-2'}/>
            </div>
        </div>
    )
}
export default Footer