import React from "react";
import MainStyles from "./Main.module.css";
import PropTypes from "prop-types";

const Main = ({children}) => {
	return (
		<main className={MainStyles.main}>
				{children}
		</main>
	)
}

Main.propTypes = {
	children: PropTypes.node,
}

export default Main;