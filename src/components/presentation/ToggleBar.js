import React, { Component } from 'react';


import {BUTTON} from './ToggleBar.style';


class ToggleBar extends Component{



	render(){

		let imgUrl = this.props.toggle ? 'assets/close.gif' : 'assets/icon.png';
		let borderRadius = this.props.toggle ? '50%' : '13px';
		const divStyle = {
            backgroundImage: 'url(' + imgUrl + ')',
            borderRadius: borderRadius
        }

		return(
			<BUTTON className={this.props.toggle ? "rotate" : ""} style={divStyle} onClick={this.props.onToggle.bind(this)} />
		)
	}
}

export default ToggleBar
