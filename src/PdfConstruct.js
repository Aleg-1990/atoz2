import pdfMake from 'pdfmake/build/pdfmake';
import {} from 'pdfmake/build/vfs_fonts';


let getPdf = (props, signature) => {


    let appliances = [];
    props.appliances.map(function(appliance, i) {
        let cnt = 0;
        let normalizedAppliance = [];
        Object.keys(appliance).map(function(key, index) {
            if(key =='tech_recommendation' || key == 'customer_complaint') {
                return;
            }

            let label;
            switch(key) {
                case 'appliance': {
                    label = 'Appliance:';
                    break;
                }
                case 'brand': {
                    label = 'Brand:';
                    break;
                }
                case 'model': {
                    label = 'Model:';
                    break;
                }
                case 'serial_number': {
                    label = 'Serial number:';
                    break;
                }
                case 'refrigerator_ice_maker': {
                    label = 'Ice maker:';
                    break;
                }
                case 'refrigerator_ice_dispenser': {
                    label = 'Water/ice dispenser:';
                    break;
                }
                case 'refrigerator_type': {
                    label = 'Type:';
                    break;
                }
                case 'washer_location': {
                    label = 'Location:';
                    break;
                }
                case 'oven_type': {
                    label = 'Type:';
                    break;
                }
                case 'oven_convection': {
                    label = 'Convection:';
                    break;
                }
                case 'microwave_type': {
                    label = 'Type:';
                    break;
                }
                case 'range_type': {
                    label = 'Type:';
                    break;
                }
                case 'burner_type': {
                    label = 'Burner type:';
                    break;
                }
                case 'range_convection': {
                    label = 'Convection:';
                    break;
                }
                case 'range_self_clean': {
                    label = 'Self clean:';
                    break;
                }
                case 'age': {
                    label = 'Age in years:';
                    break;
                }
                case 'color': {
                    label = 'Color:';
                    break;
                }
                case 'condition': {
                    label = 'Condition:';
                    break;
                }
                case 'size': {
                    label = 'Size:';
                    break;
                }
                case 'fuel': {
                    label = 'Fuel:';
                    break;
                }
                case 'burners': {
                    label = 'Burners:';
                    break;
                }
                case 'cycles': {
                    label = 'Cycles:';
                    break;
                }
                case 'options': {
                    label = 'Options:';
                    break;
                }
                default: {
                    label= '';
                    console.log('Fallback label');
                }
            }

            if (cnt === 0) {
                normalizedAppliance.push([]);// add row
            }
            normalizedAppliance[normalizedAppliance.length-1].push({
                text: label,
                style: {
                    alignment: 'right',
                    bold:true
                }
            });
            normalizedAppliance[normalizedAppliance.length-1].push({
                text: appliance[key]
            });
            cnt++;
            if(cnt === 3) {
                cnt = 0;
            }
        });
        for(let i=normalizedAppliance[normalizedAppliance.length-1].length; i<=5; i++) {
            normalizedAppliance[normalizedAppliance.length-1].push({
                text: ''
            });
        };



        let summary = [
            [
                {
                    text: 'Tech recommendation: '+ appliance.tech_recommendation,
                    style: {
                        italic: true
                    }
                },
            ]
        ];

        if(props.appliances.length === i + 1) {
            summary[0].push({
                text: 'Total:',
                style: {
                    alignment: 'right',
                    bold: true
                }
            });
            summary[0].push({
                text: props.amount_due
            });
            if(props.amount_due !== '$0') {
                summary.push([
                    {
                        text: '',
                    },
                    {
                        text: 'Payment:',
                        style: {
                            alignment: 'right',
                            bold: true
                        }
                    },
                    {
                        text: (props.payment_method === 'Check') ? props.payment_method+', '+props.check_number : props.payment_method
                    }
                ])
            }
            if(props.estimate) {
                summary.push([
                    {
                        text: '',
                    },
                    {
                        text: 'Estimate:',
                        style: {
                            alignment: 'right',
                            bold: true
                        }
                    },
                    {
                        text: '$'+props.estimate
                    }
                ])
            }
        }



        let applianceObj = [
            {
                stack: [
                    {
                        text: 'Appliance details',
                        style: {
                            fontSize: 14,
                            bold: true
                        }
                    },
                    {
                        canvas: [
                            {
                                type: 'line',
                                x1: 0, y1: 10,
                                x2: 200, y2: 10,
                                lineWidth: 1,
                                lineColor: 'black',
                            },
                        ]
                    },
                    {
                        table: {
                            widths: [ '*','*', '*', '*', '*', '*'],
                            body: normalizedAppliance,

                        },
                        layout: 'noBorders',
                        marginTop: 20,
                        style: {
                            fontSize: 10,
                        }

                    }
                ],
                style: 'pdfSection'
            },
            {
                stack: [
                    {
                        text: 'Work order details',
                        style: {
                            fontSize: 14,
                            bold: true
                        }
                    },
                    {
                        canvas: [
                            {
                                type: 'line',
                                x1: 0, y1: 10,
                                x2: 200, y2: 10,
                                lineWidth: 1,
                                lineColor: 'black',
                            },
                        ]
                    },
                    {
                        text: 'Customer complaint',
                        style: {
                            fontSize: 10,
                            bold: true
                        },
                        marginTop: 20,
                    },
                    {
                        text: appliance.customer_complaint,
                        style: {
                            fontSize: 10,
                        },
                        marginTop: 20,
                    },
                    {
                        canvas: [
                            {
                                type: 'line',
                                x1: 0, y1: 10,
                                x2: 530, y2: 10,
                                lineWidth: 0.2,
                                lineColor: 'black',
                            },
                        ]
                    },
                    {
                        table: {
                            widths: [ '*','15%', '15%'],
                            body: summary,

                        },
                        layout: 'noBorders',
                        marginTop: 20,
                        style: {
                            fontSize: 10,
                        }

                    }
                ],
                style: 'pdfSection'
            },
        ];

        if (props.appliances.length !== i + 1) {
            applianceObj[1].pageBreak = 'after';
        }

        appliances.push(applianceObj)

    });



    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10)
    {
        dd='0'+dd;
    }

    if(mm<10)
    {
        mm='0'+mm;
    }

    const docDefinition = {
        pageSize: 'A4',
        pageMargins: [ 0, 140, 0, 20 ],
        header: {
            table: {
                widths: [ '47%','53%'],
                body: [
                    [
                        {
                            stack: [
                                {
                                    text: "A to Z Appliances\n",
                                    style:
                                        {
                                            fontSize: 15,
                                            bold: true
                                        },

                                },
                                {
                                    text: "PO BOX 500202, San Diego, CA 92150\n License number: A47448",
                                    style:
                                        {
                                            color: '#959697',
                                            // fontSize: 8,
                                        },
                                    marginTop: 10,
                                },
                                {
                                    text: Math.floor(Math.random() * (1000000 - 100000)) + 100000,
                                    style:
                                        {
                                            fontSize: 23,
                                            color: '#2c3393',

                                        },
                                    marginTop: 10,
                                },
                                {
                                    text: "Issued: "+mm+'/'+dd+'/'+yyyy,
                                    style:
                                        {
                                            color: '#959697',
                                            // fontSize: 8,
                                        },
                                    marginTop: 10,
                                },
                            ],
                            margin: [15, 15],
                            fillColor: '#fafafa',
                        },
                        {
                            stack: [
                                {
                                    text: [
                                        "Ask us ",
                                        {
                                            text: 'anything',
                                            style:
                                                {
                                                    decoration: 'underline'
                                                },
                                        },
                                        " online!"
                                    ],
                                    style:
                                        {
                                            fontSize: 12,
                                            bold: true,
                                            alignment: 'center',
                                            color: '#FFFFFF'
                                        },

                                },
                                {
                                    text: "a-zappliances.com",
                                    style:
                                        {
                                            color: '#FBC412',
                                            fontSize: 24,
                                            bold: true,
                                            alignment: 'center',
                                        },
                                    marginTop: 15,
                                },
                                {
                                    text: "Customer support chat",
                                    style:
                                        {
                                            color: '#ffffff',
                                            bold: true,
                                            alignment: 'center',
                                            fontSize: 9,
                                        },
                                    marginTop: 20,
                                },
                                {
                                    text: "THE FASTEST WAY TO GET ASSISSTED",
                                    style:
                                        {
                                            color: '#9397c7',
                                            bold: true,
                                            alignment: 'center',
                                            fontSize: 5,
                                        },
                                    marginTop: 10,
                                },
                            ],
                            margin: [0, 20],
                            fillColor: '#2C3393',
                        },
                    ]
                ]
            },
            layout: 'noBorders'
        },
        footer: {
            table: {
                widths: [ '100%'],
                body: [
                    [
                        {
                            text: "We are not responsible for water damage, loss of food, or damage to floors, walls and cabinets\n800-567-8602   |   760-260-5003",
                            style: {
                                alignment: 'center',
                            },
                            fontSize: 6,
                            color: '#959697',
                            fillColor: '#fafafa',
                        },
                    ],
                ],
            },
            layout: 'noBorders'
        },

        content: [
            {
                stack: appliances
            },


            {
                stack: [
                    {
                        text: 'Payment details',
                        style: {
                            fontSize: 14,
                            bold: true
                        }
                    },
                    {
                        canvas: [
                            {
                                type: 'line',
                                x1: 0, y1: 10,
                                x2: 200, y2: 10,
                                lineWidth: 1,
                                lineColor: 'black',
                            },
                        ]
                    },
                    {
                        table: {
                            widths: ['15%', '*'],
                            body: [
                                [
                                    {
                                        text: 'Client:',
                                        style: {
                                            alignment: 'right',
                                            bold: true
                                        }
                                    },
                                    {
                                        text: props.first_name+' '+props.last_name
                                    }
                                ],
                                [
                                    {
                                        text: 'Address:',
                                        style: {
                                            alignment: 'right',
                                            bold: true
                                        }
                                    },
                                    {
                                        text: props.address+' '+props.region
                                    }
                                ],
                                [
                                    {
                                        text: 'Email:',
                                        style: {
                                            alignment: 'right',
                                            bold: true
                                        }
                                    },
                                    {
                                        text: props.email
                                    }
                                ],
                            ],
                        },
                        layout: 'noBorders',
                        marginTop: 20,
                        style: {
                            fontSize: 10,
                        }

                    }
                ],
                style: 'pdfSection'
            },
            {
                stack: [
                    {
                        image: signature.toDataURL(),
                        width: 200,
                        marginRight: 30,
                        style: {
                            alignment: 'right'
                        }
                    },
                    {
                        canvas: [
                            {
                                type: 'line',
                                x1: 330, y1: 0,
                                x2: 530, y2: 0,
                                lineWidth: 1,
                                lineColor: 'black',
                            }
                        ]
                    },
                    {
                        text: 'customer signature',
                        width: 200,
                        marginTop: 3,
                        marginRight: 60,
                        style: {
                            alignment: 'right',
                            fontSize: 10,
                        }

                    }
                ],
                style: 'pdfSection'
            },
        ],
        styles: {
            pdfSection: {
                margin: [31, 33, 31, 0]
            }
        },
        defaultStyle: {
            fontSize: 8,
        }
    };

    pdfMake.createPdf(docDefinition).open();
};


export default getPdf;