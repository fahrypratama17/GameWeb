import { useState, useEffect } from 'react'
import NavbarComponent from '../Navbar/NavbarComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css'

function SidebarFetch () {
    const [genres, setGenres] = useState([]);
    const [gamesData, setGamesData] = useState([]);
    const [displayedGames, setDisplayedGames] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');

    // fetch Sidebarnya
    useEffect(() => {
        fetch('https://simplegameapi.vercel.app/sidebar', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Genre data:", data);
                setGenres(data); // Simpan data genre ke state genres
            })
            .catch((error) => {
                console.error('Error fetching genres:', error);
            });
    }, []);

    // fetch Video Gamesnya
    useEffect(() => {
        fetch('https://simplegameapi.vercel.app/games',
          {
            method: "GET", 
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            }
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setGamesData(data);
            setDisplayedGames(data.slice(0, 8));
          })
          .catch((error) => {
              console.error('Error fetching data:', error);
          });
    }, []);
    
    // Fungsi search game   
    const handleSearch = (query) => {
        if (query) {
            const filteredGames = gamesData.filter((game) =>
                game.NamaGame.toLowerCase().includes(query.toLowerCase())
            );
            setDisplayedGames(filteredGames);
        } else {
            setDisplayedGames(gamesData.slice(0, 8)); // Reset ke 8 game pertama jika query kosong
        }
    };

    // Fungsi untuk mengklik genre di sidebar
    const handleGenreClick = (genre) => {
        setSelectedGenre(genre);
        console.log(genre);
        console.log(displayedGames);
        if (genre) {
            setDisplayedGames(gamesData.filter((game) => game.genre === genre));
        } else {
            setDisplayedGames((gamesData) => gamesData);
        }
    };

    // Fungsi untuk mengatur ulang tampilan ke keadaan awal
    const resetView = () => {
        setSelectedGenre('');
        setDisplayedGames(gamesData.slice(0, 8)); // Menampilkan 8 game pertama lagi
    };          


        return (
            <>
            <div className="container-fluid px-0">
              <NavbarComponent resetView={resetView} onSearch={handleSearch} />
            </div>

              <div className="container-flex px-20">
              <div className="row">
                  <div className="col-3">
                      <div className="card">
                          <div className="card-body">
                              <h5>Browse By Genre</h5>
                              {genres.map((genre) => (
                                  <button
                                      key={genre.Id}
                                      onClick={() => handleGenreClick(genre.genreGame)}
                                      className="btn btn-link genrenya"
                                  >
                                      {genre.genreGame}
                                  </button>
                              ))}
                          </div>
                      </div>
                  </div>

                  <div className="col-9">
                      {!selectedGenre && (
                          <div className="header-content">
                              <h1>Selamat Datang di GameWeb</h1>
                              <p className='Penjelasan'>
                              GameWeb adalah sebuah website yang menyajikan penjelasan mendetail tentang berbagai video game, dirancang untuk memberikan wawasan menyeluruh kepada para penggemar dan pemain game dari semua kalangan. Di GameWeb, kalian dapat menemukan ulasan lengkap yang membahas mekanisme gameplay, latar belakang cerita, grafis, hingga fitur-fitur unik yang dimiliki setiap game. Selain itu, website ini juga menyediakan informasi terkini tentang perkembangan dalam dunia video game, tips dan trik untuk bermain, serta rekomendasi game yang patut dicoba. Dengan konten yang menarik dan informatif, GameWeb bertujuan menjadi sumber utama bagi siapa saja yang ingin lebih memahami dan menikmati dunia video game.
                              </p>
                              <hr />
                          </div>
                      )}

                      <div className="row">
                          {displayedGames.map((item) => (
                              <div key={item.id} className="col-3 mb-4">
                                  <div className="card card-game">
                                      {item.gambar && (
                                          <img
                                              src={item.gambar}
                                              className="card-img-top"
                                              alt={item.namaGame}
                                          />
                                      )}
                                      <div className="card-body">
                                          <h6 className="card-title">{item.NamaGame}</h6>
                                          {item.deskripsi && (
                                              <p className="card-text">{item.deskripsi}</p>
                                          )}
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
          </>
        );
      };
      
export default SidebarFetch;