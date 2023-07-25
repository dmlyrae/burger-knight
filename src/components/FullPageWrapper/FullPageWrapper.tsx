import { FC } from "react"
import cl from "./FullPageWrapper.module.css"



export const FullPageWrapper:FC<{children:React.ReactNode}> = function(props){
    const { children } = props;
    return (
        <div className={cl["root"]}>
            {children}
        </div>
   ) 
}