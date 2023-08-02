import React, { FC } from "react"
import ErrorStyles from "./Error.module.css"

interface Error {
  errorMessage?: string;
}
const Error:FC<Error> = function({ errorMessage }) {
  return (
    <div 
      className={ErrorStyles.root}
    >
        {errorMessage}
    </div>
  )
}

export default Error;
