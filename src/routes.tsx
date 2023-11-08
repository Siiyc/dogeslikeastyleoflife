import React from "react";

export const About = React.lazy(() => import("pages/About"));
export const ErrorPage = React.lazy(() => import("pages/ErrorPage"));
export const BreedsPage = React.lazy(() => import("pages/DogBreeds"));
export const DogPage = React.lazy(() => import("pages/DogPage"));