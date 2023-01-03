import { useState } from 'react';
import { useSelector } from 'react-redux';
// Components
import FormField from '../../commonComponents/FormField'
import Icon from '../../commonComponents/Icon';
import IconButton from '../../commonComponents/IconButton';
import Label from '../../commonComponents/Label';
import { Select, Option} from '../../commonComponents/Select';

import { navigationIcCheck, navigationIcClose } from '../../assets/icons';
// Styling
import './AddItemForm.scss';

const AddItemForm = (props) => {
    const { onSubmit, onCancel } = props;
    const [ status, setStatus ] = useState();
    const [ app, setApp ] = useState();

    const { data } = useSelector((state) => state.apps.list);


    return (
        <div className='add-item'>
            <form className='add-item-form'>
                <FormField>
                    <Label>Aplicacion</Label>
                    <Select value={app} onChange={(e) => setApp(e)} required={true} >
                        {data.map(option => (
                                <Option value={option.displayName} key={option.name} >
                                    {option.displayName}
                                </Option>
                        ))}
                    </Select>
                </FormField>
            </form>
            <div className='add-item-footer'>
                    <IconButton className='add-item-footer-btn'>
                        <Icon src={navigationIcCheck} />
                    </IconButton>
                    <IconButton className='add-item-footer-btn'>
                        <Icon src={navigationIcClose} />
                    </IconButton>
            </div>
        </div>
    )
}

export default AddItemForm;