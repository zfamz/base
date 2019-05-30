import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
class Square extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     value: null
  //   };
  // }
  render() {
    return (
      <button
        className="square"
        onClick={() => {
          this.props.onClick();
        }}
      >
        {this.props.value}
      </button>
    );
  }
}
*/

function Square(props) {
  return (
    <button
      className="square"
      onClick={() => {
        props.onClick();
      }}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }

  render() {
    return (
      <div>
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      squares: Array(9).fill(null),
      step: 1,
      winner: false,
      xIsNext: true
    };
  }
  handleClick(i) {
    // this.props.onClick('apple');
    // console.log('click : ', this.state.squares[i]);
    if (this.state.squares[i] || this.state.winner) {
      return;
    }
    let step = this.state.step;
    const squares = this.state.squares.slice();
    const history = this.state.history.slice(0, step);
    step++;
    history.push({ squares });
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    let isWin = calculateWinner(squares, i);
    if (isWin) {
      this.setState({ winner: isWin });
    }
    this.setState({ history, step, squares, xIsNext: !this.state.xIsNext });
  }
  move(index) {
    if (index === 'start') {
      this.setState({ step: 1, squares: Array(9).fill(null), history: [], winner: false });
      return;
    }
    this.setState({ step: index + 1, squares: this.state.history[index].squares, winner: false });
  }
  render() {
    let status = '';
    if (this.state.winner) {
      status = 'game over! winner is ' + this.state.winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    const moves = this.state.history.map((item, index) => {
      return (
        <li key={index} onClick={() => this.move(index)}>
          <button> go to move : #{index + 1}</button>
        </li>
      );
    });
    return (
      <div className="game">
        <div className="game-board">
          <div className="status">{status}</div>
          <Board squares={this.state.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>history</div>
          <ol>
            <li>
              <button onClick={() => this.move('start')}>start</button>
            </li>
            {moves}
          </ol>
        </div>
      </div>
    );
  }
}

// ========================================
class ShoppingList extends React.Component {
  render() {
    return (
      <div>
        <h1>Shopping List for {this.props.names}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Iculus</li>
        </ul>
      </div>
    );
  }
}
// ========================================

ReactDOM.render(<ShoppingList name="Mark" />, document.getElementById('root'));
ReactDOM.render(<Game />, document.getElementById('root'));

function calculateWinner(squares, index) {
  const xObj = {
    0: [0, 3, 6],
    1: [1, 4, 7],
    2: [2, 5, 8]
  };
  const yObj = {
    0: [0, 1, 2],
    1: [3, 4, 5],
    2: [6, 7, 8]
  };
  const xyObj = {
    0: [0, 4, 8],
    1: [2, 4, 6]
  };
  let x = index % 3;
  let y = (index / 3) | 0;
  if (
    squares[xObj[x][0]] &&
    squares[xObj[x][0]] === squares[xObj[x][1]] &&
    squares[xObj[x][0]] === squares[xObj[x][2]]
  ) {
    return squares[xObj[x][0]];
  }
  if (
    squares[yObj[y][0]] &&
    squares[yObj[y][0]] === squares[yObj[y][1]] &&
    squares[yObj[y][0]] === squares[yObj[y][2]]
  ) {
    return squares[yObj[y][0]];
  }
  let flag = index % 4;
  if (flag) {
    if (
      squares[xyObj[1][0]] &&
      squares[xyObj[1][0]] === squares[xyObj[1][1]] &&
      squares[xyObj[1][0]] === squares[xyObj[1][2]]
    ) {
      return squares[xyObj[1][0]];
    }
    if (index === 4) {
      let s = valite(squares, xyObj, 1);
      if (s) {
        return s;
      }
    }
  } else {
    if (
      squares[xyObj[0][0]] &&
      squares[xyObj[0][0]] === squares[xyObj[0][1]] &&
      squares[xyObj[0][0]] === squares[xyObj[0][2]]
    ) {
      return squares[xyObj[0][0]];
    }
  }

  return null;
}

function valite(squares, obj, key) {
  if (
    squares[obj[key][0]] &&
    squares[obj[key][0]] === squares[obj[key][1]] &&
    squares[obj[key][0]] === squares[obj[key][2]]
  ) {
    return squares[obj[key][0]];
  }
  return null;
}
