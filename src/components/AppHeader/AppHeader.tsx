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

	const location = useLocation()

  	return (
		<header className={AppHeaderStyles.header}>
			<ul className={AppHeaderStyles.list_links}>
				<NavLink 
					to={routerConfig.main.path ?? `/`} 
					className={ () => {
						return `${AppHeaderStyles.link} p-4 ${location.pathname === routerConfig.main.path ? AppHeaderStyles.link_active : ''}`
					} }
				>
					<BurgerIcon type={"secondary"}></BurgerIcon>
					<p className="text text_type_main-default">
						{"Конструктор"}
					</p>
				</NavLink>
				<NavLink 
					to={'/feed'}
					className={ () => {
						return `${AppHeaderStyles.link} p-4 ${location.pathname.startsWith(`/feed`) ? AppHeaderStyles.link_active : ''}`
					} }
				>
					<ListIcon type={"secondary"}></ListIcon>
					<p className="text text_type_main-default">
						{"Лента заказов"}
					</p>
				</NavLink>
			</ul>
			<NavLink 
				className={AppHeaderStyles.logo}
				to={"/"}
			>
				<Logo />
			</NavLink>
			<NavLink 
				to={routerConfig.profile.path ?? `/`}
				className={ (isActive) => {
					return `${AppHeaderStyles.link} p-4 ${location.pathname.startsWith(routerConfig.profile.path ?? `/profile`) ? AppHeaderStyles.link_active : ''}`
				} }
			>
				<ProfileIcon type={"secondary"}></ProfileIcon>
				<p className="text text_type_main-default">
					{"Личный кабинет"}
				</p>
			</NavLink>
		</header>
  )
}

export default AppHeader