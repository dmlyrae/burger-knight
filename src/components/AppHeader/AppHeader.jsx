import React from "react"
import { Routes, Route, NavLink, useLocation } from "react-router-dom"
import AppHeaderStyles from "./Appheader.module.css"
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components"
import { routerConfig } from "../../utils/routerConfig"

const AppHeader = () => {
	const location = useLocation();
  	return (
		<header className={AppHeaderStyles.header}>
			<ul className={AppHeaderStyles.list_links}>
				<NavLink 
					to={routerConfig.main.path} 
					className={ () => {
						return `${AppHeaderStyles.link} p-4 ${location.pathname === routerConfig.main.path ? AppHeaderStyles.link_active : ''}`
					} }
				>
					<BurgerIcon type={"secondary"}></BurgerIcon>
					<p className="text text_type_main-default">Конструктор</p>
				</NavLink>
				<NavLink 
					to={'/history'}
					className={ () => {
						return `${AppHeaderStyles.link} p-4 ${location.pathname === '/history' ? AppHeaderStyles.link_active : ''}`
					} }
				>
					<ListIcon type={"secondary"}></ListIcon>
					<p className="text text_type_main-default">Лента заказов</p>
				</NavLink>
			</ul>
			<div className={AppHeaderStyles.logo}>
			<Logo />
			</div>
			<NavLink 
				to={routerConfig.profile.path}
				className={ (isActive) => {
					return `${AppHeaderStyles.link} p-4 ${location.pathname.startsWith(routerConfig.profile.path) ? AppHeaderStyles.link_active : ''}`
				} }
			>
				<ProfileIcon type={"secondary"}></ProfileIcon>
				<p className="text text_type_main-default">Личный кабинет</p>
			</NavLink>
		</header>
  )
}

AppHeader.propTypes = {}

export default AppHeader