import { Handlers, PageProps } from "$fresh/server.ts";
import { addBook, Book, findBookByUrl } from "@db";
import { getTitle } from "@dom";

interface Data {
  error: {
    url: string;
  };
  url?: string;
}

export const handler: Handlers<Data> = {
  async POST(req, ctx) {
    const formData = await req.formData();
    const url = formData.get("url")?.toString();

    if (!url) {
      return ctx.render({
        error: {
          url: url ? "" : "Url is required",
        },
        url,
      });
    }

    const a = await findBookByUrl(url);

    console.log(a);

    if (a !== null) {
      return ctx.render({
        error: {
          url: "Url is already exists",
        },
        url,
      });
    }

    const title = await getTitle(url);
    console.log(title);

    await addBook(url, title ? title : "");
    console.log(url);

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
    <div class="p-4 mx-auto max-w-screen-md">
      <h1 class="font-extrabold text-2xl text-gray-800">Add new book</h1>
      <form
        class="rounded-xl border p-5 shadow-md bg-white mt-8"
        method="POST"
      >
        <input
          id="url"
          name="url"
          type="text"
          class="w-full p-2 border border-gray-300 rounded-md"
          value={data?.url}
        />
        {data?.error?.url && (
          <p class="text-red-500 text-sm">{data.error.url}</p>
        )}
        <div class="flex justify-end mt-4">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
      <a href="/" class="text-blue-700 no-underline hover:underline">
        Back
      </a>
    </div>
  );
}
