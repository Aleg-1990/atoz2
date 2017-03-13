import React from 'react';
import { formValueSelector } from 'redux-form'
import { connect } from 'react-redux'

import SignaturePad from 'react-signature-pad';
import InvoiceForm from './InvoiceForm';
import SignTable from './SignTable';
import getPdf from './PdfConstruct';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

/**
 * Vertical steppers are designed for narrow screen sizes. They are ideal for mobile.
 *
 * To use the vertical stepper with the contained content as seen in spec examples,
 * you must use the `<StepContent>` component inside the `<Step>`.
 *
 * <small>(The vertical stepper can also be used without `<StepContent>` to display a basic stepper.)</small>
 */
class InvoiceStepper extends React.Component {

    state = {
        finished: false,
        stepIndex: 0,
    };

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    getPDF = () => {
        const doc = getPdf(this.props, this.refs.signature);
    }

    // renderInvoiceForm() {
    //     return (
    //         <div>
    //
    //         </div>
    //     );
    // }

    render() {
        const {finished, stepIndex} = this.state;

        return (
        <Grid>
            <Row>
                <Col md={7} mdOffset={3} sm={10} smOffset={1} >
                    <Stepper activeStep={stepIndex} orientation="vertical">
                        <Step>

                            <StepLabel>Input appliances and customer data</StepLabel>
                            <StepContent>
                                <Row>
                                    <Col sm={8} smOffset={2} >
                                        <InvoiceForm afterSubmit={this.handleNext}/>
                                    </Col>
                                </Row>
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>Sign up invoice</StepLabel>
                            <StepContent>
                                <SignTable/>

                                <label>Customer signature:</label>
                                {stepIndex == 1 &&
                                <div style={ {margin: '10px auto', position: 'relative', width: '100%', height: '50vw'} }>
                                    <SignaturePad clearButton="true" ref="signature" />
                                </div>}

                                <div>
                                    <Row around="xs">
                                        <Col xs={5} sm={3}>
                                            <FlatButton
                                                label="Back"
                                                disabled={stepIndex === 0}
                                                onTouchTap={this.handlePrev}
                                            />
                                        </Col>
                                        <Col xs={5} sm={3}>
                                            <RaisedButton
                                                label="Get PDF"
                                                primary={true}
                                                fullWidth={true}
                                                onTouchTap={this.getPDF}
                                            />
                                        </Col>
                                    </Row>
                                </div>

                            </StepContent>
                        </Step>
                    </Stepper>
                    {finished && (
                        <p style={{margin: '20px 0', textAlign: 'center'}}>
                            <a
                                href="#"
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.setState({stepIndex: 0, finished: false});
                                }}
                            >
                                Click here
                            </a> to reset the example.
                        </p>
                    )}
                </Col>
            </Row>
        </Grid>
        );
    }
}

const selector = formValueSelector('invoice');
InvoiceStepper = connect(
    state => selector(state, 'appliances', 'first_name', 'last_name', 'amount_due', 'estimate', 'payment_method', 'check_number', 'address', 'email')
)(InvoiceStepper);

export default InvoiceStepper;