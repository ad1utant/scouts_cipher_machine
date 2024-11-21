import * as React from "react"
import '../styles/index.css';
import {Textarea} from "@/components/ui/textarea.jsx";
import {Button} from "@/components/ui/button.jsx";
const Heading1 = ({children, className}) =>
{
    return (
        <h1 className={`col-span-5 scroll-m-20 text-4xl font-extrabold lg:text-5xl ${className}`}>
            {children}
        </h1>
    )
}
export {Heading1}
const Heading2 = ({children, className}) =>
{
    return (
        <h1 className={`col-span-5 scroll-m-20 text-3xl font-extrabold tracking ${className}`}>
            {children}
        </h1>
    )
}
export {Heading2}
const Heading4 = ({children, className}) =>
{
    return (
        <h4 className={`col-span-1 scroll-m-20 text-xl font-bold ${className}`}>
            {children}
        </h4>
    )
}
export {Heading4}
const MutedParagraph = ({children, className}) =>
{
    return (
        <p className={`col-span-5 text-xl text-muted-foreground ${className}`}>
            {children}
        </p>
    )
}
export {MutedParagraph}

const Output = ({children, className, space}) =>
{
    return (
        <div className={`rounded col-span-5 mt-4 p-4 items-center ${className}`}>
            <blockquote className={'col-span-5 border-l-2 whitespace-pre-line pl-6 italic'}>
                {children}
                {space ? <>{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</> : null}
            </blockquote>
        </div>
    )
}
export {Output}

const Form = ({reference, buttonLabel, placeholder, onClick}) => {
    return(
        <form className={'gap-4 mt-4 col-span-5 grid grid-cols-12'} ref={reference}>
            <Textarea className={'col-span-12 md:col-span-7 mr-2 md:mr-0'} type={"text"} name={'textarea'} placeholder={placeholder}/>
            <div className={'col-span-12 md:col-span-5 grid grid-cols-2'}>
                <Button type={'submit'} className={'col-span-1 md:col-span-2'} disabled variant={'outline'}>{buttonLabel}</Button>
                <Button className={'col-span-1 md:col-span-2 ml-2 md:ml-0'} variant={'secondary'} type={"submit"} onClick={onClick}>submit</Button>
            </div>
        </form>
    )
}
export {Form}

const FormRsa = ({reference, onClick, placeholder}) => {
    return(
        <form className={'gap-4 mt-4 col-span-5 grid grid-cols-12'} ref={reference}>
            <div className={'bg-muted rounded col-span-12 md:col-span-7 p-4 mr-0 lg:mr-2'}>Wpisz długość klucza, by móc go wygenerować!</div>
            <div className={'col-span-12 md:col-span-5 grid grid-cols-2'}>
                <Textarea className={'h-10 justify-items-center col-span-1 md:col-span-2'} type={"text"} name={'textarea'} placeholder={placeholder}/>
                <Button className={'col-span-1 md:col-span-2 ml-2 md:ml-0 min-h-0'} variant={'secondary'} type={"submit"} onClick={onClick}>submit</Button>
            </div>
        </form>
    )
}
export {FormRsa}