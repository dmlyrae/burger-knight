import React, { FC } from "react";
import MainStyles from "./Main.module.css";

const Main:FC<{children: React.ReactNode}> = ({children}) => {
	return (
		<main className={MainStyles.main}>
				{children}
		</main>
	)
}

export default Main;