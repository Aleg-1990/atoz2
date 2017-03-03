import jsPDF from 'jspdf/dist/jspdf.debug.js';
import React from 'react';

import SignaturePad from 'react-signature-pad';
import InvoiceForm from './InvoiceForm';
import SignTable from './SignTable';
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
        const doc = new jsPDF()
        doc.text(10, 10, 'This is a test')
        doc.save('autoprint.pdf')
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

                                <div style={ {border: '1px dashed #555555', marginBottom: '10px'} }>
                                    <SignaturePad clearButton="true" />
                                </div>
                                <FlatButton
                                    label="Back"
                                    disabled={stepIndex === 0}
                                    disableTouchRipple={true}
                                    disableFocusRipple={true}
                                    onTouchTap={this.handlePrev}
                                />
                                <RaisedButton
                                    label="Get PDF"
                                    primary={true}
                                    onTouchTap={this.getPDF}
                                    style={{marginLeft: 12}}
                                />
                                <RaisedButton
                                    label="Save"
                                    primary={true}
                                    disabled={true}
                                    style={{marginLeft: 12}}
                                />
                                <RaisedButton
                                    label="Export"
                                    primary={true}
                                    disabled={true}
                                    style={{marginLeft: 12}}
                                />
                                <RaisedButton
                                    label="Send"
                                    primary={true}
                                    disabled={true}
                                    style={{marginLeft: 12}}
                                />
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

export default InvoiceStepper;