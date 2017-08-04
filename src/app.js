import React, { Component } from 'react'
import ReactDOM from 'react-dom'


// Components 
import { Widget } from './components/containers'

class App extends Component {

	render(){
		return (
			<div>
				<Widget />
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))