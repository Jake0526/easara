import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Button } from 'react-bootstrap';
import SideBar from '../sidebar/SideBar.js';
import AppHeader from '../../app/AppHeader.js';
import AppFooter from '../../app/app_footer.js';
import PreviousIcon from '../../react-table-custom-component/PreviousComponent';
import NextIcon from '../../react-table-custom-component/NextComponent';
//COMPONENTS
import ApplicationModal from '../../modal/ApplicationModal';

import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../css/app.css';

var moment = require('moment');
export default class Application extends Component {
  constructor(props) {
    super(props);
    this.users = [];
    this.state = {
      data: props,
      showApplicationModal: false,
      updateData: null,
    };
  }

  componentDidMount() {
    $('body').addClass('sidebar-mini');
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps });
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

  updateInformation = data => {
    this.setState({ updateData: data, showApplicationModal: true, update: true });
  };

  removeUpdateData = () => {};

  render() {
    const { data } = this.state;
    const contentMinHeight = {
      minHeight: `${window.innerHeight - 101}px`,
    };
    const { showApplicationModal, updateData, update } = this.state;
    const { applicantsProfiles, religionOptions } = this.state.data.state;

    let reactTablePageSize = Math.floor(window.innerHeight - 220) * 0.0232;

    let applicantsColumn = [
      {
        Header: (
          <div>
            <h4>
              <i className="fa fa-list" aria-hidden="true"></i> Applicant List
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
            Header: 'First Name',
            accessor: 'first_name',
            minWidth: 50,
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
            Header: 'Address',
            accessor: 'address',
            minWidth: 100,
            headerClassName: 'wordwrap',
            style: { whiteSpace: 'unset' },
          },
          {
            Header: 'Phone Number',
            accessor: 'phone_number',
            minWidth: 65,
            className: 'right',
            headerClassName: 'wordwrap',
            style: { whiteSpace: 'unset' },
          },
          {
            Header: 'Cell Number',
            accessor: 'cell_number',
            minWidth: 65,
            className: 'right',
            headerClassName: 'wordwrap',
            style: { whiteSpace: 'unset' },
          },
          {
            Header: 'Citizenship',
            accessor: 'citizenship',
            minWidth: 50,
            headerClassName: 'wordwrap',
            style: { whiteSpace: 'unset' },
          },
          {
            Header: 'Birth Date',
            id: 'birth_date',
            accessor: d => {
              return moment(d.birth_date).format('DD-MM-YYYY');
            },
            minWidth: 50,
            headerClassName: 'wordwrap',
            style: { whiteSpace: 'unset' },
          },
          {
            Header: 'Blood Type',
            accessor: 'blood_type',
            minWidth: 50,
            headerClassName: 'wordwrap',
            style: { whiteSpace: 'unset' },
          },
          {
            Header: 'Height',
            accessor: 'height',
            minWidth: 50,
            headerClassName: 'wordwrap',
            style: { whiteSpace: 'unset' },
          },
          {
            Header: 'Sex',
            accessor: 'sex',
            minWidth: 40,
            headerClassName: 'wordwrap',
            style: { whiteSpace: 'unset' },
          },
          {
            Header: 'Civil Status',
            accessor: 'civil_status',
            minWidth: 50,
            headerClassName: 'wordwrap',
            style: { whiteSpace: 'unset' },
          },
          {
            Header: 'In Service',
            id: 'existing',
            accessor: d => {
              if (d.existing === 1) return 'Yes';
              else return 'No';
            },
            minWidth: 50,
            headerClassName: 'wordwrap',
            style: { whiteSpace: 'unset' },
          },
        ],
      },
    ];
    return (
      <div className="wrapper">
        <AppHeader middleware={this.props.state} history={this.props.history} />
        <SideBar middleware={this.props.state} page="application" />

        <div className="content-wrapper" style={contentMinHeight}>
          <div className="plantilla-content" id="content-area">
            <section className="content-header">
              <h1 style={{ color: 'rgb(63,57,51)', fontSize: '20px' }}>
                <i className="fa fa-cog"></i> Manage Applicants
              </h1>
            </section>

            <section className="content">
              <div className="box box-primary">
                <div className="box-body" style={{ padding: '0px' }}>
                  <ReactTable
                    className="-striped -highlight"
                    data={applicantsProfiles}
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
                onClick={() => this.toggleApplicationModal()}
              >
                <i className="fa fa-pencil" aria-hidden="true"></i> Record Applicant
              </Button>
            </section>
          </div>
        </div>

        <AppFooter />
        <div className="control-sidebar-bg"></div>
        <ApplicationModal
          show={showApplicationModal}
          toggleApplicationModal={this.toggleApplicationModal}
          selectApplicantsProfile={data.selectApplicantsProfile}
          religionOptions={religionOptions}
          updateData={updateData}
          update={update}
        />
      </div>
    );
  }
}
