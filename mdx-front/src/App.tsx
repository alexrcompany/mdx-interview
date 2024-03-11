import { useEffect } from "react";
import { Tooltip, initTWE } from "tw-elements";
import UserProfilePage from './pages/UserProfilePage';
import UsersPage from './pages/UsersPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewUserPage from "./pages/NewUserPage";
import Menu from "./components/Menu";
import UserEditPage from "./pages/UserEditPage";

function App() {

  useEffect(() => {
    initTWE({ Tooltip });
  }, []);

  return (
    <>
    <Menu />
    <Router>
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path='/user/:id' element={<UserProfilePage />} />
          <Route path='/edit/:id' element={<UserEditPage />} />
          <Route path="/create" element={<NewUserPage />} />
        </Routes>
        </Router>
    </>
  );
}

export default App;


/*

      <RouterProvider router={router}/>

 <p className="text-lg">
        Hover the HELP link for instructions:
        <a
          href="#"
          className="text-primary ps-1 transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
          data-twe-toggle="tooltip"
          title="Hi! I'm tooltip"
        >
          HELP
        </a>
      </p>

      */
/*

      <!-- div className="container mt-3">
        
      </div -->
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<UsersList/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
*/
