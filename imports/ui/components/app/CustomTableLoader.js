import React, { Component } from "react";

export default class CustomTableLoader extends Component {
	render() {
		return (
			this.props.loading
			  ? <div className='-loading -active'>
						<div className='-loading-inner'>
							<img className="loading-gov" src="/img/loading-gov.gif"></img>
								<style dangerouslySetInnerHTML={{__html: `
									.loading-gov {
										position: absolute;
										top: 50%;
										left: 50%;
										width: 100px;
										height: 100px;
										margin-top: -50px; /* Half the height */
										margin-left: -50px; /* Half the width */
									} 
								`}}></style>
							</div>
				</div>
			  : null
		);
	}
}