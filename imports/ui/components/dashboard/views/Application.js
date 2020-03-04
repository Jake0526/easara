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

export default class Application extends Component {
  constructor(props) {
    super(props);
    this.users = [];
    this.state = {
      showApplicationModal: false,
    };
  }

  componentDidMount() {
    $('body').addClass('sidebar-mini');
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
    let reactTablePageSize = Math.floor(window.innerHeight - 202) * 0.0232;
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
                    data={[]}
                    columns={[]}
                    defaultPageSize={reactTablePageSize}
                    PreviousComponent={PreviousIcon}
                    NextComponent={NextIcon}
                    showPageSizeOptions={false}
                    style={{
                      height: window.innerHeight - 202,
                    }}
                    // getTdProps={(state, rowInfo, column, instance) => {
                    //   return {
                    //     onClick: e => {
                    //       if (column.id != 'checkbox') {
                    //         this.props.detailView(
                    //           rowInfo.row._original.id,
                    //           rowInfo.row._original.employee_number,
                    //           rowInfo.row._original.code
                    //         );
                    //       }
                    //     },
                    //   };
                    // }}
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
        <ApplicationModal show={showApplicationModal} />
      </div>
    );
  }
}
