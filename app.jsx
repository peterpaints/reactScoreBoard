const PLAYERS = [
    {
      name: 'Peter Musonye',
      score: 31,
      id: 1,
    },
    {
      name: 'Akash Baga',
      score: 35,
      id: 2,
    },
    {
      name: '"Edmond Atto',
      score: 42,
      id: 3,
    },
  ];

const Header = React.createClass({

  propTypes: {
    title: React.PropTypes.string.isRequired,
  },

  render: function () {
    return (
      <div className="header">
        <h1>{ this.props.title }</h1>
      </div>
    );
  },
});

const Player = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,
  },

  render: function () {
    return (
      <div className="player">
        <div className="player-name">
          {this.props.name}
        </div>
        <div className="player-score">
          <Counter score={this.props.score}/>
        </div>
      </div>
    );
  },
});

const Counter = React.createClass({

  propTypes: {
    score: React.PropTypes.number.isRequired,
  },

  render: function () {
    return (
      <div className="counter">
        <button className="counter-action decrement"> - </button>
          <div className="counter-score"> {this.props.score} </div>
        <button className="counter-action increment"> + </button>
      </div>
    );
  },
});

const Application = React.createClass({

  propTypes: {
    title: React.PropTypes.string,
  },

  getDefaultProps: function () {
    return {
      title: 'Peter\'s Board',
    };
  },

  render: function () {
    return (
      <div className="scoreboard">
        <Header title={this.props.title}/>
        <div className="players">
          <Player name={"Peter Musonye"} score={23}/>
          <Player name={"Akash Baga"} score={25}/>
          <Player name={"Edmond Atto"} score={27}/>
        </div>
      </div>
    );
  },
});

ReactDOM.render(<Application />, document.getElementById('container'));