const baseurl =
  process.env.NODE_ENV === "production"
    ? "https://someprodurl"
    : "http://localhost:4000/api/v1";
const SESSION_TOKEN = "session_token";

class HTTP {
  constructor() {}

  async login({ username, password }) {
    try {
      const resp = await fetchServer(`/signin`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      console.log(resp);

      if (resp.token) {
        window.sessionStorage.setItem(SESSION_TOKEN, resp.token);
        return { message: "login successful", error: null };
      }

      return {
        message: "login failed. " + "maybe you want to sign up?",
        error: true,
      };
    } catch (ex) {
      console.log(ex.message);
      return { message: "login failed. " + ex.message, error: true };
    }
  }

  async signUp({ username, password }) {
    try {
      const resp = await fetchServer(`/signin`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
    } catch (ex) {
      console.log(ex.message);
      return { message: "login failed. " + ex.message, error: true };
    }
  }

  async getQuizes() {
    try {
      return await fetchServer(`/quizes`);
    } catch (err) {
      console.log(err);
      return { message: "error: " + err.message, error: true };
    }
  }

  async getQuestionByQuizId(id) {
    try {
      return await fetchServer(`/questions/${id}`);
    } catch (err) {
      console.log(err);
      return { message: "error: " + err.message, error: true };
    }
  }

  async submitQuiz(data) {
    try {
      return await fetchServer(`/submit`, {
        headers: {
          "Content-Type": "application/json",
          cors: "no-cors",
          accept: "application/json",
          Authorization:
            "Bearer " + window.sessionStorage.getItem(SESSION_TOKEN),
        },
        method: "POST",
        body: JSON.stringify({ answers: data }),
      });
    } catch (err) {
      console.log({ err });
      return { message: "error: " + err.message, error: true };
    }
  }
}

async function fetchServer(path, fetchOpts) {
  const raw = await window.fetch(baseurl + path, {
    headers: {
      "Content-Type": "application/json",
      cors: "no-cors",
      accept: "application/json",
    },
    ...fetchOpts,
  });

  let json = undefined;
  if (raw.ok) json = await raw.json();

  if (raw.status !== 200 && json) {
    throw Error(json.message || "something went wrong");
  }

  return { message: "something is wrong" };
}

export default HTTP;
