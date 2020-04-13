import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  ControlLabel,
  FormControl,
  FormGroup,
  Modal,
} from "react-bootstrap";
import {
  GridForm,
  Fieldset,
  Row,
  Field,
} from "../../../startup/utils/react-gridforms/lib";
import Swal from "sweetalert2";
export default class RankingSettingsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props,
      augmentation: 0,
      revolving: 0,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      data: nextProps,
      augmentation: nextProps.settings
        ? nextProps.settings.length > 0
          ? nextProps.settings[0].value
          : 0
        : 0,
      revolving: nextProps.settings
        ? nextProps.settings.length > 0
          ? nextProps.settings[1].value
          : 0
        : 0,
    });
  };

  handleChange = (value, id) => {
    if (id === "revolving") {
      this.setState({
        revolving: value,
      });
    } else if (id === "augmentation") {
      this.setState({
        augmentation: value,
      });
    }
  };

  updateInformation = () => {
    const { getSettings, toggleSettingsModal } = this.state.data;
    Swal.fire({
      title: "Submit Form?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continue",
    }).then((result) => {
      if (result.value) {
        const { augmentation, revolving } = this.state;
        let data = {
          augmentation,
          revolving,
        };
        Meteor.call("update-settings", data, (error, result) => {
          if (!error) {
            if (result === "success") {
              getSettings();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Settings has been successfuly updated",
                showConfirmButton: false,
                timer: 2500,
              });
              toggleSettingsModal();
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Submission failed. Please try again",
                showConfirmButton: false,
                timer: 2500,
              });
            }
          } else {
            Swal.fire({
              position: "center",
              icon: "error",
              text: "Submission failed. Please try again",
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
      }
    });
  };

  render() {
    const { augmentation, revolving } = this.state;
    const { show, toggleSettingsModal } = this.state.data;
    return (
      <Modal bsSize="lg" role="document" show={show}>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-md">Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GridForm>
            <Fieldset>
              <Row span={1}>
                <Field span={1} style={{ padding: "8px 0px 8px 0px" }}>
                  <FormGroup controlId="numberOfRevolving">
                    <ControlLabel>Maximum Revolving Slots</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="number"
                      value={revolving}
                      onChange={(e) =>
                        this.handleChange(e.target.value, "revolving")
                      }
                    ></FormControl>
                  </FormGroup>
                </Field>
              </Row>
              <Row span={1}>
                <Field span={1} style={{ padding: "8px 0px 8px 0px" }}>
                  <FormGroup controlId="numberOfAugmentation">
                    <ControlLabel>Maximum Augmentation Slots</ControlLabel>
                    <FormControl
                      autoComplete="off"
                      type="number"
                      value={augmentation}
                      onChange={(e) =>
                        this.handleChange(e.target.value, "augmentation")
                      }
                    ></FormControl>
                  </FormGroup>
                </Field>
              </Row>
            </Fieldset>
          </GridForm>
        </Modal.Body>
        <Modal.Footer>
          <ButtonGroup>
            <Button bsStyle="success" onClick={() => this.updateInformation()}>
              <i className="fa fa-check" /> Submit
            </Button>
            <Button onClick={() => toggleSettingsModal()}>Close</Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>
    );
  }
}
