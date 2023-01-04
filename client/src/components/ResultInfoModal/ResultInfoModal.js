
import { isEmpty, pick } from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { checkIfContentInList } from '../../utils';
// Components
import { Modal, ModalBody, ModalFooter, ModalHeader} from '../../commonComponents/Modal';
import ErrorMessage from '../../commonComponents/ErrorMessage';
import LoadingSpinner from '../../commonComponents/LoadingSpinner';
import { Pill, PillGroup } from '../../commonComponents/Pill';
import AddItemForm from '../AddItemForm/AddItemForm';
// Middleware
import { getOverviewDetailsRequest } from '../../middleware/actions/searchActions'
import { deleteItemFromListRequest, postItemToListRequest } from '../../middleware/actions/listActions';
// Styling
import './ResultInfoModal.scss'

const ResultInfoModal = (props) => {
    const { show, onClose, item } = props;
    const [ showAddItemForm, setShowAddItemForm  ] = useState(false);
    const { user } = useAuth0();

    const dispatch = useDispatch()
    
    const { loading, data, error } = useSelector((state) => state.search.contentDetails);
    const listCrud = useSelector((state) => state.list.crud);

    useEffect(() => {
        if(show) {
            dispatch(getOverviewDetailsRequest(item.id))
        }
    }, [show])

    useEffect(() => {
        if(!isEmpty(listCrud.data)) {
            setShowAddItemForm(false)
            onClose()
        }
    }, [listCrud.data])

    const handleSubmit = (app, status) => {
        const postBody = {
            user: user.email,
            content: {
                ...pick(data, ['title','type']),
                imageUrl: item?.image?.url,
                app,
                status
            }
        }
        dispatch(postItemToListRequest(postBody))
    }

    const handleDelete = () => {
        const postBody = { user: user.email, name: data.title}
        dispatch(deleteItemFromListRequest(postBody))
    }

    const getBodyContent = () => {
        if(loading) {
            return <LoadingSpinner showPosRelative={true} />
        }
        if(error) {
            return <ErrorMessage message={'No se encontro el contenido con id'} />
        }
        if(!isEmpty(data)) {
            return (
                <section className='result-overview'>
                    <article className='result-overview-img'>
                        <img src={item?.image?.url} alt={`${item?.title} portrait`} />
                    </article>
                    <article className='result-overview-info'>
                        <section className='result-overview-info-desc'>
                            <article className='result-overview-info-desc-headline'>
                                <h3>{data.type}</h3>
                                <span><b>Valoracion:</b> {data.rating} / 10</span>
                            </article>
                            <article className='result-overview-info-desc-body'>
                                <h4>Resumen:</h4>
                                <p>{data.summary}</p>
                                <span><i>Fecha de estreno: {data.releaseYear}</i></span>
                            </article>
                            <article>
                                <PillGroup >
                                    {data.genres.map((genre, index) => {
                                        return <Pill key={genre+index} variant='monochrome'>{genre}</Pill>
                                    })}
                                </PillGroup>
                            </article>
                        </section>
                    </article>
                </section>
            )
        }
    }

    const getFooterContent = () => { 
        if(listCrud.loading) {
            return <LoadingSpinner showPosRelative={true} />
        }
        if(showAddItemForm) {
            return <AddItemForm setShowAddItemForm={setShowAddItemForm} handleSubmit={handleSubmit} />
        }
        if(!item?.inList) {
            return (
                <button type='button' className='overview-footer-btn btn-primary btn' onClick={() => setShowAddItemForm(true)}>
                    Añadir a la lista
                </button>
            )
        } else {
            return (
                <button type='button' className='overview-footer-btn-remove overview-footer-btn btn' onClick={handleDelete}>
                    Eliminar a la lista
                </button>   
            )
        }
    }
    
    return (
        <Modal show={show} onClose={onClose}>
            <ModalHeader>{item?.title}</ModalHeader>
            <ModalBody>
                {getBodyContent()}
            </ModalBody>
            {!isEmpty(data) && (
            <ModalFooter className={'overview-footer'}>
                {getFooterContent()}
            </ModalFooter>)}
        </Modal>
    )
}

export default ResultInfoModal;