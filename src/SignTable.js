import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { formValueSelector } from 'redux-form'
import { connect } from 'react-redux'

const Item = ({label, value}) => {
    return (
        <div>
            <div style={ {marginBottom: '5px', fontSize: '12px', color: '#999999'} }>{label}</div>
            <div style={ {marginBottom: '15px'} }>{value}</div>
        </div>
    );
};

Item.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
}

class SignTable extends Component {
    render() {
        const{appliances, first_name, last_name} = this.props;
        return (
            <div>
                {appliances.map((appliance, i) => {
                    return <div key={i}>
                        <Row>
                            <Col xs={6}>
                                <Item label="Appliance" value={appliance.appliance}/>
                            </Col>
                            <Col xs={6}  sm={3}>
                                <Item label="Age in Years" value={appliance.age}/>
                            </Col>
                            <Col xs={6}  sm={3}>
                                <Item label="Color" value={appliance.color}/>
                            </Col>
                        </Row>
                        <Row>
                        {appliance.appliance === 'Refrigerator' &&
                        <div>
                            <Col sm={3}>
                                <Item label="Ice maker" value={appliance.refrigerator_ice_maker}/>
                            </Col>
                            <Col sm={3}>
                                <Item label="Water/ice dispense" value={appliance.refrigerator_ice_dispenser}/>
                            </Col>
                            <Col sm={3}>
                                <Item label="Type" value={appliance.refrigerator_type}/>
                            </Col>
                        </div>}
                        {appliance.appliance === 'Washer' &&
                        <Col sm={3}>
                            <Item label="Location" value={appliance.washer_location}/>
                        </Col>}
                        {appliance.appliance === 'Oven' &&
                        <Col sm={3}>
                            <Item label="Type" value={appliance.oven_type}/>
                        </Col>}
                        {appliance.appliance === 'Oven' &&
                        <Col sm={3}>
                            <Item label="Convection" value={appliance.oven_convection}/>
                        </Col>}
                        {appliance.appliance === 'Microwave' &&
                        <Col sm={3}>
                            <Item label="Type" value={appliance.microwave_type}/>
                        </Col>}
                        {appliance.appliance === 'Range' &&
                        <Col sm={3}>
                            <Item label="Type" value={appliance.range_type}/>
                        </Col>}


                        </Row>
                        <Row>
                            <Col xs={6}>
                                <Item label="Brand" value={appliance.brand}/>
                            </Col>
                            <Col xs={6}  sm={3}>
                                <Item label="Condition" value={appliance.condition}/>
                            </Col>
                            <Col xs={6}  sm={3}>
                                <Item label="Size" value={appliance.size}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <Item label="Model" value={appliance.model}/>
                            </Col>
                            {appliance.fuel && <Col xs={6}  sm={3}>
                                <Item label="Fuel" value={appliance.fuel}/>
                            </Col>}
                            {appliance.burners && <Col xs={6}  sm={3}>
                                <Item label="Burners" value={appliance.burners}/>
                            </Col>}
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <Item label="Serial number" value={appliance.serial_number}/>
                            </Col>
                            {appliance.cycles && <Col xs={6}  sm={3}>
                                <Item label="Cycles" value={appliance.cycles}/>
                            </Col>}
                            {appliance.options && <Col xs={6}  sm={3}>
                                <Item label="Options" value={appliance.options}/>
                            </Col>}
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <Item label="Customer complaint" value={appliance.customer_complaint}/>
                            </Col>
                            <Col xs={6}>
                                <Item label="Tech recommendation" value={appliance.tech_recommendation}/>
                            </Col>
                        </Row>


                        <hr />
                    </div>;
                })}
                <Row>
                    <Col xs={6} sm={3}>
                        <Item label="Customer first name" value={first_name}/>
                    </Col>
                    <Col xs={6} sm={3}>
                        <Item label="Customer last name" value={last_name}/>
                    </Col>
                </Row>
            </div>

        );
    }
}



const selector = formValueSelector('invoice');
SignTable = connect(
    state => selector(state, 'appliances', 'first_name', 'last_name')
)(SignTable);

export default SignTable;
