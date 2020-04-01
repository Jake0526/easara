import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Button } from 'react-bootstrap';
import SideBar from '../sidebar/SideBar.js';
import AppHeader from '../../app/AppHeader.js';
import AppFooter from '../../app/app_footer.js';
import PreviousIcon from '../../react-table-custom-component/PreviousComponent';
import NextIcon from '../../react-table-custom-component/NextComponent';
import Swal from 'sweetalert2';
import RankingSettingsModal from '../../modal/RankingSettingsModal';
//COMPONENTS
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../css/app.css';

var moment = require('moment');
export default class Ranking extends Component {
  constructor(props) {
    super(props);
    this.users = [];
    this.state = {
      data: props,
      updateData: null,
      rankedApplicants: [],
      rankingStatus: 0,
      rankingLength: 0,
      showSettingsModal: false,
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
    let prioApplicants = [];
    let lessPrioApplicants = [];
    let rankedApplicants = [];

    let recursionLoop = () => {
      if (this.state.rankingStatus < rankedApplicants.length) {
        Meteor.call('insert-rank', rankedApplicants[this.state.rankingStatus], (error, result) => {
          if (!error) {
            if (result === 'success') {
              this.setState({
                rankingStatus: this.state.rankingStatus + 1,
              });

              recursionLoop();
            }
          }
        });
      } else {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'New ranks updated',
          showConfirmButton: false,
          timer: 2500,
        });

        this.props.getRanking();

        $('#modal-loading').modal('hide');
      }
    };

    if (applicants.length == 0) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'No applicants recorded',
        showConfirmButton: false,
        timer: 2500,
      });
    } else {
      let rankNum = 1;
      for (let x = 0; x < applicants.length; x += 1) {
        if (applicants[x].existing) {
          lessPrioApplicants.push({
            applicantProfileId: applicants[x].id,
            rankNo: rankNum,
          });
        } else {
          prioApplicants.push({
            applicantProfileId: applicants[x].id,
            rankNo: rankNum,
          });
        }

        rankNum++;
        if (x == applicants.length - 1) {
          rankedApplicants = prioApplicants;
          rankedApplicants.concat(lessPrioApplicants);

          this.setState({
            rankingLength: rankedApplicants.length,
          });

          $('#modal-loading').modal({
            backdrop: 'static',
            keyboard: false,
            show: true,
          });

          Meteor.call('truncate-rank', (error, result) => {
            if (!error) {
              if (result === 'success') {
                recursionLoop();
              }
            }
          });
        }
      }
    }
  };

  toggleSettingsModal = () => {
    this.setState(prevState => ({
      showSettingsModal: !prevState.showSettingsModal,
    }));
  };

  render() {
    const contentMinHeight = {
      minHeight: `${window.innerHeight - 101}px`,
    };
    const { showSettingsModal } = this.state;
    let reactTablePageSize = Math.floor(window.innerHeight - 330) * 0.0232;
    let applicantsColumn = [
      {
        Header: (
          <div>
            <h4>
              <i className="fa fa-list" aria-hidden="true"></i> Ranking
              <Button
                bsStyle="success"
                className="pull-right"
                onClick={() => this.toggleSettingsModal()}
                style={{ padding: '5px', position: 'relative', top: '-6px' }}
              >
                <i className="fa fa-cog" aria-hidden="true"></i> Settings
              </Button>
            </h4>
          </div>
        ),
        className: 'center',
        width: 1000,
        columns: [
          {
            Header: 'Rank',
            accessor: 'rank_no',
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
          },
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
                    data={this.state.data.state.applicantsRanking}
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

        <div className="modal fade" id="modal-loading">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-body" style={{ paddingBottom: '1px' }}>
                <div className="progress-group">
                  <span className="progress-text">Ranking Applicants</span>
                  <span className="progress-number">
                    <b>{this.state.rankingStatus}</b>/{this.state.rankingLength}
                  </span>

                  <div className="progress sm">
                    <div
                      className="progress-bar progress-bar-aqua"
                      style={{
                        width: (this.state.rankingStatus / this.state.rankingLength) * 100 + '%',
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RankingSettingsModal
          show={showSettingsModal}
          toggleSettingsModal={this.toggleSettingsModal}
        />
      </div>
    );
  }
}
