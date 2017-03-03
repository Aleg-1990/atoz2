import React from 'react'
import SelectField from 'material-ui/SelectField';

const SelectFieldRedux = ({ input, label, meta: { touched, error }, children, ...custom }) => (
    <SelectField
        floatingLabelText={label}
        hintText="Hint text"
        fullWidth={true}
        errorText={/*touched && */error}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom}/>
);

export default SelectFieldRedux;