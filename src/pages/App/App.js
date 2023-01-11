import { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import { getUser } from "../../utilities/users-service";

import AuthPage from "../AuthPage/AuthPage";
import Library from "../Library/Library";
import Search from "../Search/Search";
import AlbumPage from "../AlbumPage/AlbumPage";
import TrackPage from "../TrackPage/TrackPage";
import ArtistPage from "../ArtistPage/ArtistPage";
import PlaylistPage from "../PlaylistPage/PlaylistPage";
import LikedTracksPage from "../LikedPages/LikedTracksPage";
import LikedAlbumsPage from "../LikedPages/LikedAlbumsPage";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

function App() {
  const [user, setUser] = useState(getUser());
  const [newAlbum, setNewAlbum] = useState([]);

  const [albumInfo, setAlbumInfo] = useState([]);
  const [artistInfo, setArtistInfo] = useState([]);
  const [trackInfo, setTrackInfo] = useState([]);
  const [playlistInfo, setplaylistInfo] = useState([]);

  const [albumLibrary, setAlbumLibrary] = useState([]);

  const [currentPage, setCurrentPage] = useState("Library");

  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const spotifyOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${process.env.REACT_APP_SPOTIFY_API_KEY}`,
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  const scraperOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${process.env.REACT_APP_SPOTIFY_API_KEY}`,
      "X-RapidAPI-Host": "spotify-scraper.p.rapidapi.com",
    },
  };

  const [artistLib, setArtistLib] = useState([]);
  // const [artistArtLib, setArtistArtLib] = useState([])

  const getAlbumLibrary = async () => {
    if (user) {
      try {
        const response = await fetch("/api/albums");
        const data = await response.json();
        setAlbumLibrary(
          data.filter((usersPosts) => usersPosts.userId === user._id)
        );

        let artistDict = {};
        let filteredArr = [];

        let artists = data
          .filter(
            (usersPosts) =>
              usersPosts.userId === user._id && usersPosts.musicType === "album"
          )
          .map((item) => ({
            artistName: item.albumArtists[0].artistName,
            artistId: item.albumArtists[0].artistId,
            albumArt: item.albumArt,
          }));

        artists.map((artist) => {
          if (!artistDict.hasOwnProperty(artist.artistName)) {
            artistDict[artist.artistName] = artist;
          }
        });

        for (const [key, value] of Object.entries(artistDict)) {
          filteredArr.push(value);
        }

        setArtistLib([...filteredArr]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const trailingDigits = (num) => {
    return num.toString().padStart(2, "0");
  };

  const convertTime = (ms) => {
    let sec = Math.floor(ms / 1000),
      min = Math.floor(sec / 60);
    sec = sec % 60;
    min = min % 60;
    return `${trailingDigits(min)}:${trailingDigits(sec)}`;
  };

  const msConversion = (ms) => {
    let sec = Math.floor(ms / 1000);
    let hrs = Math.floor(sec / 3600);
    sec -= hrs * 3600;
    let min = Math.floor(sec / 60);
    sec -= min * 60;

    sec = "" + sec;
    sec = ("00" + sec).substring(sec.length);

    if (hrs > 0) {
      min = "" + min;
      min = ("00" + min).substring(min.length);
      return hrs + " hr " + min + " min";
    } else {
      return min + " min " + sec + " sec";
    }
  };

  const shortenNum = (num) => {
    num = num.toString().replace(/[^0-9.]/g, "");
    if (num < 1000) {
      return num;
    }
    let si = [
      { v: 1e3, s: "k" },
      { v: 1e6, s: "m" },
      { v: 1e9, s: "b" },
    ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
      if (num >= si[index].v) {
        break;
      }
    }
    return (
      (num / si[index].v).toFixed(1).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") +
      si[index].s
    );
  };

  const clearData = () => {
    window.scrollTo(0, 0);
    setAlbumInfo([]);
    setArtistInfo([]);
    setTrackInfo([]);
    setplaylistInfo([]);
  };

  const navigate = useNavigate();

  const create = async (e) => {
    e.preventDefault(e);

    try {
      await fetch("/api/albums", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newAlbum }),
      });

      getAlbumLibrary();
      // navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const update = async (id, updatedAlbum) => {
    try {
      await fetch(`/api/albums/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...updatedAlbum }),
      });

      getAlbumLibrary();
    } catch (error) {
      console.error(error);
    }
  };

  const remove = async (id) => {
    try {
      await fetch(`/api/albums/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      getAlbumLibrary();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAlbumLibrary();
  }, [user]);

  return (
    <>
      {user ? (
        <main id="container">
          <Sidebar
            setUser={setUser}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />

          <div id="content">
            <Header currentPage={currentPage} />

            <Routes>
              <Route
                path="/"
                element={
                  <Library
                    user={user}
                    setAlbumInfo={setAlbumInfo}
                    albumLibrary={albumLibrary}
                    setAlbumLibrary={setAlbumLibrary}
                    getAlbumLibrary={getAlbumLibrary}
                    setCurrentPage={setCurrentPage}
                    clearData={clearData}
                    update={update}
                    remove={remove}
                  />
                }
              />

              <Route path="/artist" element={<Navigate to="/" />} />
              <Route path="/album" element={<Navigate to="/" />} />
              <Route path="/track" element={<Navigate to="/" />} />
              <Route path="/playlist" element={<Navigate to="/" />} />
              <Route path="/likes" element={<Navigate to="/" />} />

              <Route
                path="/search"
                element={
                  <Search
                    user={user}
                    newAlbum={newAlbum}
                    setNewAlbum={setNewAlbum}
                    albumLibrary={albumLibrary}
                    setCurrentPage={setCurrentPage}
                    clearData={clearData}
                    create={create}
                    searchResults={searchResults}
                    setSearchResults={setSearchResults}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                  />
                }
              />

              <Route
                path="/album/:spotifyId"
                element={
                  <AlbumPage
                    user={user}
                    newAlbum={newAlbum}
                    setNewAlbum={setNewAlbum}
                    albumInfo={albumInfo}
                    setAlbumInfo={setAlbumInfo}
                    getAlbumLibrary={getAlbumLibrary}
                    albumLibrary={albumLibrary}
                    setCurrentPage={setCurrentPage}
                    spotifyOptions={spotifyOptions}
                    scraperOptions={scraperOptions}
                    convertTime={convertTime}
                    msConversion={msConversion}
                    shortenNum={shortenNum}
                    clearData={clearData}
                    create={create}
                    remove={remove}
                  />
                }
              />

              <Route
                path="/track/:spotifyId"
                element={
                  <TrackPage
                    user={user}
                    newAlbum={newAlbum}
                    setNewAlbum={setNewAlbum}
                    trackInfo={trackInfo}
                    setTrackInfo={setTrackInfo}
                    albumLibrary={albumLibrary}
                    setCurrentPage={setCurrentPage}
                    spotifyOptions={spotifyOptions}
                    scraperOptions={scraperOptions}
                    convertTime={convertTime}
                    clearData={clearData}
                    create={create}
                  />
                }
              />

              <Route
                path="/artist/:spotifyId"
                element={
                  <ArtistPage
                    setAlbumInfo={setAlbumInfo}
                    artistInfo={artistInfo}
                    setArtistInfo={setArtistInfo}
                    setCurrentPage={setCurrentPage}
                    spotifyOptions={spotifyOptions}
                    clearData={clearData}
                  />
                }
              />

              <Route
                path="/playlist/:spotifyId"
                element={
                  <PlaylistPage
                    playlistInfo={playlistInfo}
                    setplaylistInfo={setplaylistInfo}
                    setCurrentPage={setCurrentPage}
                    spotifyOptions={spotifyOptions}
                    convertTime={convertTime}
                    clearData={clearData}
                  />
                }
              />

              <Route
                path="/likes/liked-tracks"
                element={
                  <LikedTracksPage
                    albumLibrary={albumLibrary}
                    setCurrentPage={setCurrentPage}
                    getAlbumLibrary={getAlbumLibrary}
                    shortenNum={shortenNum}
                    clearData={clearData}
                    remove={remove}
                  />
                }
              />

              <Route
                path="/likes/liked-albums"
                element={
                  <LikedAlbumsPage
                    albumLibrary={albumLibrary}
                    setCurrentPage={setCurrentPage}
                    clearData={clearData}
                    update={update}
                  />
                }
              />
            </Routes>
          </div>
        </main>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </>
  );
}

export default App;
