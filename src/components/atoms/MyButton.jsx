import React from 'react'
import { Button } from 'react-bootstrap';
const MyButton = ({title, variant, onClick, type='submit', isLoading, className}) => {
    if (isLoading) {
        return <Button variant={variant} type={type} className={className} disabled style={{cursor: 'not-allowed'}}>Loading...</Button>
    }
    return <Button variant={variant} type={type} className={className} onClick={onClick}>{title}</Button>
}
export default MyButton;