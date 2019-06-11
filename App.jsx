import React, { Component } from 'react';

const problemContainer = require('./model/problemContainer');
import CleanerAgent from './model/CleanerAgent';

problemContainer.addAgent("Smith", CleanerAgent, { x: 0, y: 2 });


class App extends Component {
    constructor(props) {
        super(props);
        let map = [
            [0, 0, 0, 0],
            [0, 1, 1, -1],
            [0, 1, 0, 0],
            [0, 0, 0, 1]];
        this.state = { squares: map };
        let that = this;

        problemContainer.solve(map, {
            onFinish: (result) => {
                let agentID = result.actions[result.actions.length - 1].agentID;
                let squares = JSON.parse(JSON.stringify(result.data.world));
                let agentState = result.data.states[agentID];
                squares[agentState.y][agentState.x] = "X"
                that.state = { squares };
            },
            onTurn: (result) => {
                let agentID = result.actions[result.actions.length - 1].agentID;
                let squares = JSON.parse(JSON.stringify(result.data.world));
                let agentState = result.data.states[agentID];
                squares[agentState.y][agentState.x] = "X"
                that.state = { squares };
            }
        });
    }
    render() {
        return (<div className="game">
            <div className="game-board">
                <Board value={this.state.squares} />
            </div>
            <div className="game-info">
                <div>{}</div>
                <ol>{/* TODO */}</ol>
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
        const status = 'State of the world';
        return (
            <div>
                <div className="status">{status}</div>
                {this.props.value.map(element => {
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
