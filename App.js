import React, { Component } from 'react';
//import {Shuffle, range, every,} from 'lodash'

const problemContainer = require('./model/problemContainer');
//import CleanerAgent from './model/CleanerAgent';

//console.log(problemContainer)
        
//var myProblem = new CleanerProblem({ maxIterations: 12 });
/*myProblem.addAgent("Smith", CleanerAgent, { x: 0, y: 2 });

myProblem.solve([
    [0, 0, 0, 0],
    [0, 1, 1, -1],
    [0, 1, 0, 0],
    [0, 0, 0, 1]], {
        onFinish: (result) => {
            let agentID = result.actions[result.actions.length - 1].agentID;
            console.log("Winner " + agentID);
            console.log(result.actions);
            let world = JSON.parse(JSON.stringify(result.data.world));
            let agentState = result.data.states[agentID];
            world[agentState.y][agentState.x] = "X"
            console.log(world);
        },
        onTurn0: (result) => { console.log("Turn: " + result) }
    });*/

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className="game">
            <div className="game-board">
                <Board />
            </div>
            <div className="game-info">
                <div>{/* TODO */}</div>
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
        const status = 'Next player: X';
    
        return (
          <div>
            <div className="status">{status}</div>
            <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
          </div>
        );
      }
}

class Square extends Component {
    render() {
        return <button className="square">
            {this.props.value}
        </button>
    }
}