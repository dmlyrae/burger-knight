import React from "react"
import PropTypes from "prop-types"
import ErrorStyles from "./Error.module.css"

const Error = function({ errorMessage }) {
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
