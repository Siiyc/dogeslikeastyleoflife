interface InfoCatalog {
  status: string,
  message: string[]
}

export const getCatalog = (): Promise<InfoCatalog> =>
  fetch("https://dog.ceo/api/breeds/list")
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error.message);