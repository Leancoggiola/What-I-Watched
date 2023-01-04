import { useState } from 'react';
import { useSelector } from 'react-redux';
// Components
import FormField from '../../commonComponents/FormField';
import Icon from '../../commonComponents/Icon';
import IconButton from '../../commonComponents/IconButton';
import Label from '../../commonComponents/Label';
import { Option, Select } from '../../commonComponents/Select';

import { navigationIcCheck, navigationIcClose } from '../../assets/icons';
// Styling
import './AddItemForm.scss';

const AddItemForm = (props) => {
    const { setShowAddItemForm, handleSubmit } = props;
    const [ status, setStatus ] = useState('');
    const [ app, setApp ] = useState('');

    const appList = useSelector((state) => state.meta.appList)
    const statusList = useSelector((state) => state.meta.statusList)

    const onSubmit = () => {
        const appInfo = appList.data.find(x => x.name === app)
        handleSubmit( appInfo.name, appInfo.displayName, status)
    }

    return (
        <div className='add-item'>
            <form className='add-item-form'>
                <FormField>
                    <Label>Aplicacion</Label>
                    <Select value={app} onChange={(e) => setApp(e)} required={true} >
                        {appList.data.map(option => (
                            <Option value={option.name} key={option.name} >
                                {option.displayName}
                            </Option>
                        ))}
                    </Select>
                </FormField>
                <FormField>
                    <Label>Status</Label>
                    <Select value={status} onChange={(e) => setStatus(e)} required={true}>
                        {statusList.data.map(option => (
                            <Option value={option.name} key={option.name} >
                                {option.name}
                            </Option>
                        ))}
                    </Select>
                </FormField>
            </form>
            <div className='add-item-footer'>
                    <IconButton className='add-item-footer-btn' onClick={onSubmit} disabled={!app || !status}>
                        <Icon src={navigationIcCheck} />
                    </IconButton>
                    <IconButton className='add-item-footer-btn' onClick={() => setShowAddItemForm(false)}>
                        <Icon src={navigationIcClose} />
                    </IconButton>
            </div>
        </div>
    )
}

export default AddItemForm;