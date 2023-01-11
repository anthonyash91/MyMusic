export default function Header({ currentPage }) {
  return (
    <div id="header">
      <div id="current-page">{currentPage}</div>

      <div id="user-info">
        Anthony
        <div
          id="user-avatar"
          style={{
            backgroundImage:
              "url(https://mir-s3-cdn-cf.behance.net/project_modules/disp/04492c10774061.560eac09c8845.png)",
          }}
        ></div>
      </div>
    </div>
  );
}
