import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function LikedAlbumsPage({
  albumLibrary,
  setCurrentPage,
  clearData,
  update,
}) {
  useEffect(() => {
    setCurrentPage("Favorite Albums");
  }, []);

  return (
    <div id="music-content" className="liked-albums">
      {albumLibrary.length
        ? albumLibrary
            .filter((fav) => fav.favorite === true)
            .map((album, i) => {
              const {
                albumTitle,
                trackTitle,
                albumId,
                trackId,
                albumArtists,
                albumArt,
                previewUrl,
                trackDuration,
                _id,
              } = album;
              return (
                <div className="album" key={i}>
                  <div
                    className="album-cover"
                    style={{ backgroundImage: "url(" + albumArt + ")" }}
                  >
                    <div className="album-buttons">
                      <div
                        className="favorite button active"
                        onClick={() => {
                          update(albumId, { favorite: "false" });
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
                      <div className="favorite button-caption">
                        Remove from Favorites
                      </div>
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
