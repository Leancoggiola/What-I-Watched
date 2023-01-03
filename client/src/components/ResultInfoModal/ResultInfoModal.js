
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Components
import { Modal, ModalBody, ModalFooter, ModalHeader} from '../../commonComponents/Modal';
import ErrorMessage from '../../commonComponents/ErrorMessage';
import LoadingSpinner from '../../commonComponents/LoadingSpinner';
import { Pill, PillGroup } from '../../commonComponents/Pill';
// Middleware
import { getOverviewDetailsRequest } from '../../middleware/actions/searchActions'
// Styling
import './ResultInfoModal.scss'
import AddItemForm from '../AddItemForm/AddItemForm';

const ResultInfoModal = (props) => {
    const { show, onClose, item} = props;
    const [ showAddItemForm, setShowAddItemForm  ] = useState(true);

    const data = {
        title:"The Beasts",
        type:"movie",
        releaseYear:2022,
        rating:7.6,
        genres: ["Thriller"],
        summary: "In the mythical continent of Westeros, several powerful families fight for control of the Seven Kingdoms. As conflict erupts in the kingdoms of men, an ancient enemy rises once again to threaten them all. Meanwhile, the last heirs of a recently usurped dynasty plot to take back their homeland from across the Narrow Sea."
    }
    // const dispatch = useDispatch()
    // const { loading, data, error } = useSelector((state) => state.search.contentDetails);

    // useEffect(() => {
    //     if(show) {
    //         dispatch(getOverviewDetailsRequest(item.id))
    //     }
    // }, [show])

    const getBodyContent = () => {
        if(false) { //CAMBIAR loading
            return <LoadingSpinner />
        }
        if(false) { //CAMBIAR error 
            return <ErrorMessage message={"No se encontro el contenido con id"} />
        }
        if(!isEmpty(data)) {
            return (
                <section className='result-overview'>
                    <article className='result-overview-img'>
                        <img src={item?.image?.url ? "": "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg"} alt={`${item?.title} portrait`} />
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
    
    return (
        <Modal show={true} onClose={onClose}>
            <ModalHeader>{item?.title}</ModalHeader>
            <ModalBody>
                {getBodyContent()}
            </ModalBody>
            {!isEmpty(data) && (
            <ModalFooter>
                {showAddItemForm ? 
                    <AddItemForm />
                    :
                    <button type='submit' onClick={() => setShowAddItemForm(true)}>
                        Añadir a la lista
                    </button>
                }
            </ModalFooter>)}
        </Modal>
    )
}

export default ResultInfoModal;