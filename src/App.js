import React from 'react';

import './pure-min.css';
import './style.css';

const Card = (props) => <div className="card">{props.name}</div>;
const Reading = (props) => <div className="reading">{props.text}</div>;

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
				this.state.cards[i] = {name: `card ${i+1}`};
				this.setState({cards: this.state.cards});
			}, (i+1)*1000, i);
		}

		setTimeout(() => {
			this.setState({
				buttonEnabled: true,
				readingText: "This is your reading. Yes. It will break prod."
			});
			console.log(this.state.cards);
		}, this.props.card_count * 1500);
	}

	render() {
		return <div className="pure-g">
			<div className="pure-u-1-4 sidebar">
				<div className="head">
					<h1>{this.props.title}</h1>
					<p className="welcome">Will that <code>`terraform apply`</code> make or break prod?</p>
					<p>
						<button
							className="pure-button pure-button-primary"
							onClick={() => this.read()}
							disabled={!this.state.buttonEnabled}
						>Find out.</button>
					</p>
				</div>
			</div>
			<div className="pure-u-3-4 content">
				<div className="pure-g">
					{this.state.cards.map(function(card,i) {
						return <div className="pure-u-1-3"><Card key={i} name={card.name} /></div>
					})}
					<div className="pure-u-1">
						<Reading text={this.state.readingText}/>
					</div>
				</div>
			</div>
		</div>;
	}
}

export default App; 
