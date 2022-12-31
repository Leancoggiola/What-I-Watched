import { createContext, useEffect, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import FocusTrap from 'focus-trap-react';
import { navigationIcClose } from '../../assets/icons';
// Styling
import './Modal.scss';

const ModalContext = createContext({ closeModal: null })
const ModalProvider = ModalContext.Provider;

const Modal = (props) => {
    const { children, className, show, onClose } = props;
    
    const closeModal = () => {
        onClose()
        document.body.style.overflow = '';
    }

    useEffect(()=> {
        document.body.style.overflow = show ? 'hidden' : '';
    }, [show])

    return (
        <ModalProvider value={closeModal}>
            <Portal>
                <div className='modal-overlay'>
                    <FocusTrap active={true} paused={false} focusTrapOptions={{}}>
                        <div role='dialog' className={`modal-dialog-container ${className ? className: ''}`}>
                            {children}
                        </div>
                    </FocusTrap>
                </div>
            </Portal>
        </ModalProvider>
    )
}

const ModalHeader = (props) => {
    const { children, className, closeModalButton, closeButtomProps } = props;
    const modal = useContext(ModalContext)

    const handleClick = (e) => {
        modal.closeModal();
    }

    return (
        <div className={`modal-header ${className ? className: ''}`}>
            <h3 className='modal-header-headline'>{children}</h3>
            {closeModalButton ? 
            <div>{closeModalButton}</div>
            :
            <button type='button' onClick={handleClick} className='modal-header-icon-btn' {...closeButtomProps}>
                BUTON HERE
            </button>}
        </div>
    )
}

const ModalBody = (props) => {
    const { children, className } = props;

    return (
        <div className={`modal-body ${className ? className: ''}`}>
            {children}
        </div>
    )
}

const ModalFooter = (props) => {
    const { children, className } = props;

    return (
        <div className={`modal-footer ${className ? className: ''}`}>
            {children}
        </div>
    )
}

const Portal = ({children}) => {
    const [ modalRoot, setModalRoot ] = useState();

    const createModalRoot = () => {
        const modalRoot = document.createElement('div');
        modalRoot.setAttribute('id', 'modal');
        modalRoot.setAttribute('class', 'modal-root')
        document.body.appendChild(modalRoot)
        return modalRoot;
    }

    // layoutEffect to avoid create duplicates
    useLayoutEffect(() => {
        let newModal = document.getElementById('modal');
        let justCreated = false;
        if(!newModal) {
            newModal = createModalRoot();
            justCreated = true
        }
        setModalRoot(modalRoot);
        return () => {
            if(justCreated && newModal.parentNode) {
                newModal.parentNode.removeChild(newModal);
            }
        }
    }, [])

    if(!modalRoot) {
        return null
    }

    return createPortal(children, modalRoot)
}

export { Modal, ModalHeader, ModalBody, ModalFooter };