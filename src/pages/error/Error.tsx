import React, { FC } from "react"
import PropTypes from "prop-types"
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

Error.propTypes = {
    errorMessage: PropTypes.string
}

export default Error;
