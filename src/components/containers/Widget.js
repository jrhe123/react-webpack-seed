import React, { Component } from 'react';


// Components
import { ToggleBar, Comment } from '../presentation'

// Firebase config
import firebase from 'firebase/app';
import 'firebase/database';
import {DB_CONFIG} from '../../config/config';


class Widget extends Component{

	constructor(props){
		super(props);

		// Initial firebase
	    this.app = firebase.initializeApp(DB_CONFIG);
	    this.database = this.app.database().ref().child('chats');

		this.state = {
			showComments: false,
			comments: []
		}
	}

	componentWillMount(){

		const previousComments = this.state.comments;

		// add item
		this.database
			.on('child_added', snap => {

			previousComments.push({
				id: snap.key,
				text: snap.val().text,
				timestamp: snap.val().timestamp
			})

			this.setState({
				comments: previousComments
			})
		})
	}


	toggleComments(){
		this.setState({
			showComments: !this.state.showComments
		})
	}

	submitComment(e){

		if(e.keyCode == 13){

			const comment = {
				text: e.target.value,
				timestamp: Math.round(Date.now())
			}

			this.database.push().set(comment);

			e.target.value = ''
		}
	}

	render(){

		if(this.state.showComments){
			return (
					<div>
						<div className="fade-in" style={style.comments}>
							<div className="pop-up" style={style.header}>
								<div style={style.text}>My React Widget</div>
								<div style={style.text}>Firebase chat app</div>
								<div style={style.text}>Styled-components</div>
								<div style={style.text}>Full Stack Dev: Roy Test</div>
							</div>
							<div style={style.commentWrapper}>
								{
									this.state.comments.map((comment, i) => {
										return <Comment key={comment.timestamp} {...comment} />
									})
								}
							</div>
							<div>
								<input style={style.input} 
								       onKeyDown={this.submitComment.bind(this)}
									   type="text" 
									   placeholder="Enter comment.." />
							</div>

						</div>	

						<ToggleBar toggle={this.state.showComments} onToggle={this.toggleComments.bind(this)} />
					</div>
			)
		}

		return(
			<ToggleBar toggle={this.state.showComments} onToggle={this.toggleComments.bind(this)} />
		)
	}
}

const style = {

	comments: {
		transition: 'all 0.1s ease-in-out',
		zIndex:999,
		position:"fixed",
		right:23,
		bottom:92,
		height:412,
		width:320,
		background:"#F4F7F9",
		color:"#fff",
		textAlign:"center",
		borderRadius:6,
		boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
	},
	header: {
		background: "#1F8CEB",
		height:150,
		borderTopLeftRadius:6,
		borderTopRightRadius:6,
	},
	text: {
		paddingTop: 18
	},
	commentWrapper: {
		height:200,
		overflow:"auto",	
		color: "#000",
		paddingTop:12,
		marginBottom:12
	},
	input: {
		width:"90%", 
		height:30, 
		paddingLeft:10,
		margin: "0 auto",
		marginBottom:10,
		border:"none"
	}
}


export default Widget