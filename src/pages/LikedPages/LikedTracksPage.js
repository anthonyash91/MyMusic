import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function LikedTracksPage({
  albumLibrary,
  setCurrentPage,
  getAlbumLibrary,
  shortenNum,
  clearData,
  remove,
}) {
  useEffect(() => {
    // getAlbumLibrary()
    setCurrentPage("Liked Tracks");
  }, []);

  return (
    <div id="liked-tracklist">
      {albumLibrary.length ? (
        <div id="album-tracklist">
          {albumLibrary
            .filter((type) => type.musicType === "track")
            .map((album, i) => {
              const {
                albumTitle,
                trackTitle,
                albumId,
                trackId,
                albumArtists,
                albumArt,
                previewUrl,
                trackPlayCount,
                trackDuration,
                _id,
              } = album;
              return (
                <div className="track" key={i}>
                  <div className="track-info">
                    <div
                      className="song-cover"
                      style={{ backgroundImage: "url(" + albumArt + ")" }}
                    ></div>
                    <div className="track-title">
                      <b>{trackTitle}</b>

                      {albumArtists.length ? (
                        <div>
                          {albumArtists.map((artist, i) => {
                            const { artistName, artistId } = artist;
                            return (
                              <span key={i}>
                                <Link
                                  className="name"
                                  to={`/artist/${artistId}`}
                                  onClick={() => {
                                    clearData();
                                  }}
                                >
                                  {artistName}
                                </Link>
                                <span className="comma">, </span>
                              </span>
                            );
                          })}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  {/* <Link to={`/album/${albumId}`} onClick={() => {clearData()}}>{albumTitle}</Link> */}

                  <div className="track-info">
                    {shortenNum(trackPlayCount)} plays
                  </div>
                  <div className="track-info like-track">
                    <button
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
                        <path d="M11.75 1c-1.624 0-3.034 0.911-3.75 2.249-0.716-1.338-2.126-2.249-3.75-2.249-2.347 0-4.25 1.903-4.25 4.25 0 5.75 8 9.75 8 9.75s8-4 8-9.75c0-2.347-1.903-4.25-4.25-4.25z"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="track-info">{trackDuration}</div>

                  <div className="track-info">
                    <div className="audio-player">
                      <audio controls>
                        <source src={previewUrl} type="audio/mpeg" />
                      </audio>
                    </div>
                  </div>

                  {/* <button onClick={() => { update(_id, { playlist: "Party Mix" })}}>Party Mix</button>
                    <button onClick={() => { update(_id, { playlist: "Anti-Depressant" })}}>Anti-Depressant</button>
                    <button onClick={() => { update(_id, { playlist: "Lullabies" })}}>Lullabies</button> */}
                </div>
              );
            })
            .reverse()}
        </div>
      ) : (
        `You haven't added any albums yet...`
      )}
    </div>
  );
}
