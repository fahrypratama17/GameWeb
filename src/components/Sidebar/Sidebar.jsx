import { useState, useEffect } from "react";
import NavbarComponent from "../Navbar/NavbarComponent";
import Footer from "../Footer/Footer";
import { genreSidebar, priceSidebar, genreDescriptions, isiCardGame } from "../../assets/data";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";

function Sidebar() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [activeGenre, setActiveGenre] = useState("");
  const [activePrice, setActivePrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedGames, setDisplayedGames] = useState(isiCardGame.slice(0, 8));
  const [genreDescription, setGenresDescription] = useState("");

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    setActiveGenre(genre);
    setActivePrice("");
    setGenresDescription(genreDescriptions[genre]);
    if (genre) {
      setDisplayedGames(isiCardGame.filter((game) => game.genre === genre));
    } else {
      setDisplayedGames(isiCardGame.slice(0, 8));
    }
  };

  const parsePrice = (priceString) => {
    const numericString = priceString.replace("US$", "").replace(",", ".");
    return parseFloat(numericString);
  };
  
  const handlePriceClick = (harga) => {
    setSelectedPrice(harga);
    setActivePrice(harga);
    setActiveGenre("");
    setGenresDescription(""); 
  
    if (harga) {
      const filteredGames = isiCardGame.filter((game) => {
        if (harga === "Free to Play") {
          return game.harga === "Free to Play";
        }

        const gamePrice = parsePrice(game.harga);
        if (harga === "Price Under $5") {
          return gamePrice > 0 && gamePrice < 5;
        } else if (harga === "Price $5 - $10") {
          return gamePrice >= 5 && gamePrice <= 10;
        } else if (harga === "Price $10 - $15") {
          return gamePrice > 10 && gamePrice <= 15;
        } else if (harga === "Price Over $15") {
          return gamePrice > 15;
        }
        return false;
      });
  
      setDisplayedGames(filteredGames);
    } else {
      setDisplayedGames(isiCardGame.slice(0, 8));
    }
  };

  const resetView = () => {
    setSelectedGenre("");
    setSelectedPrice("");
    setActiveGenre("");
    setActivePrice("");
    setSearchQuery("");
    setGenresDescription("");
    setDisplayedGames(isiCardGame.slice(0, 8));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filteredGames = isiCardGame.filter((game) =>
        game.namaGame.toLowerCase().includes(query.toLowerCase())
      );
      setDisplayedGames(filteredGames);
    } else {
      setDisplayedGames(isiCardGame.slice(0, 8));
    }
  };

  const highlightText = (text, query) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index}>{part}</mark>
      ) : (
        part
      )
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".genrenya") && !event.target.closest(".pricenya")){
        setActiveGenre("");
        setActivePrice("");
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="container-fluid px-0">
        <NavbarComponent resetView={resetView} onSearch={handleSearch} />
      </div>

      <div className="d-flex px-10">
        <div className="row">
          <div className="col-3">
            <div className="card browse-card">
              <div className="card-body browse-by">
                <h5>Browse By Genre</h5>
                <hr />
                {genreSidebar.map((bagian, urutan) => (
                  <button
                    key={urutan}
                    onClick={() => handleGenreClick(bagian.genreGame)}
                    className={`btn btn-link genrenya ${
                      activeGenre === bagian.genreGame ? "active" : ""
                    }`}
                  >
                    {bagian.genreGame}
                  </button>
                ))}
              </div>
              <div className="card-body">
                <h5>Browse By Price</h5>
                <hr />
                {priceSidebar.map((bagian, urutan) => (
                  <button
                    key={urutan}
                    onClick={() => handlePriceClick(bagian.priceGame)}
                    className={`btn btn-link pricenya ${
                      activePrice === bagian.priceGame ? "active" : ""
                    }`}
                  >
                    {bagian.priceGame}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="col-9">
            {(
              <div className="header-content">
                <h1>Welcome to GameWeb!</h1>
                <p className="explanation">
                  GameWeb is a website that provides detailed explanations of
                  various video games, designed to offer comprehensive insights
                  for gamers and enthusiasts of all backgrounds. At GameWeb, you
                  can find in-depth reviews covering gameplay mechanics,
                  storylines, graphics, and unique features of each game.
                  Additionally, the website offers up-to-date information about
                  developments in the gaming world, tips and tricks for playing,
                  as well as recommendations for games worth trying. With
                  engaging and informative content, GameWeb aims to be a primary
                  resource for anyone who wants to better understand and enjoy
                  the world of video games.
                </p>
                <hr />
                {genreDescription && (
                  <div className="genre-description">
                    <h3 className="header-content">About {selectedGenre}</h3>
                    <p className="explanation">{genreDescription}</p>
                    <hr />
                  </div>
                )}
              </div>
            )}

            <div className="row">
              {displayedGames.map((item, index) => (
                <div key={index} className="col-3 mb-4">
                  <div className="card card-game-img">
                    {item.gambar && (
                      <img
                        src={item.gambar}
                        className="card-img-top"
                        alt={item.namaGame}
                      />
                    )}
                    <div className="card-body card-game-text">
                      <h6 className="card-title">{highlightText(item.namaGame, searchQuery)}</h6>
                      {item.deskripsi && (<p className="card-text-desc">{item.deskripsi}</p>)}
                    </div>
                    <div className="card-body card-game-price">
                      {item.harga && (<p className="card-text-price">{item.harga}</p>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div> 
        <Footer/>
      </div>

    </>
  );
}

export default Sidebar;
