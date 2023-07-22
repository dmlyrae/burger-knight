import { FC, useEffect } from "react"
import ModalOverlay from "../ModalOverlay/ModalOverlay"
import ModalStyles from "./Modal.module.css"
import { createPortal } from "react-dom"
import {
	CloseIcon
} from "@ya.praktikum/react-developer-burger-ui-components"
import { TCard } from "../../types/cards"

const rootModal = document.getElementById("root-modal") as HTMLDivElement; 

interface Modal {
	title: string;
	closeModal: {
		(data:TCard): void,
		(): void,
	}
	children: React.ReactNode,
}
export const Modal:FC<Modal> = function(props):React.ReactPortal {

	const {title, closeModal, children} = props

	useEffect(() => {
		const escapeListener = function(e:KeyboardEvent) {
			if (e.key === "Escape") closeModal()
		}
		document.addEventListener('keydown', escapeListener)
		return () => document.removeEventListener('keydown', escapeListener)
	}, [])

	return createPortal(
				<>
					<ModalOverlay closeModal={closeModal} />
					<div className={`${ModalStyles['modal-card']} p-10 pb-12`}>
						<div className={ModalStyles['modal-card__header']}>
							{
								title && (
									<h2 className={`${ModalStyles['card-header__title']} text text_type_main-large`}>
										{title}
									</h2>
								) 
							}
							<div 
								className={[ModalStyles['card-header__close-button'], (title ? "": ModalStyles["empty-header"])].join(" ")}
							>
								<CloseIcon 
									type={"secondary"} 
									onClick={closeModal}
								/>
							</div>
						</div>
						<div className={ModalStyles['modal-card__body']}>
							{children}
						</div>
					</div>
				</>,
				rootModal
			) 
}

export default Modal