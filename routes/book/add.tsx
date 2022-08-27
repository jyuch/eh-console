/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";

interface Data {
  error: {
    url: string;
  };
  url?: string;
}

export const handler: Handlers<Data> = {
  async POST(req, ctx) {
    // フォームデータの入力値を取得
    const formData = await req.formData();
    const url = formData.get("url")?.toString();

    // タイトルまたはコンテンツどちらも未入力の場合はバリデーションエラー
    if (!url) {
      return ctx.render({
        error: {
          url: url ? "" : "Url is required",
        },
        url,
      });
    }

    const article = {
      url,
    };

    // データベースに保存
    //await createArticle(article);

    // トップページにリダイレクト
    return new Response("", {
      status: 303,
      headers: {
        Location: "/book/add",
      },
    });
  },
};

export default function AddNewBook(
  { data }: PageProps<Data | undefined>,
) {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <h1 class={tw`"font-extrabold text-2xl text-gray-800"`}>Add new book</h1>
      <form
        class={tw("rounded-xl border p-5 shadow-md bg-white mt-8")}
        method="POST"
      >
        <input
          id="url"
          name="url"
          type="text"
          class={tw("w-full p-2 border border-gray-300 rounded-md")}
        />
        {data?.error?.url && (
          <p class={tw("text-red-500 text-sm")}>{data.error.url}</p>
        )}
        <div class={tw("flex justify-end mt-4")}>
          <button
            class={tw(
              "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md",
            )}
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
      <a href="/" class={tw`text-blue-700 no-underline hover:underline`}>
        Back
      </a>
    </div>
  );
}
