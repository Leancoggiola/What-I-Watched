import { Pill } from '../../commonComponents/Pill';
// Styling
import './StatusPill.scss'

const StatusPill = ({ status }) => {
    const classes = `status-pill-${status?.toLowerCase()}`
    return (
        <Pill className={classes}>{status}</Pill>
    )
}

export default StatusPill;