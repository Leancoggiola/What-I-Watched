import { createContext, useEffect, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import FocusTrap from 'focus-trap-react';
import { navigationIcClose } from '../../assets/icons';
// Components
import IconButton from '../IconButton';
import Icon from '../Icon';
// Styling
import './Modal.scss';

const ModalContext = createContext({ closeModal: null })
const ModalProvider = ModalContext.Provider;

const Modal = (props) => {
    const { children, className, show, onClose } = props;
    const classes = `cc-modal-dialog-container ${className ? className: ''}`;
    
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
                <div className='cc-modal'>
                    <FocusTrap active={true} paused={false} focusTrapOptions={{}}>
                        <div role='dialog' className={classes}>
                            {children}
                        </div>
                    </FocusTrap>
                </div>
            </Portal>
        </ModalProvider>
    )
}

const ModalHeader = (props) => {
    const { children, className, closeModalButton } = props;
    const modal = useContext(ModalContext)
    const classes = `cc-modal-header ${className ? className: ''}`;

    const handleClick = (e) => {
        modal.closeModal();
    }

    return (
        <div className={classes}>
            <h3 className='cc-modal-header-headline'>{children}</h3>
            {closeModalButton ? 
            <div>{closeModalButton}</div>
            :
            <IconButton type='button' onClick={handleClick} >
                <Icon src={navigationIcClose} />
            </IconButton>}
        </div>
    )
}

const ModalBody = (props) => {
    const { children, className } = props;

    return (
        <div className={`cc-modal-body ${className ? className: ''}`}>
            {children}
        </div>
    )
}

const ModalFooter = (props) => {
    const { children, className } = props;

    return (
        <div className={`cc-modal-footer ${className ? className: ''}`}>
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