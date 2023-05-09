import React from "react";
import PropTypes from "prop-types";

const ErrorPage = function({ errorMessage }) {
  return (
    <>
        {errorMessage}
    </>
  )
}

ErrorPage.propTypes = {
    errorMessage: PropTypes.string
}

export default ErrorPage
