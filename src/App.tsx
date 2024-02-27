import { useEffect, useState } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import Layout from "./components/layout";
import LoadingScreen from "./components/loading-screent";
import ProtectedRoute from "./components/protected-route";
import CreateAccount from "./routes/create-account";
import { auth } from "./routes/firebase";
import ForgotPassword from "./routes/forgotPw";
import Home from "./routes/home";
import Login from "./routes/login";
import Profile from "./routes/profile";

const router = createBrowserRouter([
  {
    path: "/",

    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "create-account",
    element: <CreateAccount />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
]);

const GlobaStyles = createGlobalStyle`
  ${reset};
  *{
    box-sizing: border-box
  }
  body{
    background-color: black;
    color:white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    
  }
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady;
    setIsLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <Wrapper>
      <GlobaStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

export default App;
