import React, { Component } from 'react';
import {
  Button,
  ButtonGroup,
  ControlLabel,
  FormControl,
  FormGroup,
  HelpBlock,
  Modal,
} from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';
export default class ApplicationModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props,
      lastName: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps });
  }

  handleChange = (value, id) => {
    if (id === 'lastName') {
      this.setState({
        lastName: value,
      });
    }
  };

  getValidationState = id => {
    const { lastName } = this.state;
    if (id === 'lastName') {
      if (lastName.length === 0) return 'error';
      return null;
    }
  };
  render() {
    const { show } = this.state.data;
    const { lastName } = this.state;

    return (
      <Modal bsSize="large" aria-labelledby="contained-modal-title-md" role="document" show={show}>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-md">Application Form</Modal.Title>
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
            <FormGroup
              className="col-sm-12 col-md-6 col-lg-3"
              controlId="lastName"
              validationState={this.getValidationState('lastName')}
            >
              <ControlLabel>Last Name</ControlLabel>
              <FormControl
                type="text"
                value={lastName}
                placeholder="Enter text"
                onChange={e => this.handleChange(e.target.value, 'lastName')}
              />
              {this.getValidationState('lastName') !== null ? <HelpBlock>Required.</HelpBlock> : ''}
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <ButtonGroup></ButtonGroup>
        </Modal.Footer>
      </Modal>
    );
  }
}
