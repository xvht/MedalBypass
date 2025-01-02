"use client";

import { getLanguage } from "@/lib/languages";
import { useEffect, useState } from "react";
import { ReactTyped } from "react-typed";

const LocalizedMessage: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const language = getLanguage();
    setMessage(language!.text);
  }, []);

  return (
    <h1 className="to-custom-main absolute bg-gradient-to-r from-custom-main-first to-custom-main-second bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-[3rem]">
      <ReactTyped strings={[message]} typeSpeed={50} />
    </h1>
  );
};

const LocalizedAuthor: React.FC = () => {
  const [author, setAuthor] = useState<string>("");

  useEffect(() => {
    const language = getLanguage();
    setAuthor(language!.author);
  }, []);

  return (
    <p className="bg-gradient-to-r from-custom-main-first to-custom-main-second bg-clip-text font-semibold text-transparent">
      {author}{" "}
      <a className="underline" href="https://github.com/xvht" target="_blank">
        @xvht
      </a>
    </p>
  );
};

export { LocalizedAuthor, LocalizedMessage };
