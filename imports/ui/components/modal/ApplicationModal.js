import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import Swal from "sweetalert2";
import {
  Button,
  ButtonGroup,
  ControlLabel,
  FormControl,
  FormGroup,
  InputGroup,
  Modal,
} from "react-bootstrap";
import {
  GridForm,
  Fieldset,
  Row,
  Field,
} from "../../../startup/utils/react-gridforms/lib";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default class ApplicantProfileModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props,

      //DB FIELDS
      lastName: "",
      firstName: "",
      middleName: "",
      maidenName: "",
      nameExtension: "",
      address: "",
      cellNumber: "",
      politicalDistrict: "",
      congressionalDistrict: "",
      birthDate: new Date(),
      employeeNumber: "",
      createdAt: "",
      updatedAt: "",
      code: "",
      profileId: "",
      //POLITICAL DISTRICTS
      firstDistrict: [
        <option key="poblacion" value="Poblacion">
          Poblacion
        </option>,
        <option key="talomo" value="Talomo">
          Talomo
        </option>,
      ],
      secondDistrict: [
        <option key="agdao" value="Agdao">
          Agdao
        </option>,
        <option key="buhangin" value="Buhangin">
          Buhangin
        </option>,
        <option key="bunawan" value="Bunawan">
          Bunawan
        </option>,
        <option key="pacquibato" value="Paquibato">
          Paquibato
        </option>,
      ],
      thirdDistrict: [
        <option key="baguio" value="Baguio">
          Baguio
        </option>,
        <option key="calinan" value="Calinan">
          Calinan
        </option>,
        <option key="marilog" value="Marilog">
          Marilog
        </option>,
        <option key="toril" value="Toril">
          Toril
        </option>,
        <option key="tugbok" value="Tugbok">
          Tugbok
        </option>,
      ],
    };

    this.errors = [];
    this.isSame = true;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps,
      lastName: nextProps.data.last_name ? nextProps.data.last_name : "",
      firstName: nextProps.data.first_name ? nextProps.data.first_name : "",
      middleName: nextProps.data.middle_name ? nextProps.data.middle_name : "",
      maidenName: nextProps.data.maiden_name ? nextProps.data.maiden_name : "",
      nameExtension: nextProps.data.name_ext ? nextProps.data.name_ext : "",
      address: nextProps.data.address ? nextProps.data.address : "",
      cellNumber: nextProps.data.contact_number
        ? nextProps.data.contact_number
        : "",
      politicalDistrict: nextProps.data.political_district
        ? nextProps.data.political_district
        : "",
      congressionalDistrict: nextProps.data.congressional_district
        ? nextProps.data.congressional_district
        : "",
      birthDate: nextProps.data.birth_date ? nextProps.data.birth_date : "",
      code: nextProps.data.code ? nextProps.data.code : "",
      profileId: nextProps.data.id ? nextProps.data.id : "",
      employeeNumber: nextProps.data.employee_number
        ? nextProps.data.employee_number
        : "",
      createdAt: nextProps.data.created_at ? nextProps.data.created_at : "",
      updatedAt: nextProps.data.updated_at ? nextProps.data.updated_at : "",
    });
  }

  handleChange = (value, id) => {
    const { data } = this.state.data;
    const {
      address,
      birthDate,
      code,
      congressionalDistrict,
      cellNumber,
      createdAt,
      employeeNumber,
      firstName,
      profileId,
      lastName,
      maidenName,
      middleName,
      nameExtension,
      politicalDistrict,
      updatedAt,
    } = this.state;
    let info = {
      id: profileId,
      code,
      employee_number: employeeNumber,
      first_name: firstName,
      last_name: lastName,
      middle_name: middleName,
      maiden_name: maidenName,
      name_ext: nameExtension,
      address,
      political_district: politicalDistrict,
      congressional_district: congressionalDistrict,
      contact_number: cellNumber,
      birth_date: birthDate,
      created_at: createdAt,
      updated_at: updatedAt,
    };

    if (id === "lastName") {
      info.last_name = value;
      this.setState({
        lastName: value,
      });
    } else if (id === "firstName") {
      info.first_name = value;
      this.setState({
        firstName: value,
      });
    } else if (id === "middleName") {
      info.middle_name = value;
      this.setState({
        middleName: value,
      });
    } else if (id === "maidenName") {
      info.maiden_name = value;
      this.setState({
        maidenName: value,
      });
    } else if (id === "nameExtension") {
      info.name_ext = value;
      this.setState({
        nameExtension: value,
      });
    } else if (id === "address") {
      info.address = value;
      this.setState({
        address: value,
      });
    } else if (id === "cellNumber") {
      info.contact_number = value;
      this.setState({
        cellNumber: value,
      });
    } else if (id === "politicalDistrict") {
      info.political_district = value;
      this.setState({
        politicalDistrict: value,
      });
    } else if (id === "congressionalDistrict") {
      info.congressional_district = value;
      this.setState({
        congressionalDistrict: value,
      });
    } else if (id === "birthDate") {
      info.birth_date = value;
      this.setState({
        birthDate: value,
      });
    }

    this.isSame = JSON.stringify(data) == JSON.stringify(info);
  };

  getValidationState = (id) => {
    const {
      lastName,
      firstName,
      middleName,
      address,
      congressionalDistrict,
    } = this.state;
    switch (id) {
      case "lastName":
        if (lastName.length === 0) {
          this.errors.includes("lastName")
            ? null
            : this.errors.push("lastName");
          return "error";
        } else {
          let index = this.errors.indexOf("lastName");
          if (index > -1) {
            this.errors.splice(index, 1);
          }
          return "success";
        }
      case "firstName":
        if (firstName.length === 0) {
          this.errors.includes("firstName")
            ? null
            : this.errors.push("firstName");
          return "error";
        } else {
          let index = this.errors.indexOf("firstName");
          if (index > -1) {
            this.errors.splice(index, 1);
          }
          return "success";
        }
      case "middleName":
        if (middleName.length === 0) {
          this.errors.includes("middleName")
            ? null
            : this.errors.push("middleName");
          return "error";
        } else {
          let index = this.errors.indexOf("middleName");
          if (index > -1) {
            this.errors.splice(index, 1);
          }
          return "success";
        }
      case "address":
        if (address.length === 0) {
          this.errors.includes("address") ? null : this.errors.push("address");
          return "error";
        } else {
          let index = this.errors.indexOf("address");
          if (index > -1) {
            this.errors.splice(index, 1);
          }
          return "success";
        }
      case "politicalDistrict":
        if (congressionalDistrict.length === 0) {
          return "warning";
        } else {
          return null;
        }
    }
  };

  updateInformation = (id) => {
    const { selectApplications, toggleApplicationModal } = this.state.data;
    const {
      firstName,
      lastName,
      middleName,
      maidenName,
      nameExtension,
      address,
      cellNumber,
      politicalDistrict,
      congressionalDistrict,
      birthDate,
      employeeNumber,
      beginDate,
      profileId,
    } = this.state;
    let data = {
      firstName,
      lastName,
      middleName,
      maidenName,
      nameExtension,
      address,
      cellNumber,
      politicalDistrict,
      congressionalDistrict,
      birthDate,
      employeeNumber,
      beginDate,
      applicantProfileId: profileId,
    };
    Meteor.call("update-profile", data, (error, result) => {
      if (!error) {
        if (result === "success") {
          selectApplications();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Application has been submitted",
            showConfirmButton: false,
            showClass: {
              popup: "animated fadeInDown faster",
            },
            hideClass: {
              popup: "animated fadeOutUp faster",
            },
            timer: 2500,
          });
          toggleApplicationModal("close");
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Submission failed. Please try again",
            showConfirmButton: false,
            showClass: {
              popup: "animated fadeInDown faster",
            },
            hideClass: {
              popup: "animated fadeOutUp faster",
            },
            timer: 2500,
          });
        }
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          text: "Submission failed. Please try again",
          showConfirmButton: false,
          showClass: {
            popup: "animated fadeInDown faster",
          },
          hideClass: {
            popup: "animated fadeOutUp faster",
          },
          timer: 2500,
        });
      }
    });
  };

  insertApplication = () => {
    const { code } = this.state;
    Swal.fire({
      title: "Submit Form?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      showClass: {
        popup: "animated fadeInDown faster",
      },
      hideClass: {
        popup: "animated fadeOutUp faster",
      },
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continue",
    }).then((result) => {
      if (result.value) {
        Meteor.call("insert-application", code, (error, result) => {
          if (!error) {
            if (result === "success") {
              this.updateInformation();
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Submission failed. Please try again",
                showConfirmButton: false,
                showClass: {
                  popup: "animated fadeInDown faster",
                },
                hideClass: {
                  popup: "animated fadeOutUp faster",
                },
                timer: 2500,
              });
            }
          } else {
            Swal.fire({
              position: "center",
              icon: "error",
              text: "Submission failed. Please try again",
              showConfirmButton: false,
              showClass: {
                popup: "animated fadeInDown faster",
              },
              hideClass: {
                popup: "animated fadeOutUp faster",
              },
              timer: 2500,
            });
          }
        });
      }
    });
  };

  changeBirthDate = (date) => {
    this.handleChange(date, "birthDate");
  };

  fixBootstrapModal = () => {
    var modalNode = document.querySelector('.modal[tabindex="-1"]');
    if (!modalNode) return;

    modalNode.removeAttribute("tabindex");
    modalNode.classList.add("js-swal-fixed");
  };

  restoreBootstrapModal = () => {
    var modalNode = document.querySelector(".modal.js-swal-fixed");
    if (!modalNode) return;

    modalNode.setAttribute("tabindex", "-1");
    modalNode.classList.remove("js-swal-fixed");
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
      cellNumber,
      congressionalDistrict,
      politicalDistrict,
      birthDate,

      //POLITICAL DISTRICT OPTIONS
      firstDistrict,
      secondDistrict,
      thirdDistrict,

      //EXISTING PERSONNEL
      employeeNumber,
      existingPersonnel,

      //UPDATE
      profileId,
    } = this.state;
    console.log(this.isSame);
    let personelLegend = existingPersonnel
      ? "ID Number - " + employeeNumber
      : "";
    let legend = personelLegend;
    return (
      <Modal bsSize="large" role="document" show={show}>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-lg">
            Application Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GridForm>
            <Fieldset legend={legend} style={{ fontSize: "16px" }}>
              <Row span={3}>
                <Field span={1}>
                  {/* FIRSTNAME */}
                  <FormGroup
                    controlId="firstName"
                    validationState={this.getValidationState("firstName")}
                  >
                    <ControlLabel>1. First Name</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      value={firstName}
                      placeholder="Required"
                      onChange={(e) =>
                        this.handleChange(e.target.value, "firstName")
                      }
                    />
                  </FormGroup>
                </Field>
                <Field span={1}>
                  {/* LASTNAME */}
                  <FormGroup
                    controlId="lastName"
                    validationState={this.getValidationState("lastName")}
                  >
                    <ControlLabel>2. Last Name</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      value={lastName}
                      placeholder="Required"
                      onChange={(e) =>
                        this.handleChange(e.target.value, "lastName")
                      }
                    />
                  </FormGroup>
                </Field>
                <Field span={1}>
                  {/* MIDDLE NAME */}
                  <FormGroup
                    controlId="middleName"
                    validationState={this.getValidationState("middleName")}
                  >
                    <ControlLabel>3. Middle Name</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      value={middleName}
                      placeholder="Required"
                      onChange={(e) =>
                        this.handleChange(e.target.value, "middleName")
                      }
                    />
                  </FormGroup>
                </Field>
              </Row>
              <Row span={3}>
                <Field span={1}>
                  {/* MAIDEN NAME */}
                  <FormGroup controlId="maidenName">
                    <ControlLabel>4. Maiden Name</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      value={maidenName}
                      onChange={(e) =>
                        this.handleChange(e.target.value, "maidenName")
                      }
                    />
                  </FormGroup>
                </Field>
                <Field span={1}>
                  {/* NAME EXTENSION */}
                  <FormGroup controlId="nameExtension">
                    <ControlLabel>5. Name Ext.</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      value={nameExtension}
                      onChange={(e) =>
                        this.handleChange(e.target.value, "nameExtension")
                      }
                    />
                  </FormGroup>
                </Field>
                <Field span={1}>
                  {/* CELL NUMBER */}
                  <FormGroup controlId="cellNumber">
                    <ControlLabel>6. Contact Number</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      value={cellNumber}
                      onChange={(e) =>
                        this.handleChange(e.target.value, "cellNumber")
                      }
                    />
                  </FormGroup>
                </Field>
              </Row>
              <Row span={4}>
                <Field span={1}>
                  {/* CONGRESSIONAL DISTRICT */}
                  <FormGroup controlId="congressionalDistrict">
                    <ControlLabel>7. Congressional District</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      componentClass="select"
                      onChange={(e) =>
                        this.handleChange(
                          e.target.value,
                          "congressionalDistrict"
                        )
                      }
                      value={
                        congressionalDistrict === "1"
                          ? "1"
                          : congressionalDistrict === "2"
                          ? "2"
                          : congressionalDistrict === "3"
                          ? "3"
                          : ""
                      }
                    >
                      <option value={""}>Please Select</option>
                      <option value="1">1st</option>
                      <option value="2">2nd</option>
                      <option value="3">3rd</option>
                    </FormControl>
                  </FormGroup>
                </Field>
                <Field span={1}>
                  {/* POLITICAL DISTRICT */}
                  <FormGroup
                    controlId="politicalDistrict"
                    validationState={this.getValidationState(
                      "politicalDistrict"
                    )}
                  >
                    <ControlLabel>8. Political District</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      componentClass="select"
                      disabled={
                        this.getValidationState("politicalDistrict") !== null
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        this.handleChange(e.target.value, "politicalDistrict")
                      }
                      value={politicalDistrict ? politicalDistrict : ""}
                    >
                      <option value={""}>Please Select</option>
                      {congressionalDistrict === "1"
                        ? firstDistrict
                        : congressionalDistrict === "2"
                        ? secondDistrict
                        : congressionalDistrict === "3"
                        ? thirdDistrict
                        : null}
                    </FormControl>
                  </FormGroup>
                </Field>

                <Field span={1}>
                  {/* BIRTH DATE */}
                  <FormGroup controlId="birthDate">
                    <ControlLabel>9. Birth Date:</ControlLabel>

                    <InputGroup>
                      <div
                        className="customDatePickerWidth"
                        style={{ height: "34px" }}
                      >
                        <DatePicker
                          name="datetime"
                          className="form-control"
                          style={{
                            width: "100%",
                            fontSize: "300px",
                            overflow: "true",
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
                      <InputGroup.Addon className="bg-blue">
                        🎂
                      </InputGroup.Addon>
                    </InputGroup>
                  </FormGroup>
                </Field>
              </Row>

              <Row span={1}>
                <Field span={1}>
                  {/* ADDRESS */}
                  <FormGroup
                    controlId="address"
                    validationState={this.getValidationState("address")}
                  >
                    <ControlLabel>10. Address</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      value={address}
                      placeholder="Required"
                      onChange={(e) =>
                        this.handleChange(e.target.value, "address")
                      }
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
              onClick={() => this.insertApplication(profileId)}
            >
              <i className="fa fa-check" aria-hidden="true"></i>{" "}
              {this.isSame ? "Submit" : "Update Profile and Submit Application"}
            </Button>
            <Button onClick={() => toggleApplicationModal()}>Close</Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>
    );
  }
}
