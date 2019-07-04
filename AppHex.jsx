import React, { Component } from 'react';

const problemContainer = require('./modelHex/problemContainer');
import HextAgent from './modelHex/HexAgent';

problemContainer.addAgent("1", HextAgent, {play: true});
problemContainer.addAgent("2", HextAgent, {play: false});

class App extends Component {
    constructor(props) {
        super(props);
        let map = [[0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0]];

        this.state = { board: map, status: "New game" };

        let that = this;

        this.iterator = problemContainer.interactiveSolve(map, {
            onFinish: (result) => {
                let board = JSON.parse(JSON.stringify(result.data.world));
                let actions = result.actions;
                that.setState({ board, status: "Winer: " + actions[actions.length - 1].agentID});            },
            onTurn: (result) => {
                let board = JSON.parse(JSON.stringify(result.data.world));
                let actions = result.actions;
                that.setState({ board, status: "Last move: " + actions[actions.length - 1].agentID});
            }
        });
    }

    nextMove() {
        this.iterator.next();
        //this.setState(this.state);
    }

    render() {
        return (<div className="game">
            <div className="game-board">
                <Board value={this.state} />
            </div>
            <div className="game-info">
                <div><button onClick={() => this.nextMove()}>Next</button></div>
            </div>
        </div>);
    }
}

export default App;

class Board extends Component {

    renderSquare(i) {
        return <Square value={i} />
    }

    render() {
        console.log(this.props)
        const status = this.props.value.status;
        return (
            <div>
                <div className="status">{status}</div>
                {this.props.value.board.map(element => {
                    return <div className="board-row">{
                        element.map(cell => { return this.renderSquare(cell) })}</div>
                })}
            </div>

        );
    }
}

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}