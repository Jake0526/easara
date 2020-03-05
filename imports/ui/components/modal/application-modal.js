import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import Swal from 'sweetalert2';
import {
  Button,
  ButtonGroup,
  ControlLabel,
  FormControl,
  FormGroup,
  HelpBlock,
  InputGroup,
  Modal,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Autosuggest from 'react-autosuggest';

export default class ApplicationModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props,
      lastName: '',
      firstName: '',
      middleName: '',
      maidenName: '',
      nameExtension: '',
      address: '',
      phoneNumber: '',
      cellNumber: '',
      politicalDistrict: '',
      congressionalDistrict: '',
      citizenship: '',
      birthDate: new Date(),
      birthPlace: '',
      bloodType: '',
      height: '',
      sex: '',
      civilStatus: '',
      tin: '',
      philHealth: '',
      sss: '',
      isLicensed: '',
      emergencyName: '',
      emergencyRelation: '',
      emergencyAddress: '',
      emergencyNumber: '',
    };

    this.errors = [];
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps });
  }

  handleChange = (value, id) => {
    if (id === 'lastName') {
      this.setState({
        lastName: value,
      });
    } else if (id === 'firstName') {
      this.setState({
        firstName: value,
      });
    } else if (id === 'middleName') {
      this.setState({
        middleName: value,
      });
    } else if (id === 'maidenName') {
      this.setState({
        maidenName: value,
      });
    } else if (id === 'nameExtension') {
      this.setState({
        nameExtension: value,
      });
    } else if (id === 'address') {
      this.setState({
        address: value,
      });
    } else if (id === 'phoneNumber') {
      this.setState({
        phoneNumber: value,
      });
    } else if (id === 'cellNumber') {
      this.setState({
        cellNumber: value,
      });
    } else if (id === 'politicalDistrict') {
      this.setState({
        politicalDistrict: value,
      });
    } else if (id === 'congressionalDistrict') {
      this.setState({
        congressionalDistrict: value,
      });
    } else if (id === 'citizenship') {
      this.setState({
        citizenship: value,
      });
    } else if (id === 'birthDate') {
      this.setState({
        birthDate: value.toString(),
      });
    } else if (id === 'birthPlace') {
      this.setState({
        birthPlace: value,
      });
    } else if (id === 'bloodType') {
      this.setState({
        bloodType: value,
      });
    } else if (id === 'height') {
      this.setState({
        height: value,
      });
    } else if (id === 'sex') {
      this.setState({
        sex: value,
      });
    } else if (id === 'civilStatus') {
      this.setState({
        civilStatus: value,
      });
    } else if (id === 'tin') {
      this.setState({
        tin: value,
      });
    } else if (id === 'philHealth') {
      this.setState({
        philHealth: value,
      });
    } else if (id === 'sss') {
      this.setState({
        sss: value,
      });
    } else if (id === 'isLicensed') {
      this.setState({
        isLicensed: value,
      });
    } else if (id === 'emergencyName') {
      this.setState({
        emergencyName: value,
      });
    } else if (id === 'emergencyRelation') {
      this.setState({
        emergencyRelation: value,
      });
    } else if (id === 'emergencyAddress') {
      this.setState({
        emergencyAddress: value,
      });
    } else if (id === 'emergencyNumber') {
      this.setState({
        emergencyNumber: value,
      });
    }
  };

  getValidationState = id => {
    const { lastName, firstName, middleName, address } = this.state;
    switch (id) {
      case 'lastName':
        if (lastName.length === 0) {
          this.errors.includes('lastName') ? null : this.errors.push('lastName');
          return 'error';
        } else {
          let index = this.errors.indexOf('lastName');
          if (index > -1) {
            this.errors.splice(index, 1);
          }
          return null;
        }
      case 'firstName':
        if (firstName.length === 0) {
          this.errors.includes('firstName') ? null : this.errors.push('firstName');
          return 'error';
        } else {
          let index = this.errors.indexOf('firstName');
          if (index > -1) {
            this.errors.splice(index, 1);
          }
          return null;
        }
      case 'middleName':
        if (middleName.length === 0) {
          this.errors.includes('middleName') ? null : this.errors.push('middleName');
          return 'error';
        } else {
          let index = this.errors.indexOf('middleName');
          if (index > -1) {
            this.errors.splice(index, 1);
          }
          return null;
        }
      case 'address':
        if (address.length === 0) {
          this.errors.includes('address') ? null : this.errors.push('address');
          return 'error';
        } else {
          let index = this.errors.indexOf('address');
          if (index > -1) {
            this.errors.splice(index, 1);
          }
          return null;
        }
    }
  };

  insertNewApplicant = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.value) {
        const {
          firstName,
          lastName,
          middleName,
          maidenName,
          nameExtension,
          address,
          phoneNumber,
          cellNumber,
          politicalDistrict,
          congressionalDistrict,
          citizenship,
          birthDate,
          birthPlace,
          bloodType,
          height,
          sex,
          civilStatus,
          tin,
          philHealth,
          sss,
          isLicensed,
          emergencyName,
          emergencyRelation,
          emergencyAddress,
          emergencyNumber,
        } = this.state;
        let data = {
          firstName,
          lastName,
          middleName,
          maidenName,
          nameExtension,
          address,
          phoneNumber,
          cellNumber,
          politicalDistrict,
          congressionalDistrict,
          citizenship,
          birthDate,
          birthPlace,
          bloodType,
          height,
          sex,
          civilStatus,
          tin,
          philHealth,
          sss,
          isLicensed,
          emergencyName,
          emergencyRelation,
          emergencyAddress,
          emergencyNumber,
        };
        Meteor.call('insert-new-applicant', data, (error, result) => {
          if (!error) {
            if (result === 'success') {
              Swal.fire({
                position: 'center',
                icon: 'success',
                text: 'Application has been successfuly recorded',
                showConfirmButton: false,
                timer: 2500,
              });
            } else {
              Swal.fire({
                position: 'center',
                icon: 'error',
                text: 'Query error',
                showConfirmButton: false,
                timer: 2500,
              });
            }
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              text: 'Submission failed',
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
      }
    });
  };

  changeBirthDate = date => {
    this.setState({
      birthDate: date,
    });
  };

  render() {
    const { show, toggleApplicationModal } = this.state.data;
    const {
      firstName,
      lastName,
      middleName,
      maidenName,
      nameExtension,
      address,
      phoneNumber,
      cellNumber,
      politicalDistrict,
      congressionalDistrict,
      citizenship,
      birthDate,
      birthPlace,
      bloodType,
      height,
      sex,
      civilStatus,
      tin,
      philHealth,
      sss,
      isLicensed,
      emergencyName,
      emergencyRelation,
      emergencyAddress,
      emergencyNumber,
    } = this.state;
    return (
      <Modal dialogClassName="custom-modal" role="document" show={show}>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-lg">Application Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          /> */}
          <form>
            <div className="row">
              {/* FIRSTNAME */}
              <FormGroup
                className="col-sm-12 col-md-6 col-lg-3"
                controlId="firstName"
                validationState={this.getValidationState('firstName')}
              >
                <ControlLabel>1. First Name</ControlLabel>
                <FormControl
                  type="text"
                  value={firstName}
                  placeholder="Enter text"
                  onChange={e => this.handleChange(e.target.value, 'firstName')}
                />
                {this.getValidationState('firstName') !== null ? (
                  <HelpBlock>Required.</HelpBlock>
                ) : (
                  ''
                )}
              </FormGroup>
              {/* LASTNAME */}
              <FormGroup
                className="col-sm-12 col-md-6 col-lg-3"
                controlId="lastName"
                validationState={this.getValidationState('lastName')}
              >
                <ControlLabel>2. Last Name</ControlLabel>
                <FormControl
                  type="text"
                  value={lastName}
                  placeholder="Enter text"
                  onChange={e => this.handleChange(e.target.value, 'lastName')}
                />
                {this.getValidationState('lastName') !== null ? (
                  <HelpBlock>Required.</HelpBlock>
                ) : (
                  ''
                )}
              </FormGroup>
              {/* MIDDLE NAME */}
              <FormGroup
                className="col-sm-12 col-md-6 col-lg-3"
                controlId="middleName"
                validationState={this.getValidationState('middleName')}
              >
                <ControlLabel>3. Middle Name</ControlLabel>
                <FormControl
                  type="text"
                  value={middleName}
                  placeholder="Enter text"
                  onChange={e => this.handleChange(e.target.value, 'middleName')}
                />
                {this.getValidationState('middleName') !== null ? (
                  <HelpBlock>Required.</HelpBlock>
                ) : (
                  ''
                )}
              </FormGroup>
              {/* MAIDEN NAME */}
              <FormGroup className="col-sm-12 col-md-6 col-lg-3" controlId="maidenName">
                <ControlLabel>4. Maiden Name</ControlLabel>
                <FormControl
                  type="text"
                  value={maidenName}
                  placeholder="Enter text"
                  onChange={e => this.handleChange(e.target.value, 'maidenName')}
                />
              </FormGroup>
            </div>
            <div className="row">
              {/* NAME EXTENSION */}
              <FormGroup className="col-sm-12 col-md-6 col-lg-3" controlId="nameExtension">
                <ControlLabel>5. Name Ext.</ControlLabel>
                <FormControl
                  type="text"
                  value={nameExtension}
                  placeholder="Enter text"
                  onChange={e => this.handleChange(e.target.value, 'nameExtension')}
                />
              </FormGroup>
              {/* ADDRESS */}
              <FormGroup
                className="col-sm-12 col-md-6 col-lg-3"
                controlId="address"
                validationState={this.getValidationState('address')}
              >
                <ControlLabel>6. Address</ControlLabel>
                <FormControl
                  type="text"
                  value={address}
                  placeholder="Enter text"
                  onChange={e => this.handleChange(e.target.value, 'address')}
                />
                {this.getValidationState('address') !== null ? (
                  <HelpBlock>Required.</HelpBlock>
                ) : (
                  ''
                )}
              </FormGroup>
              {/* PHONE NUMBER */}
              <FormGroup className="col-sm-12 col-md-6 col-lg-3" controlId="phoneNumber">
                <ControlLabel>7. Phone Number</ControlLabel>
                <FormControl
                  type="text"
                  value={phoneNumber}
                  placeholder="Enter text"
                  onChange={e => this.handleChange(e.target.value, 'phoneNumber')}
                />
              </FormGroup>
              {/* CELL NUMBER */}
              <FormGroup className="col-sm-12 col-md-6 col-lg-3" controlId="cellNumber">
                <ControlLabel>8. Cell Number</ControlLabel>
                <FormControl
                  type="text"
                  value={cellNumber}
                  placeholder="Enter text"
                  onChange={e => this.handleChange(e.target.value, 'cellNumber')}
                />
              </FormGroup>
            </div>
            {/* POLITICAL DISTRICT */}
            <div className="row">
              <FormGroup className="col-sm-12 col-md-6 col-lg-3" controlId="politicalDistrict">
                <ControlLabel>9. Political District</ControlLabel>
                <FormControl
                  type="text"
                  value={politicalDistrict}
                  placeholder="Enter text"
                  onChange={e => this.handleChange(e.target.value, 'politicalDistrict')}
                />
              </FormGroup>

              {/* CONGRESSIONAL DISTRICT */}
              <FormGroup className="col-sm-12 col-md-6 col-lg-3" controlId="congressionalDistrict">
                <ControlLabel>10. Congressional District</ControlLabel>
                <FormControl
                  type="text"
                  value={congressionalDistrict}
                  placeholder="Enter text"
                  onChange={e => this.handleChange(e.target.value, 'congressionalDistrict')}
                />
              </FormGroup>

              {/* CITIZENSHIP */}
              <FormGroup className="col-sm-12 col-md-6 col-lg-3" controlId="citizenship">
                <ControlLabel>11. Citizenship</ControlLabel>
                <FormControl
                  type="text"
                  value={citizenship}
                  placeholder="Enter text"
                  onChange={e => this.handleChange(e.target.value, 'citizenship')}
                />
              </FormGroup>

              {/* BIRTH DATE */}
              <FormGroup className="col-sm-12 col-md-6 col-lg-3" controlId="birthDate">
                <ControlLabel>Birth Date:</ControlLabel>

                <InputGroup>
                  <div className="customDatePickerWidth" style={{ height: '34px' }}>
                    <DatePicker
                      name="datetime"
                      className="form-control"
                      style={{
                        width: '100%',
                        fontSize: '300px',
                        overflow: 'true',
                      }}
                      autoComplete="off"
                      showYearDropdown
                      scrollableYearDropdown
                      selected={birthDate}
                      yearDropdownItemNumber={100}
                      dateFormat="MM-dd-yyyy"
                      onChange={this.changeBirthDate}
                    />
                  </div>
                  <InputGroup.Addon className="bg-blue">🎂</InputGroup.Addon>
                </InputGroup>
              </FormGroup>
            </div>
            <div className="row">
              {/* BIRTH PLACE */}
              <FormGroup className="col-sm-12 col-md-6 col-lg-3" controlId="birthPlace">
                <ControlLabel>13. Birth Place</ControlLabel>
                <FormControl
                  type="text"
                  value={birthPlace}
                  placeholder="Enter text"
                  onChange={e => this.handleChange(e.target.value, 'birthPlace')}
                />
              </FormGroup>
              {/* BLOOD TYPE */}
              <FormGroup className="col-sm-12 col-md-6 col-lg-3" controlId="bloodType">
                <ControlLabel>14. Blood Type</ControlLabel>
                <FormControl
                  type="text"
                  value={bloodType}
                  placeholder="Enter text"
                  onChange={e => this.handleChange(e.target.value, 'bloodType')}
                />
              </FormGroup>
              {/* HEIGHT */}
              <FormGroup className="col-sm-12 col-md-6 col-lg-3" controlId="height">
                <ControlLabel>15. Height</ControlLabel>
                <FormControl
                  type="text"
                  value={height}
                  placeholder="Enter text"
                  onChange={e => this.handleChange(e.target.value, 'height')}
                />
              </FormGroup>
              {/* SEX */}
              <FormGroup className="col-sm-12 col-md-6 col-lg-3" controlId="sex">
                <ControlLabel>16. Sex</ControlLabel>
                <FormControl
                  type="text"
                  value={sex}
                  placeholder="Enter text"
                  onChange={e => this.handleChange(e.target.value, 'sex')}
                />
              </FormGroup>
            </div>
            <div className="row">
              {/* CIVIL STATUS */}
              <FormGroup className="col-sm-12 col-md-6 col-lg-3" controlId="civilStatus">
                <ControlLabel>17. Civil Status</ControlLabel>
                <FormControl
                  type="text"
                  value={civilStatus}
                  placeholder="Enter text"
                  onChange={e => this.handleChange(e.target.value, 'civilStatus')}
                />
              </FormGroup>
              {/* TIN */}
              <FormGroup className="col-sm-12 col-md-6 col-lg-3" controlId="tin">
                <ControlLabel>18. TIN</ControlLabel>
                <FormControl
                  type="text"
                  value={tin}
                  placeholder="Enter text"
                  onChange={e => this.handleChange(e.target.value, 'tin')}
                />
              </FormGroup>
              {/* PHIL HEALTH */}
              <FormGroup className="col-sm-12 col-md-6 col-lg-3" controlId="philHealth">
                <ControlLabel>19. Phil Health</ControlLabel>
                <FormControl
                  type="text"
                  value={philHealth}
                  placeholder="Enter text"
                  onChange={e => this.handleChange(e.target.value, 'philHealth')}
                />
              </FormGroup>
              {/* SSS */}
              <FormGroup className="col-sm-12 col-md-6 col-lg-3" controlId="sss">
                <ControlLabel>20. SSS</ControlLabel>
                <FormControl
                  type="text"
                  value={sss}
                  placeholder="Enter text"
                  onChange={e => this.handleChange(e.target.value, 'sss')}
                />
              </FormGroup>
            </div>
            <div className="row">
              {/* IS LICENSED */}
              <FormGroup className="col-sm-12 col-md-6 col-lg-3" controlId="isLicensed">
                <ControlLabel>21. Is Licensed</ControlLabel>
                <FormControl
                  type="text"
                  value={isLicensed}
                  placeholder="Enter text"
                  onChange={e => this.handleChange(e.target.value, 'isLicensed')}
                />
              </FormGroup>
            </div>
            <hr />
            <div className="row">
              <FormGroup className="col-sm-12 col-md-6 col-lg-3" controlId="emergencyLabel">
                <ControlLabel>In Case of Emergency</ControlLabel>
              </FormGroup>
            </div>
            <div className="row">
              {/* EMERGENCY NAME */}
              <FormGroup className="col-sm-12 col-md-6 col-lg-3" controlId="emergencyName">
                <ControlLabel>22. Contact Name</ControlLabel>
                <FormControl
                  type="text"
                  value={emergencyName}
                  placeholder="Enter text"
                  onChange={e => this.handleChange(e.target.value, 'emergencyName')}
                />
              </FormGroup>
              {/* EMERGENCY RELATION */}
              <FormGroup className="col-sm-12 col-md-6 col-lg-3" controlId="emergencyRelation">
                <ControlLabel>23. Relation</ControlLabel>
                <FormControl
                  type="text"
                  value={emergencyRelation}
                  placeholder="Enter text"
                  onChange={e => this.handleChange(e.target.value, 'emergencyRelation')}
                />
              </FormGroup>
              {/* EMERGENCY ADDRESS */}
              <FormGroup className="col-sm-12 col-md-6 col-lg-3" controlId="emergencyAddress">
                <ControlLabel>24. Contact Address</ControlLabel>
                <FormControl
                  type="text"
                  value={emergencyAddress}
                  placeholder="Enter text"
                  onChange={e => this.handleChange(e.target.value, 'emergencyAddress')}
                />
              </FormGroup>
              {/* EMERGENCY CONTACT NUMBER */}
              <FormGroup className="col-sm-12 col-md-6 col-lg-3" controlId="emergencyNumber">
                <ControlLabel>25. Contact Number</ControlLabel>
                <FormControl
                  type="text"
                  value={emergencyNumber}
                  placeholder="Enter text"
                  onChange={e => this.handleChange(e.target.value, 'emergencyNumber')}
                />
              </FormGroup>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <ButtonGroup>
            <Button
              disabled={this.errors.length > 0 ? true : false}
              bsStyle="success"
              onClick={() => this.insertNewApplicant()}
            >
              Submit
            </Button>
            <Button onClick={() => toggleApplicationModal()}>Close</Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>
    );
  }
}
