import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectFileData, clearStatus } from "../../context/fileDataSlice"

export default function Notifications() {
    let content;
    const dispatch = useDispatch()
    const { status, statusMessage, error } = useSelector(selectFileData)
    const [notification, setNotification] = useState('idle')

    useEffect(() => {
        setNotification(status)
        const timeout = setTimeout(() => dispatch(clearStatus()), 4000)
        return () => clearTimeout(timeout)
    }, [status, dispatch])
    
    if (notification === 'success') {
        content = <div className="notifications notifications__success">{statusMessage}</div>
    } else if (notification === 'error') {
        content = <div className="notifications notifications__error">{error}</div>
    }

    return content
}
