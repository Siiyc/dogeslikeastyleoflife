import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { About, BreedsPage, DogPage, ErrorPage } from "routes";

import Home from "pages/Home";
import Header from "pages/page-template/Header";
import { useAppDispatch } from "hooks/redux";
import { fetchBreeds } from "./store/action-creators";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBreeds());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="dogbreeds" element={<BreedsPage />} />
        <Route path="dogbreeds/:name" element={<DogPage />} />
        <Route
          path="*"
          element={
            <ErrorPage
              path="/"
              title="404"
              message="errorPageApp"
              button="goHome"
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
