import React from 'react'
import TextField from 'material-ui/TextField'

const TextFieldRedux = ({ input, label, placeholder, meta: { touched, error }, ...custom }) => (
    <TextField hintText={placeholder}
               floatingLabelText={label}
               errorText={touched && error}
               fullWidth={true}
               {...input}
               {...custom}
    />
)

export default TextFieldRedux;