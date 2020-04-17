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
    return `${suggestion.first_name} ${suggestion.last_name}`;
  };

  renderSuggestion = (suggestion, { query }) => {
    const suggestionText = `${suggestion.first_name} ${suggestion.last_name}, District ${suggestion.congressional_district}, ${suggestion.political_district}`;
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
    this.state.data.toggleApplicationModal("open", suggestion);
  };
  render() {
    const { value, suggestions } = this.state;
    const { show, toggleAutoSuggestModal } = this.state.data;
    const tooltip = (
      <Tooltip id="tooltip">
        Create a new profile if the name is non-existent on suggestions.
        Redirects to applicant profiling page.
      </Tooltip>
    );
    const inputProps = {
      placeholder: "Enter Name",
      value,
      onChange: this.onChange,
    };
    return (
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Profile Lookup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Autosuggest
            onSuggestionSelected={this.onSuggestionSelected}
            suggestions={suggestions}
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
            className="pull-left"
            onClick={() => toggleAutoSuggestModal()}
          >
            Close
          </Button>
          <OverlayTrigger placement="top" overlay={tooltip}>
            <Link to="/applicant-profiles">
              <Button bsStyle="primary">
                <i className="fa fa-user-plus" /> <span> New Profile </span>
              </Button>
            </Link>
          </OverlayTrigger>
        </Modal.Footer>
      </Modal>
    );
  }
}
