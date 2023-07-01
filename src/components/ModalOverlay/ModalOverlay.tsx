import { FC } from 'react';
import ModalOverlayStyles from './ModalOverlay.module.css'


type ModalOverlay = {
    closeModal: () => void,
}
export const ModalOverlay:FC<ModalOverlay> = function({closeModal}) {
    const clickOnOverlay = (e:React.MouseEvent) => {
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


export default ModalOverlay