import React, { FC } from "react";
import MainStyles from "./Main.module.css";
import PropTypes from "prop-types";

const Main:FC<{children: React.ReactNode}> = ({children}) => {
	return (
		<main className={MainStyles.main}>
				{children}
		</main>
	)
}

export default Main;