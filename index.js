import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
	let cellColor;
	if(props.value === "X"){
		cellColor = "greenButton";
	}
	else if(props.value === "O"){
		cellColor = "pinkButton";
	}
	const className = cellColor + " square";
	return(
		<button 
		  className= {className}
		  onClick={props.onClick}
		>
		  {props.value}
		</button>
	);
}

class Board extends React.Component {
	renderSquare(i) {
		return (
			<Square 
			value={this.props.squares[i]}
			onClick={() => this.props.onClick(i)}
			key={this.props.squareKey}
			/>
		);
	}
	render() {
		let table = [];
		let n = 0;
		for(let y = 0; y < 3; y++){
			let rows = [];
			for(let i = 0; i < 3; i++){
				rows.push(this.renderSquare(n));
				n++;
			}
			table.push(rows);
		}
		
		return (
			<div>
				{table.map(row => <div className= {"board-row"}> {row} </div>)}
			</div>
		);
		}
  }
  
  class Game extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			xisNext: true,
			squareKey: false,
		};
	}
	handleClick(i){
		const history = this.state.history;
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if(calculateWinner(squares) || squares[i]){
			return;
		}
		
		squares[i] = this.state.xisNext ? "X" : "O";
		this.setState({
			history: history.concat([{
				squares: squares,
			}]),
			xisNext: !this.state.xisNext,
			squareKey: i,
		});
	}
	render() {
		const history = this.state.history;
		const current = history[history.length - 1];
		const winner = calculateWinner(current.squares);
		let status;
		if(winner){
			status = "The winner is " + winner + "!";
		}
		else {
			status = 'Next player: ' + (this.state.xisNext ? "X" : "O");
		}
		return (
			<div className="game">
			<div className="game-board">
				<Board 
					squares = {current.squares} // array of cells
					onClick = {(i) => this.handleClick(i)} //click on cell
					key={this.state.squareKey}
				/>
			</div>
			<div className="game-info">
				<div>{status}</div>
				<ol>{/* TODO */}</ol>
			</div>
			</div>
		);
	}
  }
  function calculateWinner(squares) {
	const lines = [
	  [0, 1, 2],
	  [3, 4, 5],
	  [6, 7, 8],
	  [0, 3, 6],
	  [1, 4, 7],
	  [2, 5, 8],
	  [0, 4, 8],
	  [2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
	  const [a, b, c] = lines[i];
	  if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
		return squares[a];
	  }
	}
	return null;
  }
  
  // ========================================
  
  ReactDOM.render(
	<Game />,
	document.getElementById('root')
  );