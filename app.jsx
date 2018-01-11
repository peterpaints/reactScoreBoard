var PLAYERS = [
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


const Application = React.createClass({
  render: function() {
    return (
      <div className="scoreboard">
        <div className="header">
          <h1>Scoreboard</h1>
        </div>
        <div className="players">
          <div className="player">
            <div className="player-name">
              Peter Musonye
            </div>
            <div className="player-score">
              <div className="counter">
                <button className="counter-action decrement"> - </button>
                <div className="counter-score"> 23 </div>
                <button className="counter-action increment"> + </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

ReactDOM.render(<Application />, document.getElementById('container'));