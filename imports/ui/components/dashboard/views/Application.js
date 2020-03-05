import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Button } from 'react-bootstrap';
import SideBar from '../sidebar/SideBar.js';
import AppHeader from '../../app/AppHeader.js';
import AppFooter from '../../app/app_footer.js';
import PreviousIcon from '../../react-table-custom-component/PreviousComponent';
import NextIcon from '../../react-table-custom-component/NextComponent';
//COMPONENTS
import ApplicationModal from '../../modal/application-modal';

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
    };
  }

  componentDidMount() {
    $('body').addClass('sidebar-mini');
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps });
  }

  toggleApplicationModal = () => {
    this.setState(prevState => ({
      showApplicationModal: !prevState.showApplicationModal,
    }));
  };

  render() {
    const contentMinHeight = {
      minHeight: `${window.innerHeight - 101}px`,
    };
    const { showApplicationModal } = this.state;
    const { applicantsProfiles } = this.state.data.state;

    let reactTablePageSize = Math.floor(window.innerHeight - 202) * 0.0232;

    let applicantsColumn = [
      {
        Header: '#',
        accessor: 'id',
        minWidth: 25,
        className: 'center',
      },
      {
        Header: 'First Name',
        accessor: 'first_name',
        minWidth: 50,
      },
      {
        Header: 'Last Name',
        accessor: 'last_name',
        minWidth: 50,
      },
      {
        Header: 'Address',
        accessor: 'address',
        minWidth: 50,
      },
      {
        Header: 'Phone Number',
        accessor: 'phone_number',
        minWidth: 65,
        className: 'right',
      },
      {
        Header: 'Cell Number',
        accessor: 'cell_number',
        minWidth: 50,
        className: 'right',
      },
      {
        Header: 'Citizenship',
        accessor: 'citizenship',
        minWidth: 50,
      },
      {
        Header: 'Birth Date',
        id: 'birth_date',
        accessor: d => {
          return moment(d.birth_date).format('DD-MM-YYYY');
        },
        minWidth: 50,
      },
      {
        Header: 'Blood Type',
        accessor: 'blood_type',
        minWidth: 50,
      },
      {
        Header: 'Height',
        accessor: 'height',
        minWidth: 50,
      },
      {
        Header: 'Sex',
        accessor: 'sex',
        minWidth: 40,
      },
      {
        Header: 'Civil Status',
        accessor: 'civil_status',
        minWidth: 50,
      },
    ];
    return (
      <div className="wrapper">
        <AppHeader middleware={this.props.state} history={this.props.history} />
        <SideBar middleware={this.props.state} page="application" />

        <div className="content-wrapper" style={contentMinHeight}>
          <div className="plantilla-content" id="content-area">
            <section className="content-header">
              <h1>Application</h1>
            </section>

            <section className="content">
              <div className="box box-primary">
                <div className="box-body">
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
                  />
                </div>
              </div>
              <Button
                className="pull-right"
                bsStyle="primary"
                onClick={() => this.toggleApplicationModal()}
              >
                Create Application
              </Button>
            </section>
          </div>
        </div>

        <AppFooter />
        <div className="control-sidebar-bg"></div>
        <ApplicationModal
          show={showApplicationModal}
          toggleApplicationModal={this.toggleApplicationModal}
        />
      </div>
    );
  }
}
