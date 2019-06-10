import React, { Component } from 'react';

import CleanerProblem from './model/CleanerProblem';
import CleanerAgent from './model/CleanerAgent';

class App extends Component {
    constructor(props) {
        super(props);
        let myProblem = new CleanerProblem({ maxIterations: 12 });
        myProblem.addAgent("Smith", CleanerAgent, { x: 0, y: 2 });

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
            });
    }
    render() {
        return (
            <div>
                <h1>Header</h1>
                <h2>Content</h2>
                <p data-myattribute="somevalue">This is the content!!! + {1 + Math.sin(1)}</p>
            </div>
        );
    }
}

export default App;