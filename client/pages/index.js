import { useState, useEffect } from "react";
import Head from "next/head";
import MainView from "../components/MainView";
import QuizCard from "../components/QuizCard";
import HTTP from "../utils/xhr.js";

export default function Home() {
  const [quizes, setQuizes] = useState();

  useEffect(() => {
    const server = new HTTP();
    server
      .getQuizes()
      .then((r) => {
        setQuizes(r.data);
        console.log(r);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <>
      <MainView>
        <h2>Available Quiz</h2>
        <section>
          {Array.isArray(quizes) &&
            quizes.map((q, i) => (
              <QuizCard id={q._id} name={q.name} difficulty="easy" key={i} />
            ))}
        </section>
      </MainView>

      <style jsx>{`
        section {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
      `}</style>
    </>
  );
}
