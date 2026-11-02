import { createContext, useContext } from "react";

const UserContext = createContext();

function App() {
  return (
    <UserContext.Provider value="Usman">
      <Profile />
    </UserContext.Provider>
  );
}

function Profile() {
  const name = useContext(UserContext);

  return <h1>Hello {name}</h1>;
}

export default App;