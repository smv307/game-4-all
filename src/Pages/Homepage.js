import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import gameData from "./gameData.json";


function GameCard({ game }) {
  const navigate = useNavigate();

  // clicking on a thumbnail will open the game in a new page
  const goToGamePage = () => {
    navigate(`/play?title=${encodeURIComponent(game.title)}`);
  };

  // thumbnail for each game
  return (
    <div className="game-card" onClick={goToGamePage}>
      <img src={game.img} alt={game.title} className="game-thumbnail" />
    </div>
  );
}

function GameGrid({ playerCount }) {
  // filter games based on player count
  const filteredGames = gameData.games.filter(
    (game) => playerCount === 0 || game.players === playerCount
  );

  return (
    <div className="grid-container" id="game-grid">
      {filteredGames.map((game, index) => (
        <GameCard key={index} game={game} /> // grid of game cards
      ))}
    </div>
  );
}

// add difficulty filter later, maybe???
function Filters({ playerCount, setPlayerCount }) {
  return (
    <nav id="filters" className="subheader-font medium-font grey-font">
      <input
        id="player-filter"
        type="range"
        min="0"
        max="2"
        value={playerCount}
        onChange={(e) => setPlayerCount(Number(e.target.value))}
      />
      <label htmlFor="player-filter">
        <span id="player-filter-label">
          {playerCount > 0 ? playerCount : "#"} {/* display number sign if no filter */}
        </span>{" "}
        Players
      </label>
    </nav>
  );
}

function Homepage() {
  const [playerCount, setPlayerCount] = useState(0);

  return (
    <main>
      <Filters playerCount={playerCount} setPlayerCount={setPlayerCount} />
      <hr />
      <GameGrid playerCount={playerCount} />
      {/*}
      <p className="subheader-font medium-small-font green-font">
        game ideas? submit them <span className="blue-font" style={{ textDecoration: "underline" }}></span>
      </p>
      */}
    </main>
  );
}

export default Homepage;
