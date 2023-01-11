import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Library({
  albumLibrary,
  setCurrentPage,
  clearData,
  update,
  remove,
}) {
  useEffect(() => {
    setCurrentPage("Library");
  }, []);

  return (
    <div id="music-content">
      {albumLibrary.length
        ? albumLibrary
            .filter((type) => type.musicType === "album")
            .map((album, i) => {
              const {
                albumTitle,
                albumId,
                albumArtists,
                albumArt,
                favoriteAlbum,
                _id,
              } = album;
              return (
                <div className="album" key={i}>
                  <div
                    className="album-cover"
                    style={{ backgroundImage: "url(" + albumArt + ")" }}
                  >
                    <div className="album-buttons">
                      <Link to={`/album/${albumId}`} className="info button">
                        <svg
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM7 3.75c0-0.413 0.338-0.75 0.75-0.75h0.5c0.412 0 0.75 0.337 0.75 0.75v0.5c0 0.412-0.338 0.75-0.75 0.75h-0.5c-0.412 0-0.75-0.338-0.75-0.75v-0.5zM10 13h-4v-1h1v-4h-1v-1h3v5h1v1z"></path>
                        </svg>
                      </Link>

                      {favoriteAlbum === true ? (
                        <div
                          className="favorite button active"
                          onClick={() => {
                            update(_id, { favoriteAlbum: "false" });
                          }}
                        >
                          <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 6.204l-5.528-0.803-2.472-5.009-2.472 5.009-5.528 0.803 4 3.899-0.944 5.505 4.944-2.599 4.944 2.599-0.944-5.505 4-3.899z"></path>
                          </svg>
                        </div>
                      ) : (
                        <div
                          className="favorite button"
                          onClick={() => {
                            update(_id, { favoriteAlbum: "true" });
                          }}
                        >
                          <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 6.204l-5.528-0.803-2.472-5.009-2.472 5.009-5.528 0.803 4 3.899-0.944 5.505 4.944-2.599 4.944 2.599-0.944-5.505 4-3.899z"></path>
                          </svg>
                        </div>
                      )}

                      <div
                        className="remove button"
                        onClick={() => {
                          remove(_id);
                        }}
                      >
                        <svg
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM12 10.5l-1.5 1.5-2.5-2.5-2.5 2.5-1.5-1.5 2.5-2.5-2.5-2.5 1.5-1.5 2.5 2.5 2.5-2.5 1.5 1.5-2.5 2.5 2.5 2.5z"></path>
                        </svg>
                      </div>

                      <div className="info button-caption">
                        Go to Album Page
                      </div>
                      <div className="remove button-caption">
                        Remove from Library
                      </div>

                      {favoriteAlbum === true ? (
                        <div className="favorite button-caption">
                          Remove from Favorites
                        </div>
                      ) : (
                        <div className="favorite button-caption">
                          Add to Favorites
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="album-info">
                    <b>{albumTitle}</b>
                    <div className="artist">
                      {albumArtists.length ? (
                        <div className="album-artists">
                          {albumArtists.map((artist, i) => {
                            const { artistName } = artist;
                            return (
                              <div className="artists" key={i}>
                                {artistName}
                                <span>,</span>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              );
            })
            .reverse()
        : `You haven't added any albums yet...`}
    </div>
  );
}
