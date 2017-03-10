/**
 * Created by oleg on 27.02.17.
 */
import React from 'react'
import { Field, reduxForm, FieldArray, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton';
import TextFieldRedux from './material-ui-redux-wrapper/TextField';
// import RadioGroupRedux from './material-ui-redux-wrapper/RadioGroup';
import AutoCompleteRedux from './material-ui-redux-wrapper/AutoComplete';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Appliances from './ApplianceForm';
import MenuItem from 'material-ui/MenuItem';
import SelectFieldRedux from './material-ui-redux-wrapper/SelectField';


// import asyncValidate from './asyncValidate'
const validate = values => {
    const errors = {}
    if (!values.appliances || !values.appliances.length) {
        errors.appliances = { _error: 'At least one appliance must be entered' }
    } else {
        const appliancesArrayErrors = []
        values.appliances.forEach((appliance, memberIndex) => {
            const appliancesErrors = {}

            const requiredApplianceFields = [
                'appliance', 'brand', 'model', 'serial_number', 'customer_complaint', 'tech_recommnedation', 'age', 'color', 'condition', 'size',
                'refrigerator_ice_maker', 'refrigerator_ice_dispenser', 'refrigerator_type',
                'washer_location',
                'oven_type', 'oven_convection',
                'microwave_type',
                'range_type', 'burner_type', 'range_convection', 'range_self_clean'
            ];
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


    const requiredFields = ['address', 'region', 'amount_due', 'payment_method', 'check', 'first_name', 'last_name', 'email']
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Required'
        }
    });
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
}

const RadioGroupRedux = ({ input, label, meta: { touched, error }, ...rest }) => (
    <div>
        <RadioButtonGroup {...input} {...rest}
                          floatingLabelText={label}
                          valueSelected={input.value}
                          onChange={(event, value) => input.onChange(value)}/>
        {touched && error && <span>{error}</span>}
    </div>

)

let InvoiceForm = props => {

    const {paymentByCheck, afterSubmit, handleSubmit, pristine, reset, submitting } = props

    return (
        <div className="container">
        <form onSubmit={handleSubmit(afterSubmit)}>
            <div>
                <FieldArray
                    name="appliances"
                    component={Appliances}
                />
            </div>

            <div>
                <Field
                    name="address"
                    component={TextFieldRedux}
                    label="Customer address"
                    placeholder="Type the address"/>
            </div>
            <div>
                <label htmlFor="region">Region</label>
                <Field
                    label="Region"
                    name="region"
                    component={RadioGroupRedux}>
                    <RadioButton value="CA" label="California"/>
                    <RadioButton value="DC" label="District of Columbia"/>
                </Field>
            </div>
            <div>
                <Field
                    name="amount_due"
                    component={AutoCompleteRedux}
                    label="Amount due"
                    placeholder="Type the amount"
                    dataSource={[
                        '$0', '$25.00', '$60.00',
                        '$65.00', '$75.00', '$100.00',
                        '$125.00'
                    ]}/>
            </div>
            <Field name="payment_method"
                   component={SelectFieldRedux}
                   label="Payment">
                <MenuItem value={null} primaryText="" />
                <MenuItem value={'Credit card'} primaryText="Credit card"/>
                <MenuItem value={'Cash'} primaryText="Cash"/>
                <MenuItem value={'Check'} primaryText="Check"/>
                <MenuItem value={'Not collected'} primaryText="Not collected"/>
            </Field>

            {paymentByCheck && <Field
                name="check_number"
                component={TextFieldRedux}
                label="Check number"
                placeholder="Type the check number"/>}



            <div>
                <Field
                    name="estimate"
                    component={TextFieldRedux}
                    label="Estimate"
                    placeholder="Type the value"/>
            </div>
            <Field
                name="first_name"
                component={TextFieldRedux}
                label="Customer first name"
                placeholder="Type the first name"/>
            <Field
                name="last_name"
                component={TextFieldRedux}
                label="Customer last name"
                placeholder="Type the last name"/>
            <div>
                <Field
                    name="email"
                    component={TextFieldRedux}
                    label="Customer email"
                    placeholder="Type the email"/>
            </div>

            <Row around="xs">
                <Col xs={2}>
                    <RaisedButton
                        label="Clear"
                        type="button"
                        onClick={reset}/>
                </Col>
                <Col xs={2} >
                    <RaisedButton
                        label="Next"
                        style={ {float:'right'} }
                        primary={true}
                        type="submit"/>
                </Col>
            </Row>
        </form>
        </div>
    )
}

InvoiceForm = reduxForm({
    form: 'invoice',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate,
    initialValues: {
        appliances: [{}]
    }
    // asyncValidate
})(InvoiceForm);

const selector = formValueSelector('invoice')
InvoiceForm = connect(
    state => {
        // can select values individually
        const paymentByCheck = selector(state, 'payment_method') === 'Check';
        return {
            paymentByCheck
        }
    }
)(InvoiceForm)


export default InvoiceForm