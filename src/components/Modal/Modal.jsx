import { useEffect } from "react"
import ModalOverlay from "../ModalOverlay/ModalOverlay"
import ModalStyles from "./Modal.module.css"
import { createPortal } from "react-dom"
import {
	CloseIcon
} from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types"

const rootModal = document.getElementById("root-modal") 

export const Modal = function({title, closeModal, children}) {

	useEffect(() => {
		const escapeListener = function(e) {
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
							<h2 className={`${ModalStyles['card-header__title']} text text_type_main-large`}>
								{title ?? ''}
							</h2>
							<div 
								className={ModalStyles['card-header__close-button']}
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

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  closeModal: PropTypes.func.isRequired
}

export default Modal