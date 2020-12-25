const baseurl =
  process.env.NODE_ENV === "production"
    ? "https://listee.host.abdus.net/api/v1"
    : "http://localhost:4000/api/v1";
const SESSION_TOKEN = "session_token";

class HTTP {
  constructor() {}

  async login({ username, password }) {
    try {
      const resp = await fetchServer("/signin", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      window.sessionStorage.setItem(SESSION_TOKEN, resp.token);
      return resp;
    } catch (err) {
      throw Error(err.message || "something went wrong");
    }
  }

  async signUp({ username, password }) {
    try {
      const resp = await fetchServer("/signup", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      window.sessionStorage.setItem(SESSION_TOKEN, resp.token);
      return resp;
    } catch (err) {
      throw Error(err.message || "something went wrong");
    }
  }

  async isLoggedIn() {
    try {
      const resp = await fetchServer(`/isloggedin`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem(
            SESSION_TOKEN
          )}`,
        },
      });
      return resp;
    } catch (err) {
      throw Error(err.message || "something went wrong");
    }
  }

  async getQuizes() {
    try {
      const resp = await fetchServer("/quizes");
      return resp;
    } catch (err) {
      throw Error(err.message || "something went wrong");
    }
  }

  async getQuestionByQuizId(id) {
    try {
      const resp = await fetchServer(`/questions/${id}`, {
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem(
            SESSION_TOKEN
          )}`,
        },
      });
      return resp;
    } catch (err) {
      throw Error(err.message || "something went wrong");
    }
  }

  async submitQuiz(data) {
    try {
      const resp = await fetchServer(`/submit`, {
        method: "POST",
        body: JSON.stringify({ answers: data }),
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem(
            SESSION_TOKEN
          )}`,
          "content-type": "application/json",
          accept: "application/json",
        },
      });
      return resp;
    } catch (err) {
      throw Error(err.message || "something went wrong");
    }
  }

  async getUserProfile() {
    try {
      const user = await fetchServer(`/profile`, {
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem(
            SESSION_TOKEN
          )}`,
          "content-type": "application/json",
          accept: "application/json",
        },
      });
      return user;
    } catch (err) {
      throw Error(err.message || "something went wrong");
    }
  }
}

async function fetchServer(path, fetchOpts) {
  try {
    const raw = await fetch(`${baseurl}${path}`, {
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      ...fetchOpts,
    });

    const json = await raw.json();

    // throw an error if code != 200
    if (raw.status !== 200) {
      const err = new Error(json.message);
      err.code = raw.status;
      throw err;
    }

    return json;
  } catch (e) {
    throw e;
  }
}

export default HTTP;
