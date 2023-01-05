import { logOut } from '../../utilities/users-service'

export default function MainPage (props) {
  return (
    <>
      <h1>Succesfully logged in to the main page</h1>
      <button onClick={() => { logOut() }}>Log out</button>
    </>
  )
}
