import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import AutosuggestHighlightMatch from "autosuggest-highlight/match";
import AutosuggestHighlightParse from "autosuggest-highlight/parse";

export default class AutoSuggestModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props,
      value: props.value,
      suggestions: [],
      people: props.profiles,
      showApplicationModal: false,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      data: nextProps,
      people: nextProps.profiles,
      value: nextProps.value,
    });
  };

  escapeRegexCharacters = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  getSuggestions = (value) => {
    const escapedValue = this.escapeRegexCharacters(value.trim());
    if (escapedValue === "") {
      return [];
    }
    const regex = new RegExp("\\b" + escapedValue, "i");
    return this.state.people.filter((person) =>
      regex.test(this.getSuggestionValue(person))
    );
  };

  getSuggestionValue = (suggestion) => {
    return `${suggestion.employeeNumber} - ${suggestion.firstName} ${suggestion.lastName}`;
  };

  renderSuggestion = (suggestion, { query }) => {
    const suggestionText = `${suggestion.employeeNumber} - ${suggestion.firstName} ${suggestion.lastName}`;
    const matches = AutosuggestHighlightMatch(suggestionText, query);
    const parts = AutosuggestHighlightParse(suggestionText, matches);

    return (
      <span className={"suggestion-content"}>
        <span className="name">
          {parts.map((part, index) => {
            const className = part.highlight ? "highlight" : null;

            return (
              <span className={className} key={index}>
                {part.text}
              </span>
            );
          })}
        </span>
      </span>
    );
  };

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  onSuggestionSelected = (event, { suggestion }) => {
    this.state.data.toggleAutoSuggestProfileModal("close", suggestion);
  };
  render() {
    const { value, suggestions } = this.state;
    const { show, toggleAutoSuggestProfileModal } = this.state.data;

    const inputProps = {
      placeholder: "Enter Name / Employee Number",
      value,
      onChange: this.onChange,
    };
    return (
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Personnel Lookup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Autosuggest
            onSuggestionSelected={this.onSuggestionSelected}
            suggestions={suggestions.slice(0, 50)}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
            style={{ width: "100%" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle="default"
            className="pull-right"
            onClick={() => toggleAutoSuggestProfileModal()}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
