import ModalOverlayStyles from './ModalOverlay.module.css'
import PropTypes from "prop-types";

export const ModalOverlay = function({closeModal}) {
    const clickOnOverlay = (e) => {
        if (e.target === e.currentTarget) {
            closeModal()
        }
    }
    return (
        <div 
            className={ModalOverlayStyles.overlay}
            onClick={clickOnOverlay}
        />
    )
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node,
} 

export default ModalOverlay