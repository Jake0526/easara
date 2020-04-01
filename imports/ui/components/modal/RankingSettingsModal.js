import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import {
  Button,
  ButtonGroup,
  ControlLabel,
  FormControl,
  FormGroup,
  InputGroup,
  Modal,
} from 'react-bootstrap';
import { GridForm, Fieldset, Row, Field } from '../../../startup/utils/react-gridforms/lib';
export default class RankingSettingsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props,
    };
  }

  componentWillReceiveProps = nextProps => {
    this.setState({
      data: nextProps,
    });
  };

  render() {
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
                <Field span={1} style={{ padding: '8px 0px 8px 0px' }}>
                  <FormGroup cotrolId="numberOfRevolving">
                    <ControlLabel>Maximum Revolving Slots</ControlLabel>
                    <FormControl autoComplete="off" type="number"></FormControl>
                  </FormGroup>
                </Field>
              </Row>
              <Row span={1}>
                <Field span={1} style={{ padding: '8px 0px 8px 0px' }}>
                  <FormGroup cotrolId="numberOfAugmentation">
                    <ControlLabel>Maximum Augmentation Slots</ControlLabel>
                    <FormControl autoComplete="off" type="number"></FormControl>
                  </FormGroup>
                </Field>
              </Row>
            </Fieldset>
          </GridForm>
        </Modal.Body>
        <Modal.Footer>
          <ButtonGroup>
            <Button bsStyle="success">Submit</Button>
            <Button onClick={() => toggleSettingsModal()}>Close</Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>
    );
  }
}
