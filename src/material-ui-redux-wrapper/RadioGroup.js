import React from 'react'
import RadioButtonGroup from 'material-ui/RadioButton'

const RadioGroupRedux = ({ input, meta: { touched, error }, ...rest }) => (
    <div>
        <RadioButtonGroup {...input} {...rest}
                          valueSelected={input.value}
                          onChange={(event, value) => input.onChange(value)}/>
        {touched && error && <span>{error}</span>}
    </div>

)

export default RadioGroupRedux;