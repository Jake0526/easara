import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Button } from 'react-bootstrap';
import SideBar from '../sidebar/SideBar.js';
import AppHeader from '../../app/AppHeader.js';
import AppFooter from '../../app/app_footer.js';
import PreviousIcon from '../../react-table-custom-component/PreviousComponent';
import NextIcon from '../../react-table-custom-component/NextComponent';
import Swal from 'sweetalert2';
//COMPONENTS
import ApplicationModal from '../../modal/ApplicationModal';

import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../css/app.css';

var moment = require('moment');
export default class Ranking extends Component {
    constructor(props) {
        super(props);
        this.users = [];
        this.state = {
            data: props,
            showApplicationModal: false,
            updateData: null,
            applicantsRanking: [],
            prioApplicants: [],
            lessPrioApplicants: []
        };
    }

    componentDidMount() {
        $('body').addClass('sidebar-mini');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps });
    }

    generateNewRanking = () => {
        let applicants = this.state.data.state.applicantsProfiles;

        if(applicants.length == 0) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'No applicants recorded',
                showConfirmButton: false,
                timer: 2500,
            });
        }else {
            for(let x = 0; x < applicants.length; x+=1) {
                console.log(applicants[x]);
    
                if(applicants[x].existing) {
                    console.lop(applicants[x].id);
                }else {
                    console.lop(applicants[x].id);
                }
            }
        } 
    }

    toggleApplicationModal = type => {
        if (type === 'close') {
            this.setState(prevState => ({
                showApplicationModal: !prevState.showApplicationModal,
                updateData: null,
                update: false,
            }));
        } else {
            this.setState(prevState => ({
                showApplicationModal: !prevState.showApplicationModal,
            }));
        }
    };

    render() {
        const contentMinHeight = {
            minHeight: `${window.innerHeight - 101}px`,
        };

        let reactTablePageSize = Math.floor(window.innerHeight - 330) * 0.0232;

        let applicantsColumn = [
            {
                Header: (
                    <div>
                        <h4>
                            <i className="fa fa-list" aria-hidden="true"></i> Ranking
            </h4>
                    </div>
                ),
                className: 'center',
                width: 1000,
                columns: [
                    {
                        Header: '#',
                        accessor: 'id',
                        minWidth: 25,
                        className: 'center',
                        headerClassName: 'wordwrap',
                        style: { whiteSpace: 'unset' },
                    },
                    {
                        Header: 'Last Name',
                        accessor: 'last_name',
                        minWidth: 50,
                        headerClassName: 'wordwrap',
                        style: { whiteSpace: 'unset' },
                    },
                    {
                        Header: 'First Name',
                        accessor: 'first_name',
                        minWidth: 50,
                        headerClassName: 'wordwrap',
                        style: { whiteSpace: 'unset' },
                    },
                    {
                        Header: 'Middle Name',
                        accessor: 'middle_name',
                        minWidth: 50,
                        headerClassName: 'wordwrap',
                        style: { whiteSpace: 'unset' },
                    }
                ],
            },
        ];
        return (

            <div className="wrapper">
                <AppHeader middleware={this.props.state} history={this.props.history} />
                <SideBar middleware={this.props.state} page="ranking" />

                <div className="content-wrapper" style={contentMinHeight}>
                    <div className="plantilla-content" id="content-area">
                        <section className="content-header">
                            <h1 style={{ color: 'rgb(63,57,51)', fontSize: '20px' }}>
                                <i className="fa fa-cog"></i> Generate Ranking of Applicants
              </h1>
                        </section>

                        <section className="content">
                            <div className="box box-primary">
                                <div className="box-body" style={{ padding: '0px' }}>
                                    <ReactTable
                                        className="-striped -highlight"
                                        data={this.state.applicantsRanking}
                                        columns={applicantsColumn}
                                        defaultPageSize={reactTablePageSize}
                                        PreviousComponent={PreviousIcon}
                                        NextComponent={NextIcon}
                                        showPageSizeOptions={false}
                                        style={{
                                            height: window.innerHeight - 202,
                                        }}
                                        getTrProps={(state, rowInfo) => {
                                            return {
                                                onClick: e => {
                                                    this.updateInformation(rowInfo.row._original);
                                                },
                                            };
                                        }}
                                    />
                                </div>
                            </div>
                            <Button
                                className="pull-right"
                                bsStyle="primary"
                                onClick={() => this.generateNewRanking()}
                            >
                                <i className="fa fa-pencil" aria-hidden="true"></i> Generate New Ranking
                    </Button>
                        </section>
                    </div>
                </div>

                <AppFooter />
                <div className="control-sidebar-bg"></div>
                {/* <ApplicationModal
                    show={showApplicationModal}
                    toggleApplicationModal={this.toggleApplicationModal}
                    selectApplicantsProfile={data.selectApplicantsProfile}
                    updateData={updateData}
                    update={update}
                /> */}
            </div>
        );
    }
}
