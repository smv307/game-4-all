import { useLocation } from "react-router-dom";
import gameData from "./gameData.json";

function GamePage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const title = params.get("title");

  const game = gameData.games.find(
    (g) => g.title.toLowerCase() === title?.toLowerCase()
  );

  if (!game) return <p>Game not found</p>; // error message

  return (
    <main id="game-page">
      <aside id="back-arrow" onClick={() => window.history.back()}>
        <img src="images/back-arrow.png" alt="Back" />
      </aside>
      <span
        className="nextdoor-parent centered"
        style={{ justifyContent: "center", height: "100px" }}
      >
        <p className="subheader-font extra-big-font blue-font flex-child">
          {game.title}
        </p>
      </span>
      <hr />
      <section className="centered" style={{ width: "620px", height: "620px" }}>
        <iframe
          id="game-frame"
          src={`/game.html?script=${encodeURIComponent(game.url)}`} // game.html in the frame
          title={game.title}
          width="20px"
          height="70%"
          allowFullScreen
        ></iframe>
      </section>
    </main>
  );
}

export default GamePage;
