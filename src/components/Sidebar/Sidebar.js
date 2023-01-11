import { Routes, Route, Link } from "react-router-dom";
import { logOut } from "../../utilities/users-service";

export default function Sidebar({ setUser, currentPage }) {
  return (
    <div id="sidebar">
      <div id="top">
        <ul>
          <li>Menu</li>
          <li className={currentPage === "Search" ? "active" : ""}>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M16 13.5l-4.695-4.695c0.444-0.837 0.695-1.792 0.695-2.805 0-3.314-2.686-6-6-6s-6 2.686-6 6 2.686 6 6 6c1.013 0 1.968-0.252 2.805-0.695l4.695 4.695 2.5-2.5zM2 6c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4z"></path>
            </svg>
            <Link to="/search">Explore</Link>
          </li>
          <li className={currentPage === "Charts" ? "active" : ""}>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M11.5 0l1.72 1.72-4.22 4.22-3-3-5.5 5.5 1.061 1.061 4.439-4.439 3 3 5.28-5.28 1.72 1.72v-4.5z"></path>
              <path d="M13 6.561v9.439h2v-11.439z"></path>
              <path d="M10 9.561v6.439h2v-8.439z"></path>
              <path d="M7 16h2v-5.439l-2-2z"></path>
              <path d="M4 16h2v-8.439l-2 2z"></path>
              <path d="M1 12.561v3.439h2v-5.439z"></path>
            </svg>
            <Link to="/charts">Charts</Link>
          </li>
        </ul>

        <ul>
          <li>MyMusic</li>
          <li className={currentPage === "Library" ? "active" : ""}>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="16"
              viewBox="0 0 18 16"
            >
              <path d="M3.5 2h-3c-0.275 0-0.5 0.225-0.5 0.5v11c0 0.275 0.225 0.5 0.5 0.5h3c0.275 0 0.5-0.225 0.5-0.5v-11c0-0.275-0.225-0.5-0.5-0.5zM3 5h-2v-1h2v1z"></path>
              <path d="M8.5 2h-3c-0.275 0-0.5 0.225-0.5 0.5v11c0 0.275 0.225 0.5 0.5 0.5h3c0.275 0 0.5-0.225 0.5-0.5v-11c0-0.275-0.225-0.5-0.5-0.5zM8 5h-2v-1h2v1z"></path>
              <path d="M11.954 2.773l-2.679 1.35c-0.246 0.124-0.345 0.426-0.222 0.671l4.5 8.93c0.124 0.246 0.426 0.345 0.671 0.222l2.679-1.35c0.246-0.124 0.345-0.426 0.222-0.671l-4.5-8.93c-0.124-0.246-0.426-0.345-0.671-0.222z"></path>
            </svg>
            <Link to="/">Library</Link>
          </li>
          <li className={currentPage === "Liked Tracks" ? "active" : ""}>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M5 3l11-3v11.5c0 1.381-1.567 2.5-3.5 2.5s-3.5-1.119-3.5-2.5c0-1.381 1.567-2.5 3.5-2.5 0.537 0 1.045 0.086 1.5 0.241v-5.15l-7 1.909v7.5c0 1.381-1.567 2.5-3.5 2.5s-3.5-1.119-3.5-2.5c0-1.381 1.567-2.5 3.5-2.5 0.537 0 1.045 0.086 1.5 0.241v-8.241z"></path>
            </svg>
            <Link to="/likes/liked-tracks">Liked Tracks</Link>
          </li>
          <li className={currentPage === "Favorite Albums" ? "active" : ""}>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M8 6.508c-0.823 0-1.492 0.669-1.492 1.492s0.669 1.492 1.492 1.492 1.492-0.669 1.492-1.492-0.669-1.492-1.492-1.492z"></path>
              <path d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM10.609 8c0 1.439-1.171 2.609-2.609 2.609s-2.609-1.171-2.609-2.609 1.171-2.609 2.609-2.609 2.609 1.171 2.609 2.609zM2.064 11.71l3.3-2.063c0.25 0.399 0.589 0.738 0.988 0.988l-2.063 3.3c-0.9-0.564-1.662-1.326-2.226-2.226zM10.636 6.353c-0.251-0.399-0.589-0.738-0.988-0.988l2.063-3.3c0.9 0.564 1.662 1.326 2.226 2.226l-3.3 2.063z"></path>
            </svg>
            <Link to="/likes/liked-albums">Favorite Albums</Link>
          </li>
          {/* <li className={currentPage === 'Artists' ? 'active' : ''}>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M4 9c0 1.1 0.9 2 2 2h4c1.1 0 2-0.9 2-2v-3h-8v3z"></path><path d="M14.5 5h-2c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h0.5v3c0 1.654-1.346 3-3 3h-4c-1.654 0-3-1.346-3-3v-3h0.5c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5h-2c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h0.5v3c0 2.206 1.794 4 4 4h1v2h-1.5c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h5c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5h-1.5v-2h1c2.206 0 4-1.794 4-4v-3h0.5c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5z"></path><path d="M10 0h-4c-1.1 0-2 0.9-2 2v3h8v-3c0-1.1-0.9-2-2-2zM5.5 3.75c-0.138 0-0.25-0.112-0.25-0.25s0.112-0.25 0.25-0.25 0.25 0.112 0.25 0.25-0.112 0.25-0.25 0.25zM5.5 2.75c-0.138 0-0.25-0.112-0.25-0.25s0.112-0.25 0.25-0.25 0.25 0.112 0.25 0.25-0.112 0.25-0.25 0.25zM5.5 1.75c-0.138 0-0.25-0.112-0.25-0.25s0.112-0.25 0.25-0.25 0.25 0.112 0.25 0.25-0.112 0.25-0.25 0.25zM6.5 3.75c-0.138 0-0.25-0.112-0.25-0.25s0.112-0.25 0.25-0.25 0.25 0.112 0.25 0.25-0.112 0.25-0.25 0.25zM6.5 2.75c-0.138 0-0.25-0.112-0.25-0.25s0.112-0.25 0.25-0.25 0.25 0.112 0.25 0.25-0.112 0.25-0.25 0.25zM6.5 1.75c-0.138 0-0.25-0.112-0.25-0.25s0.112-0.25 0.25-0.25 0.25 0.112 0.25 0.25-0.112 0.25-0.25 0.25zM7.5 3.75c-0.138 0-0.25-0.112-0.25-0.25s0.112-0.25 0.25-0.25 0.25 0.112 0.25 0.25-0.112 0.25-0.25 0.25zM7.5 2.75c-0.138 0-0.25-0.112-0.25-0.25s0.112-0.25 0.25-0.25 0.25 0.112 0.25 0.25-0.112 0.25-0.25 0.25zM7.5 1.75c-0.138 0-0.25-0.112-0.25-0.25s0.112-0.25 0.25-0.25 0.25 0.112 0.25 0.25-0.112 0.25-0.25 0.25zM8.5 3.75c-0.138 0-0.25-0.112-0.25-0.25s0.112-0.25 0.25-0.25 0.25 0.112 0.25 0.25-0.112 0.25-0.25 0.25zM8.5 2.75c-0.138 0-0.25-0.112-0.25-0.25s0.112-0.25 0.25-0.25 0.25 0.112 0.25 0.25-0.112 0.25-0.25 0.25zM8.5 1.75c-0.138 0-0.25-0.112-0.25-0.25s0.112-0.25 0.25-0.25 0.25 0.112 0.25 0.25-0.112 0.25-0.25 0.25zM9.5 3.75c-0.138 0-0.25-0.112-0.25-0.25s0.112-0.25 0.25-0.25 0.25 0.112 0.25 0.25-0.112 0.25-0.25 0.25zM9.5 2.75c-0.138 0-0.25-0.112-0.25-0.25s0.112-0.25 0.25-0.25 0.25 0.112 0.25 0.25-0.112 0.25-0.25 0.25zM9.5 1.75c-0.138 0-0.25-0.112-0.25-0.25s0.112-0.25 0.25-0.25 0.25 0.112 0.25 0.25-0.112 0.25-0.25 0.25zM10.5 3.75c-0.138 0-0.25-0.112-0.25-0.25s0.112-0.25 0.25-0.25 0.25 0.112 0.25 0.25-0.112 0.25-0.25 0.25zM10.5 2.75c-0.138 0-0.25-0.112-0.25-0.25s0.112-0.25 0.25-0.25 0.25 0.112 0.25 0.25-0.112 0.25-0.25 0.25zM10.5 1.75c-0.138 0-0.25-0.112-0.25-0.25s0.112-0.25 0.25-0.25 0.25 0.112 0.25 0.25-0.112 0.25-0.25 0.25z"></path></svg>
              <Link to="/artists">Artists</Link>
            </li> */}
        </ul>

        <ul>
          <li>Playlists</li>
          <li>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M14.5 4h-13c-0.275 0-0.5 0.225-0.5 0.5v11c0 0.275 0.225 0.5 0.5 0.5h13c0.275 0 0.5-0.225 0.5-0.5v-11c0-0.275-0.225-0.5-0.5-0.5zM12 12.5c0 0.828-0.895 1.5-2 1.5s-2-0.672-2-1.5 0.895-1.5 2-1.5c0.364 0 0.706 0.073 1 0.201v-2.915l-4 1.429v3.786c0 0.828-0.895 1.5-2 1.5s-2-0.672-2-1.5 0.895-1.5 2-1.5c0.364 0 0.706 0.073 1 0.201v-4.201l6-2v6.5z"></path>
              <path d="M13.5 3h-11c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h11c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
              <path d="M12.5 1h-9c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h9c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
            </svg>
            Anti-Depressants
          </li>
          <li>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M14.5 4h-13c-0.275 0-0.5 0.225-0.5 0.5v11c0 0.275 0.225 0.5 0.5 0.5h13c0.275 0 0.5-0.225 0.5-0.5v-11c0-0.275-0.225-0.5-0.5-0.5zM12 12.5c0 0.828-0.895 1.5-2 1.5s-2-0.672-2-1.5 0.895-1.5 2-1.5c0.364 0 0.706 0.073 1 0.201v-2.915l-4 1.429v3.786c0 0.828-0.895 1.5-2 1.5s-2-0.672-2-1.5 0.895-1.5 2-1.5c0.364 0 0.706 0.073 1 0.201v-4.201l6-2v6.5z"></path>
              <path d="M13.5 3h-11c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h11c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
              <path d="M12.5 1h-9c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h9c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
            </svg>
            Lullabies
          </li>
          <li>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M14.5 4h-13c-0.275 0-0.5 0.225-0.5 0.5v11c0 0.275 0.225 0.5 0.5 0.5h13c0.275 0 0.5-0.225 0.5-0.5v-11c0-0.275-0.225-0.5-0.5-0.5zM12 12.5c0 0.828-0.895 1.5-2 1.5s-2-0.672-2-1.5 0.895-1.5 2-1.5c0.364 0 0.706 0.073 1 0.201v-2.915l-4 1.429v3.786c0 0.828-0.895 1.5-2 1.5s-2-0.672-2-1.5 0.895-1.5 2-1.5c0.364 0 0.706 0.073 1 0.201v-4.201l6-2v6.5z"></path>
              <path d="M13.5 3h-11c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h11c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
              <path d="M12.5 1h-9c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h9c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
            </svg>
            Party Mix
          </li>
        </ul>
      </div>

      <div id="bottom">
        <ul>
          <li>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M16 9.501v-3.003l-2.293-0.382c-0.093-0.283-0.207-0.557-0.339-0.82l1.351-1.891-2.123-2.123-1.888 1.349c-0.264-0.134-0.54-0.248-0.825-0.342l-0.381-2.288h-3.003l-0.381 2.288c-0.285 0.094-0.56 0.209-0.824 0.342l-1.888-1.349-2.123 2.123 1.351 1.891c-0.132 0.263-0.246 0.537-0.339 0.82l-2.293 0.382v3.003l2.299 0.383c0.093 0.281 0.206 0.552 0.338 0.813l-1.355 1.898 2.123 2.123 1.901-1.358c0.259 0.13 0.53 0.243 0.809 0.335l0.384 2.304h3.003l0.384-2.304c0.279-0.092 0.549-0.204 0.809-0.335l1.901 1.358 2.123-2.123-1.355-1.898c0.132-0.261 0.245-0.532 0.338-0.813l2.299-0.383zM8 10c-1.105 0-2-0.895-2-2s0.895-2 2-2c1.105 0 2 0.895 2 2s-0.895 2-2 2z"></path>
            </svg>
            Settings
          </li>
          <li
            onClick={() => {
              logOut();
              setUser("");
            }}
          >
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M11 13l4.5-4.5-4.5-4.5v3h-7v3h7v3z"></path>
              <path d="M1 1h11v2h-10v11h10v2h-11c-0.552 0-1-0.448-1-1v-13c0-0.552 0.448-1 1-1z"></path>
            </svg>
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
}
