export const getBreedImages = (breed: string) =>
  fetch(`https://dog.ceo/api/breed/${breed}/images/random/20`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);