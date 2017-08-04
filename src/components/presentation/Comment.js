import React, { Component } from 'react';

export default (props) => {	

	const comment = props;
	let date = new Date(comment.timestamp).toUTCString();
	const formatted = formatDate(date);

	return (
		<div style={style.comment}> 
			{formatted}: {comment.text}
		</div>
	)
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

const style = {

	comment: {
		textAlign:"left",
		padding:12, 
		borderBottom:"1px dotted #ddd"
	}
}