import React, { FunctionComponent } from "react";
import MainStyles from "./Main.module.css";
import { TChildren } from "../../types/commonTypes";

const Main:FunctionComponent<TChildren> = ({children}) => {
  return (
    <main className={MainStyles.main}>
        {children}
    </main>
  )
}

export default Main;