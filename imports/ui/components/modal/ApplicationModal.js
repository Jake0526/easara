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
import { GridForm, Fieldset, Row, Field } from '../../../startup/utils/react-gridforms/lib';
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
          return 'success';
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
          return 'success';
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
          return 'success';
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
          return 'success';
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
          {/* <GridForms.fieldRows data-row-span="3" /> */}
          {/* <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          /> */}
          <GridForm>
            <Fieldset legend="Personal Information" style={{ fontSize: '16px' }}>
              <Row span={4}>
                <Field span={1}>
                  {/* FIRSTNAME */}
                  <FormGroup
                    controlId="firstName"
                    validationState={this.getValidationState('firstName')}
                  >
                    <ControlLabel>1. First Name</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      value={firstName}
                      placeholder="Enter text"
                      onChange={e => this.handleChange(e.target.value, 'firstName')}
                    />
                    {this.getValidationState('firstName') !== 'success' ? (
                      <HelpBlock>Required.</HelpBlock>
                    ) : (
                      <HelpBlock>
                        <i class="fa fa-check"></i>
                      </HelpBlock>
                    )}
                  </FormGroup>
                </Field>
                <Field span={1}>
                  {/* LASTNAME */}
                  <FormGroup
                    controlId="lastName"
                    validationState={this.getValidationState('lastName')}
                  >
                    <ControlLabel>2. Last Name</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      value={lastName}
                      placeholder="Enter text"
                      onChange={e => this.handleChange(e.target.value, 'lastName')}
                    />
                    {this.getValidationState('lastName') !== 'success' ? (
                      <HelpBlock>Required.</HelpBlock>
                    ) : (
                      <HelpBlock>
                        <i class="fa fa-check"></i>
                      </HelpBlock>
                    )}
                  </FormGroup>
                </Field>
                <Field span={1}>
                  {/* MIDDLE NAME */}
                  <FormGroup
                    controlId="middleName"
                    validationState={this.getValidationState('middleName')}
                  >
                    <ControlLabel>3. Middle Name</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      value={middleName}
                      placeholder="Enter text"
                      onChange={e => this.handleChange(e.target.value, 'middleName')}
                    />
                    {this.getValidationState('middleName') !== 'success' ? (
                      <HelpBlock>Required.</HelpBlock>
                    ) : (
                      <HelpBlock>
                        <i class="fa fa-check"></i>
                      </HelpBlock>
                    )}
                  </FormGroup>
                </Field>
                <Field span={1}>
                  {/* MAIDEN NAME */}
                  <FormGroup controlId="maidenName">
                    <ControlLabel>4. Maiden Name</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      value={maidenName}
                      placeholder="Enter text"
                      onChange={e => this.handleChange(e.target.value, 'maidenName')}
                    />
                  </FormGroup>
                </Field>
              </Row>
              <Row span={4}>
                <Field span={1}>
                  {/* NAME EXTENSION */}
                  <FormGroup controlId="nameExtension">
                    <ControlLabel>5. Name Ext.</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      value={nameExtension}
                      placeholder="Enter text"
                      onChange={e => this.handleChange(e.target.value, 'nameExtension')}
                    />
                    <HelpBlock style={{ color: 'white' }}>Required.</HelpBlock>
                  </FormGroup>
                </Field>
                <Field span={1}>
                  {/* ADDRESS */}
                  <FormGroup
                    controlId="address"
                    validationState={this.getValidationState('address')}
                  >
                    <ControlLabel>6. Address</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      value={address}
                      placeholder="Enter text"
                      onChange={e => this.handleChange(e.target.value, 'address')}
                    />
                    {this.getValidationState('address') !== 'success' ? (
                      <HelpBlock>Required.</HelpBlock>
                    ) : (
                      <HelpBlock>
                        <i class="fa fa-check"></i>
                      </HelpBlock>
                    )}
                  </FormGroup>
                </Field>
                <Field span={1}>
                  {/* PHONE NUMBER */}
                  <FormGroup controlId="phoneNumber">
                    <ControlLabel>7. Phone Number</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      value={phoneNumber}
                      placeholder="Enter text"
                      onChange={e => this.handleChange(e.target.value, 'phoneNumber')}
                    />
                    <HelpBlock style={{ color: 'white' }}>Required.</HelpBlock>
                  </FormGroup>
                </Field>
                <Field span={1}>
                  {/* CELL NUMBER */}
                  <FormGroup controlId="cellNumber">
                    <ControlLabel>8. Cell Number</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      value={cellNumber}
                      placeholder="Enter text"
                      onChange={e => this.handleChange(e.target.value, 'cellNumber')}
                    />
                    <HelpBlock style={{ color: 'white' }}>Required.</HelpBlock>
                  </FormGroup>
                </Field>
              </Row>
              <Row span={4}>
                <Field span={1}>
                  {/* CONGRESSIONAL DISTRICT */}
                  <FormGroup controlId="congressionalDistrict">
                    <ControlLabel>9. Congressional District</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      value={congressionalDistrict}
                      placeholder="Enter text"
                      onChange={e => this.handleChange(e.target.value, 'congressionalDistrict')}
                    />
                  </FormGroup>
                </Field>
                <Field span={1}>
                  {/* POLITICAL DISTRICT */}
                  <FormGroup controlId="politicalDistrict">
                    <ControlLabel>10. Political District</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      value={politicalDistrict}
                      placeholder="Enter text"
                      onChange={e => this.handleChange(e.target.value, 'politicalDistrict')}
                    />
                  </FormGroup>
                </Field>

                <Field span={1}>
                  {/* CITIZENSHIP */}
                  <FormGroup controlId="citizenship">
                    <ControlLabel>11. Citizenship</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      value={citizenship}
                      placeholder="Enter text"
                      onChange={e => this.handleChange(e.target.value, 'citizenship')}
                    />
                  </FormGroup>
                </Field>
                <Field span={1}>
                  {/* BIRTH DATE */}
                  <FormGroup controlId="birthDate">
                    <ControlLabel>12. Birth Date:</ControlLabel>

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
                </Field>
              </Row>
              <Row span={4}>
                <Field span={1}>
                  {/* BIRTH PLACE */}
                  <FormGroup controlId="birthPlace">
                    <ControlLabel>13. Birth Place</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      value={birthPlace}
                      placeholder="Enter text"
                      onChange={e => this.handleChange(e.target.value, 'birthPlace')}
                    />
                  </FormGroup>
                </Field>
                <Field span={1}>
                  {/* BLOOD TYPE */}
                  <FormGroup controlId="bloodType">
                    <ControlLabel>14. Blood Type</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      value={bloodType}
                      placeholder="Enter text"
                      onChange={e => this.handleChange(e.target.value, 'bloodType')}
                    />
                  </FormGroup>
                </Field>
                <Field span={1}>
                  {/* HEIGHT */}
                  <FormGroup controlId="height">
                    <ControlLabel>15. Height</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="number"
                      value={height}
                      placeholder="Enter height (cm.)"
                      onChange={e => this.handleChange(e.target.value, 'height')}
                    />
                  </FormGroup>
                </Field>
                <Field span={1}>
                  {/* SEX */}
                  <FormGroup controlId="sex">
                    <ControlLabel>16. Sex</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      componentClass="select"
                      placeholder="Please Select"
                      onChange={e => this.handleChange(e.target.value, 'sex')}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </FormControl>
                  </FormGroup>
                </Field>
              </Row>
              <Row span={4}>
                <Field span={1}>
                  {/* CIVIL STATUS */}
                  <FormGroup controlId="civilStatus">
                    <ControlLabel>17. Civil Status</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      value={civilStatus}
                      placeholder="Enter text"
                      onChange={e => this.handleChange(e.target.value, 'civilStatus')}
                    />
                  </FormGroup>
                </Field>
                <Field span={1}>
                  {/* TIN */}
                  <FormGroup controlId="tin">
                    <ControlLabel>18. TIN</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      value={tin}
                      placeholder="Enter text"
                      onChange={e => this.handleChange(e.target.value, 'tin')}
                    />
                  </FormGroup>
                </Field>
                <Field span={1}>
                  {/* PHIL HEALTH */}
                  <FormGroup controlId="philHealth">
                    <ControlLabel>19. Phil Health</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      value={philHealth}
                      placeholder="Enter text"
                      onChange={e => this.handleChange(e.target.value, 'philHealth')}
                    />
                  </FormGroup>
                </Field>
                <Field span={1}>
                  {/* SSS */}
                  <FormGroup controlId="sss">
                    <ControlLabel>20. SSS</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      value={sss}
                      placeholder="Enter text"
                      onChange={e => this.handleChange(e.target.value, 'sss')}
                    />
                  </FormGroup>
                </Field>
              </Row>
            </Fieldset>
            <br />
            <br />
            <Fieldset legend="In Case of Emergency" style={{ fontSize: '16px' }}>
              <Row span={4}>
                <Field span={1}>
                  {/* EMERGENCY NAME */}
                  <FormGroup controlId="emergencyName">
                    <ControlLabel>21. Contact Name</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      value={emergencyName}
                      placeholder="Enter text"
                      onChange={e => this.handleChange(e.target.value, 'emergencyName')}
                    />
                  </FormGroup>
                </Field>
                <Field span={1}>
                  {/* EMERGENCY RELATION */}
                  <FormGroup controlId="emergencyRelation">
                    <ControlLabel>22. Contact Relationship</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      value={emergencyRelation}
                      placeholder="Enter text"
                      onChange={e => this.handleChange(e.target.value, 'emergencyRelation')}
                    />
                  </FormGroup>
                </Field>
                <Field span={1}>
                  {/* EMERGENCY ADDRESS */}
                  <FormGroup controlId="emergencyAddress">
                    <ControlLabel>23. Contact Address</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      value={emergencyAddress}
                      placeholder="Enter text"
                      onChange={e => this.handleChange(e.target.value, 'emergencyAddress')}
                    />
                  </FormGroup>
                </Field>
                <Field span={1}>
                  {/* EMERGENCY CONTACT NUMBER */}
                  <FormGroup controlId="emergencyNumber">
                    <ControlLabel>24. Contact Number</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      value={emergencyNumber}
                      placeholder="Enter text"
                      onChange={e => this.handleChange(e.target.value, 'emergencyNumber')}
                    />
                  </FormGroup>
                </Field>
              </Row>
            </Fieldset>
          </GridForm>
        </Modal.Body>
        <Modal.Footer>
          <ButtonGroup>
            <Button
              disabled={this.errors.length > 0 ? true : false}
              bsStyle="success"
              onClick={() => this.insertNewApplicant()}
            >
              <i className="fa fa-check" aria-hidden="true"></i> Submit
            </Button>
            <Button onClick={() => toggleApplicationModal()}>Close</Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>
    );
  }
}
