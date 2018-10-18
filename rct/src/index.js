import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import Article from './components/Article';

function Main() {
	return (
		<div>
			<h1>Task list</h1>
			{/*<Article anyText="random props"/>*/}
			<Article />
		</div>
	)
}

ReactDom.render(<Main/>, document.getElementById('root'));