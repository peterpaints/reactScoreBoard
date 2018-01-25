const PLAYERS = [
  {
    name: 'Peter Musonye',
    score: 31,
    id: 1,
  },
  {
    name: 'Farhan Abdi',
    score: 35,
    id: 2,
  },
  {
    name: 'Edmond Atto',
    score: 42,
    id: 3,
  },
];

let nextId = 4;

const Header = React.createClass({

  propTypes: {
    title: React.PropTypes.string.isRequired,
    players: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      score: React.PropTypes.number.isRequired,
      id: React.PropTypes.number.isRequired,
    })).isRequired,
  },

  render: function () {
    return (
      <div className="header">
        <Stats players={this.props.players}/>
        <h1>{ this.props.title }</h1>
        <Stopwatch />
      </div>
    );
  },
});

const Player = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,
    onScoreChange: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired,
  },

  render: function () {
    return (
      <div className="player">
        <div className="player-name">
          <a className="remove-player" onClick={this.props.onRemove}>x</a>
          {this.props.name}
        </div>
        <div className="player-score">
          <Counter score={this.props.score} onChange={this.props.onScoreChange}/>
        </div>
      </div>
    );
  },
});

const Counter = React.createClass({

  propTypes: {
    score: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
  },
  
  render: function () {
    return (
      <div className="counter">
        <button className="counter-action decrement" onClick={function(){this.props.onChange(-1);}.bind(this)}> - </button>
          <div className="counter-score"> {this.props.score} </div>
        <button className="counter-action increment" onClick={function(){this.props.onChange(1);}.bind(this)}> + </button>
      </div>
    ); 
  },
});

const Stats = React.createClass({

  propTypes: {
    players: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      score: React.PropTypes.number.isRequired,
      id: React.PropTypes.number.isRequired,
    })).isRequired,
  },

  render: function () {
    let totalPlayers = this.props.players.length;
    let totalScore = this.props.players.reduce(function(total, player){
      return total + player.score;
    }, 0);
    return (
      <table className="stats">
        <tbody>
          <tr>
            <td>Players:</td>
            <td>{totalPlayers}</td>
          </tr>
          <tr>
            <td>Total Score:</td>
            <td>{totalScore}</td>
          </tr>
        </tbody>
      </table>
    );
  },
});

const AddPlayerForm = React.createClass({
  propTypes: {
    onAdd: React.PropTypes.func.isRequired,
  },

  onSubmit: function(e) {
    e.preventDefault();
    this.props.onAdd(this.state.name);
    this.setState({name: ""});
  },

  onNameChange: function(e) {
    // console.log('onNameChange', e.target.value);
    this.setState({
      name: e.target.value,
    });
  },

  getInitialState: function () {
    return {
      name: "",
    }
  },
   
  render: function() {
    return (
      <div className="add-player-form">
      <form onSubmit={this.onSubmit}>
        <input type="text" value={this.state.name} onChange={this.onNameChange}/>
        <input type="submit" value="Add Player"/>
      </form>
      </div>
    );
  },
});

const Stopwatch = React.createClass({
  getInitialState: function() {
    return {
      running: false,
      elapsedTime: 0,
      previousTime: 0,
    };
  },

  componentDidMount: function() {
    this.interval = setInterval(this.onTick, 100);
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  onTick: function() {
    console.log('onTick');
    if (this.state.running) {
      let now = Date.now();
      this.setState({
        previousTime: now,
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
      });
    }
  },

  onStart: function() {
    this.setState({
      running: true,
      previousTime: Date.now(),
    });
  },
  onStop: function() {
    this.setState({running: false});
  },
  onReset: function() {
    this.setState({
      elapsedTime: 0,
      previousTime: Date.now(),
    });
  },

  render: function() {
    let seconds = Math.floor(this.state.elapsedTime / 1000);
    return (
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <div className="stopwatch-time">{seconds}</div>
        {
          this.state.running ? 
          <button onClick={this.onStop}>Stop</button> 
          : 
          <button onClick={this.onStart}>Start</button>
        }
        <button onClick={this.onReset}>Reset</button>
      </div>
    );
  },
});

const Application = React.createClass({

  propTypes: {
    title: React.PropTypes.string,
    initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      score: React.PropTypes.number.isRequired,
      id: React.PropTypes.number.isRequired,
    })).isRequired,
  },

  getDefaultProps: function () {
    return {
      title: 'Peter\'s Board',
    };
  },

  getInitialState: function () {
    return {
      players: this.props.initialPlayers, 
    };
  },

  onScoreChange: function (index, delta) {
    // console.log('onScoreChange', index, delta);
    this.state.players[index].score += delta;
    this.setState(this.state);
  },

  onPlayerAdd: function(name) {
    // console.log('Player added:', name);
    this.state.players.push({
      name: name,
      score: 0,
      id: nextId,
    });
    this.setState(this.state); 
    nextId += 1;
  },

  onRemovePlayer: function(index) {
    // console.log('remove', index);
    this.state.players.splice(index, 1);
    this.setState(this.state);
  },

  render: function () {
    return (
      <div className="scoreboard">
        <Header title={this.props.title} players={this.state.players}/>
        <div className="players">
          {this.state.players.map(function(player, index) {
            return (
              <Player
                onScoreChange={function(delta) {this.onScoreChange(index, delta)}.bind(this)}
                onRemove={function() {this.onRemovePlayer(index)}.bind(this)} 
                name={player.name} 
                score={player.score} 
                key={player.id}/>
            )
          }.bind(this))}
        </div>
        <AddPlayerForm onAdd={this.onPlayerAdd}/>
      </div>
    );
  },
});

ReactDOM.render(<Application initialPlayers={PLAYERS}/>, document.getElementById('container'));