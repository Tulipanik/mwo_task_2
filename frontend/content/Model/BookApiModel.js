import { TokenService } from "./LoginApiModel.js";

export const URL = "http://localhost:8080/";

export async function getAPIRequest(endpoint, token, metadata = {}) {
  if (token !== "" && !metadata.method) {
    metadata = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
  }
  return fetch(endpoint, metadata).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return new Error(res.status);
    }
  });
}

export async function getAllBooks(page, perPage) {
  const token = await TokenService.getToken();
  const endpoint = `${URL}getAllBooks?perpage=${perPage}&page=${page}`;

  try {
    const response = await getAPIRequest(endpoint, token);
    return response;
  } catch (err) {
    return;
  }
}

export async function getAllGenre(genre) {
  const token = await TokenService.getToken();
  const endpoint = `${URL}getBookByGenre/${genre}`;

  try {
    const response = await getAPIRequest(endpoint, token);
    return response;
  } catch (err) {
    return;
  }
}

export async function getAllAuthor(author) {
  const token = await TokenService.getToken();
  const endpoint = `${URL}getBookByAuthor/${author}`;

  try {
    const response = await getAPIRequest(endpoint, token);
    return response;
  } catch (err) {
    return;
  }
}

export async function getById(id) {
  const token = await TokenService.getToken();
  const endpoint = `${URL}getBookById/${id}`;

  try {
    const response = await getAPIRequest(endpoint, token);
    return response;
  } catch (err) {
    return;
  }
}

export async function getMaxId() {
  const token = await TokenService.getToken();
  const endpoint = `${URL}getMaxId`;

  try {
    const response = await getAPIRequest(endpoint, token);
    return response;
  } catch (err) {
    return;
  }
}

export async function add(book) {
  const token = await TokenService.getToken();
  const endpoint = `${URL}addBook`;

  try {
    const response = await getAPIRequest(endpoint, token, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(book),
    });
    return response;
  } catch (error) {
    return;
  }
}

export async function update(book) {
  const token = await TokenService.getToken();
  const endpoint = `${URL}updateBook/${book.id}`;

  try {
    const response = await getAPIRequest(endpoint, token, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(book),
    });
    return response;
  } catch (error) {
    return;
  }
}

export async function deleteAll() {
  const token = await TokenService.getToken();
  const endpoint = `${URL}deleteAllBooks`;
  console.log("siema");

  try {
    const response = await getAPIRequest(endpoint, token, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response;
  } catch (err) {
    return;
  }
}

export async function deleteId(id) {
  if (id == "") {
    id = 0;
  }
  const token = await TokenService.getToken();
  const endpoint = `${URL}deleteBookById/${id}`;

  try {
    const response = await getAPIRequest(endpoint, token, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response;
  } catch (err) {
    return;
  }
}

export async function deleteGenre(genre) {
  const token = await TokenService.getToken();
  const endpointDailyForecast = `${URL}/deleteAllBooksByGenre/${genre}`;

  try {
    const response = await getAPIRequest(endpointDailyForecast, token, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response;
  } catch (err) {
    return;
  }
}
