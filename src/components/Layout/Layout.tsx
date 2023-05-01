import React, { FunctionComponent } from "react";
import LayoutStyles from "./Layout.module.css";
import AppHeader from '../AppHeader/AppHeader';
import { TChildren } from "../../types/commonTypes";
import Main from "../Main/Main";

const Layout:FunctionComponent<TChildren> = function ({children}) {
  return (
    <div className={LayoutStyles['content-wrapper']}>
      <AppHeader />
      <Main>
        {children}
      </Main>
    </div>
  );
}

export default Layout;