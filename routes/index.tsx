/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Counter from "../islands/Counter.tsx";

export default function Home() {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <a href="/book/add" class={tw`text-blue-700 no-underline hover:underline`}>
        Add new book
      </a>
    </div>
  );
}
