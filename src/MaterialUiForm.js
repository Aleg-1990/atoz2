/**
 * Created by oleg on 27.02.17.
 */
import React from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem'
// import asyncValidate from './asyncValidate'

const choices = {
    appliance: [
        'Cooktop',
        'Dishwasher',
        'Dryer',
        'Exhaust fan/Hood',
        'Freezer (free standing)',
        'Garbage Disposal',
        'Ice machine (free standing)',
        'Microwave',
        'Oven',
        'Range',
        'Refrigerator',
        'Stackable dryer',
        'Stackable washer',
        'Trash Compactor',
        'Washer',
        'Wine cooler'
    ],
    brand: [
        'Amana',
        'ASKO',
        'Bertazzoni',
        'BOSCH'
    ]
};

const validate = values => {
    const errors = {}
    if (!values.appliances || !values.appliances.length) {
        errors.appliances = { _error: 'At least one appliance must be entered' }
    } else {
        const appliancesArrayErrors = []
        values.appliances.forEach((appliance, memberIndex) => {
            const appliancesErrors = {}

            const requiredApplianceFields = [ 'appliance', 'brand']
            requiredApplianceFields.forEach(field => {
                if (!appliance || !appliance[ field ]) {
                    appliancesErrors[ field ] = 'Required'
                    appliancesArrayErrors[memberIndex] = appliancesErrors
                }
            })
        })
        if(appliancesArrayErrors.length) {
            errors.appliances = appliancesArrayErrors
        }
    }


    const requiredFields = ['firstName', 'lastName', 'region' ]
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Required'
        }
    })
    return errors
}

const renderTextField = ({ input, label, placeholder, meta: { touched, error }, ...custom }) => (
    <TextField hintText={placeholder}
               floatingLabelText={label}
               errorText={touched && error}
               fullWidth={true}
               {...input}
               {...custom}
    />
)

const renderAutoComplete = ({ input, label, placeholder, dataSource, meta: { touched, error }, ...custom }) => (
    <AutoComplete hintText={placeholder}
               floatingLabelText={label}
                  searchText={input.value}
               errorText={touched && error}
                  listStyle={ {overflowY: 'auto', maxHeight: '50vh'} }
               fullWidth={true}
                  filter={(searchText, key) => (AutoComplete.caseInsensitiveFilter(searchText, key) || searchText === '')}
                  openOnFocus={true}
                  dataSource={dataSource}
               {...input}
               {...custom}
    />
)

const renderCheckbox = ({ input, label }) => (
    <Checkbox label={label}
              checked={input.value ? true : false}
              onCheck={input.onChange}/>
)

const renderRadioGroup = ({ input, meta: { touched, error }, ...rest }) => (
<div>
    <RadioButtonGroup {...input} {...rest}
                      valueSelected={input.value}
                      onChange={(event, value) => input.onChange(value)}/>
    {touched && error && <span>{error}</span>}
</div>

)

const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
    <SelectField
        floatingLabelText={label}
        floatingLabelFixed={true}
        hintText="Hint text"
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom}/>
);

const renderSubFields = (member, index, fields) => (
    <div key={index}>
        <div>
            <Field
                name={`${member}.appliance`}
                component={renderAutoComplete}
                label="Appliance"
                placeholder="Type the appliance"
                dataSource={choices.appliance}/>
        </div>
        <div>
            <Field
                name={`${member}.brand`}
                component={renderAutoComplete}
                label="Brand"
                placeholder="Type the brand"
                dataSource={choices.brand}/>
        </div>
        {fields.length > 1 && <RaisedButton
            label="Remove the appliance"
            secondary={true}
            fullWidth={true}
            onClick={() => fields.remove(index)}/>}
        <hr />
    </div>
);

const renderAppliances = ({fields, meta: { touched, error } }) => (
    <div>
        {fields.map(renderSubFields)}
        {error && <span>{error}</span>}
        <RaisedButton
            label="Add another appliance"
            primary={true}
            fullWidth={true}
            onClick={() => fields.push({})}/>
    </div>
)

const MaterialUiForm = props => {

    const {afterSubmit, handleSubmit, pristine, reset, submitting } = props

    return (
        <div className="container">
        <form onSubmit={handleSubmit(afterSubmit)}>
            <div>
                <FieldArray
                    name="appliances"
                    component={renderAppliances}
                />
            </div>

            <div>
                <Field name="firstName" component={renderTextField} label="First Name"/>
            </div>
            <div>
                <Field name="lastName" component={renderTextField} label="Last Name"/>
            </div>
            <div>
                <Field name="region" component={renderRadioGroup}>
                    <RadioButton value="CA" label="California"/>
                    <RadioButton value="DC" label="District of Columbia"/>
                </Field>
            </div>
            <div>
                <Field name="notes" component={renderTextField} label="Notes" multiLine={true} rows={2}/>
            </div>
            <div>
                <RaisedButton
                    label="Clear"
                    type="button"
                    onClick={reset}/>
                <RaisedButton
                label="Next"
                style={ {float:'right'} }
                primary={true}
                type="submit"/>
            </div>
        </form>
        </div>
    )
}

export default reduxForm({
    form: 'invoice',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate,
    initialValues: {
        appliances: [{}]
    }
    // asyncValidate
})(MaterialUiForm)