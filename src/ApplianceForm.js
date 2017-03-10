import React from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton';
import TextFieldRedux from './material-ui-redux-wrapper/TextField';
import SelectFieldRedux from './material-ui-redux-wrapper/SelectField';
import RadioGroupRedux from './material-ui-redux-wrapper/RadioGroup';
import AutoCompleteRedux from './material-ui-redux-wrapper/AutoComplete';
import { Row, Col } from 'react-flexbox-grid';
import MenuItem from 'material-ui/MenuItem';
import ActionPlaylistAdd from 'material-ui/svg-icons/av/playlist-add';
import ActionDelete from 'material-ui/svg-icons/action/delete';
// import asyncValidate from './asyncValidate'

const ApplianceForm = (member, index, fields) => (
    <div key={index}>
        <Field
            name={`${member}.appliance`}
            component={AutoCompleteRedux}
            label="Appliance"
            placeholder="Type the appliance"
            dataSource={[
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
            ]}/>
        <Field
            name={`${member}.brand`}
            component={AutoCompleteRedux}
            label="Brand"
            placeholder="Type the brand"
            dataSource={[
                'Amana',
                'ASKO',
                'Bertazzoni',
                'BOSCH',
                'Dacor',
                'Electrolux',
                'EUROTECH',
                'Fisher&Paykel',
                'Frigidaire',
                'Gaggenau',
                'GE',
                'GE Monogram',
                'Haier',
                'Hot Point',
                'Jenn-Air',
                'Kenmore',
                'Kitchenaid',
                'LG',
                'LIEBHERR',
                'Magic Chef',
                'Maytag',
                'Miele',
                'Nutone',
                'Samsung',
                'Sub Zero',
                'Thermador',
                'U-Line',
                'Viking',
                'Whirlpool',
                'Wolf'
            ]}/>
        <Field
            name={`${member}.model`}
            component={TextFieldRedux}
            label="Model"
            normalize={value => value.toUpperCase()}
            placeholder="Type the model"/>
        <Field
            name={`${member}.serial_number`}
            component={TextFieldRedux}
            label="Serial Number"
            normalize={value => value.toUpperCase()}
            placeholder="Type serial number"/>


        {['Refrigerator'].indexOf(fields.get(index).appliance) !== -1 &&
        <div>
            <label htmlFor={`${member}.refrigerator_ice_maker`}>Ice maker</label>
            <Field
                name={`${member}.refrigerator_ice_maker`}
                component={RadioGroupRedux}>
                <RadioButton value="Yes" label="Yes"/>
                <RadioButton value="No" label="No"/>
            </Field>
        </div>}
        {['Refrigerator'].indexOf(fields.get(index).appliance) !== -1 &&
        <div>
            <label htmlFor={`${member}.refrigerator_ice_dispenser`}>Water/ice dispenser</label>
            <Field
                name={`${member}.refrigerator_ice_dispenser`}
                component={RadioGroupRedux}>
                <RadioButton value="Yes" label="Yes"/>
                <RadioButton value="No" label="No"/>
            </Field>
        </div>}
        {['Refrigerator'].indexOf(fields.get(index).appliance) !== -1 &&
        <Field name={`${member}.refrigerator_type`}
               component={SelectFieldRedux}
               label="Type"
        >
            <MenuItem value={'Side by side'} primaryText="Side by side"/>
            <MenuItem value="Top-to-bottom" primaryText="Top-to-bottom"/>
            <MenuItem value={'French door'} primaryText="French door"/>
            <MenuItem value="Built-in" primaryText="Built-in"/>
        </Field>}
        {['Washer'].indexOf(fields.get(index).appliance) !== -1 &&
        <Field
            name={`${member}.washer_location`}
            component={AutoCompleteRedux}
            label="Location"
            placeholder="Type the location"
            dataSource={['Garage','Laundry','Closet']}/>}
        {['Oven'].indexOf(fields.get(index).appliance) !== -1 &&
        <Field name={`${member}.oven_type`}
               component={SelectFieldRedux}
               label="Type"
        >
            <MenuItem value={'Single'} primaryText="Single"/>
            <MenuItem value={'Double'} primaryText="Double"/>
            <MenuItem value={'Combination'} primaryText="Combination"/>

        </Field>}
        {['Oven'].indexOf(fields.get(index).appliance) !== -1 &&
        <div>
            <label htmlFor={`${member}.oven_convection`}>Convection</label>
            <Field
                name={`${member}.oven_convection`}
                component={RadioGroupRedux}>
                <RadioButton value="Yes" label="Yes"/>
                <RadioButton value="No" label="No"/>
            </Field>
        </div>}
        {['Microwave'].indexOf(fields.get(index).appliance) !== -1 &&
        <Field name={`${member}.microwave_type`}
               component={SelectFieldRedux}
               label="Type"
        >
            <MenuItem value={'Over-the-range'} primaryText="Over-the-range"/>
            <MenuItem value={'Built-in'} primaryText="Built-in"/>
            <MenuItem value={'Countertop'} primaryText="Countertop"/>
            <MenuItem value={'Oven combination'} primaryText="Oven combination"/>

        </Field>}
        {['Range'].indexOf(fields.get(index).appliance) !== -1 &&
        <Row>
            <Col xs={12} sm={6} >
                <Field name={`${member}.range_type`}
                       component={SelectFieldRedux}
                       label="Type"
                >
                    <MenuItem value={'Freestanding'} primaryText="Freestanding"/>
                    <MenuItem value={'Slide-in'} primaryText="Slide-in"/>
                    <MenuItem value={'Drop-in'} primaryText="Drop-in"/>

                </Field>
            </Col>
            <Col xs={12} sm={6} >
                <Field name={`${member}.burner_type`}
                       component={SelectFieldRedux}
                       label="Burner type"
                >
                    <MenuItem value={'Glass top'} primaryText="Glass top"/>
                    <MenuItem value={'Coils'} primaryText="Coils"/>
                    <MenuItem value={'Sealed burners'} primaryText="Sealed burners"/>

                </Field>
            </Col>
        </Row>}
        {['Range'].indexOf(fields.get(index).appliance) !== -1 &&
        <Row>
            <Col xs={12} sm={6} >
                <label htmlFor={`${member}.range_convection`}>Convection</label>
                <Field
                    name={`${member}.range_convection`}
                    component={RadioGroupRedux}>
                    <RadioButton value="Yes" label="Yes"/>
                    <RadioButton value="No" label="No"/>
                </Field>
            </Col>
            <Col xs={12} sm={6} >
                <label htmlFor={`${member}.range_self_clean`}>Self clean</label>
                <Field
                    name={`${member}.range_self_clean`}
                    component={RadioGroupRedux}>
                    <RadioButton value="Yes" label="Yes"/>
                    <RadioButton value="No" label="No"/>
                </Field>
            </Col>
        </Row>}

        <Field
            name={`${member}.customer_complaint`}
            component={TextFieldRedux}
            label="Customer complaint"
            multiLine={true}
            rows={2}/>
        <Field
            name={`${member}.tech_recommendation`}
            component={TextFieldRedux}
            label="Tech recommendation"
            multiLine={true}
            rows={2}/>
        <Row>
            <Col xs={6} >
                <Field
                    name={`${member}.age`}
                    type="number"
                    component={TextFieldRedux}
                    label="Age"
                    placeholder="Age in years"/>
            </Col>
            <Col xs={6} >
                <Field
                    name={`${member}.color`}
                    component={AutoCompleteRedux}
                    label="Color"
                    placeholder="Type the color"
                    dataSource={[
                        {
                            text: 'Stainless',
                            value: (
                                <MenuItem
                                    primaryText="Stainless"
                                    style={ {backgroundColor: '#e0dfdb' } }/>

                            ),
                        },
                        {
                            text: 'Black',
                            value: (
                                <MenuItem
                                    primaryText="Black"
                                    style={ {
                                        backgroundColor: '#000',
                                        color: '#fff'
                                    } }/>

                            ),
                        },
                        {
                            text: 'Red',
                            value: (
                                <MenuItem
                                    primaryText="Red"
                                    style={ {
                                        backgroundColor: '#f00',
                                        color: '#fff'
                                    } }/>

                            ),
                        },
                        {
                            text: 'Green',
                            value: (
                                <MenuItem
                                    primaryText="Green"
                                    style={ {
                                        backgroundColor: '#008000',
                                        color: '#fff'
                                    } }/>

                            ),
                        },
                        {
                            text: 'Blue',
                            value: (
                                <MenuItem
                                    primaryText="Blue"
                                    style={ {
                                        backgroundColor: '#00f',
                                        color: '#fff'
                                    } }/>

                            ),
                        },
                        {
                            text: 'Grey',
                            value: (
                                <MenuItem
                                    primaryText="Grey"
                                    style={ {
                                        backgroundColor: '#808080',
                                        color: '#fff'
                                    } }/>

                            ),
                        },
                        {
                            text: 'Wood panels',
                            value: (
                                <MenuItem
                                    primaryText="Wood panels"
                                    style={ {
                                        backgroundColor: '#966F33',
                                        color: '#fff'
                                    } }/>

                            ),
                        },
                    ]}/>
            </Col>
        </Row>
        {fields.get(index).appliance !== 'Refrigerator'  && <Field name={`${member}.condition`}
               component={SelectFieldRedux}
               label="Condition">
            <MenuItem value={null} primaryText="" />
            <MenuItem value={'Good'} primaryText="Good"/>
            <MenuItem value={'Fair'} primaryText="Fair"/>
            <MenuItem value={'Poor'} primaryText="Poor"/>
        </Field>}
        {fields.get(index).appliance !== 'Refrigerator'  && <Field
            name={`${member}.size`}
            component={AutoCompleteRedux}
            label="Size"
            placeholder="Type the size"
            dataSource={['18', '24', '27', '30', '36', '48', '64']}/>}

        {['Refrigerator', 'Microwave', 'Washer'].indexOf(fields.get(index).appliance) === -1 &&
        <Field name={`${member}.fuel`}
               component={SelectFieldRedux}
               label="Fuel">
            <MenuItem value={null} primaryText="" />
            <MenuItem value={'Natural gas'} primaryText="Natural gas"/>
            <MenuItem value={'Electric'} primaryText="Electric"/>
            <MenuItem value={'Dual'} primaryText="Dual"/>
        </Field>}
        {['Refrigerator', 'Microwave', 'Washer', 'Oven'].indexOf(fields.get(index).appliance) === -1 &&
        <Field
            name={`${member}.burners`}
            type="number"
            component={TextFieldRedux}
            label="Burners"
            placeholder="Type the value"/>}
        {['Refrigerator', 'Microwave', 'Oven', 'Range'].indexOf(fields.get(index).appliance) === -1 &&
        <Field
            name={`${member}.cycles`}
            type="number"
            component={TextFieldRedux}
            label="Cycles"
            placeholder="Type the value"/>}
        {['Refrigerator', 'Microwave', 'Oven', 'Range'].indexOf(fields.get(index).appliance) === -1 &&
        <Field
            name={`${member}.options`}
            type="number"
            component={TextFieldRedux}
            label="Options"
            placeholder="Type the value"/>}


        {fields.length > 1 && <RaisedButton
            label="Remove the appliance"
            secondary={true}
            fullWidth={true}
            icon={<ActionDelete />}
            onClick={() => fields.remove(index)}/>}
        <hr />
    </div>
);

const Appliances = ({fields, meta: { touched, error } }) => (
    <div>
        {fields.map(ApplianceForm)}
        {error && <span>{error}</span>}
        <RaisedButton
            label="Add another appliance"
            primary={true}
            fullWidth={true}
            icon={<ActionPlaylistAdd />}
            onClick={() => fields.push({})}/>
    </div>
)

export default Appliances;