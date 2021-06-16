import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

const FormComponent = (props) => {
    return (
        <FormGroup className="p-2">
            <Label>{props.label}</Label>
            <Input
            value={props.state}
            onChange={props.fn} 
            className="form-control" 
            type={props.type} 
            name={props.name} 
            id={props.id} 
            placeholder={props.placeholder}/>
        </FormGroup>
    )
}

export default FormComponent
