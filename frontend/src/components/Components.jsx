import * as React from "react"
import '../styles/index.css';
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