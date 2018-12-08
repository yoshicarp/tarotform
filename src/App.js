import React from 'react';

import cards from './cards.json';

import './pure-min.css';
import './grids-responsive-min.css';
import './style.css';

const Card = (props) => <div className="card">
	<img src={props.url}></img>
	<p>{props.name}</p>	
</div>;

const Reading = (props) => <div className="reading">
	<h2>Your Reading</h2>
	<p>{props.text}</p>
</div>;

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			cards: [],
			readingText: "",
			buttonEnabled: true
		};
		this.timeouts = [];
	}

	read() {
		this.setState({buttonEnabled: false})

		for(var t in this.timeouts) {
			if(t != null) {
				clearTimeout(t);
			}
		}

		this.setState({cards: [], readingText: ""});

		for(var i = 0; i < this.props.card_count; i++) {
			this.timeouts[i] = setTimeout((i) => {
				this.state.cards[i] = cards[parseInt(Math.random() * cards.length)];
				this.setState({cards: this.state.cards});
			}, (i+1)*1000, i);
		}

		setTimeout(() => {
			this.setState({
				buttonEnabled: true,
				readingText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
				sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
				ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
				in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
				sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
			});
		}, this.props.card_count * 1500);
	}

	render() {
		return <div className="layout pure-g">
			<div className="bar pure-u-1 pure-u-lg-1-4">
				<div className="header">
					<h1>{this.props.title}</h1>
					<p>Will that <code>`terraform&nbsp;apply`</code> make or break prod?</p>
					<button className="pure-button pure-button-primary" onClick={() => this.read()} disabled={!this.state.buttonEnabled} >Find out.</button>
				</div>
			</div>
			<div className="content pure-u-1 pure-u-lg-3-4">
				<div className="pure-g">
					{this.state.cards.map(function(card,i) {
						return <div key={i} className="pure-u-1 pure-u-md-1-3">
							<Card name={card.name} url={card.url} />
						</div>
					})}
					<div className="pure-u-1">
						{this.state.readingText !== "" && <Reading text={this.state.readingText}/>}
					</div>
				</div>
			</div>
		</div>;
	}
}

export default App; 
