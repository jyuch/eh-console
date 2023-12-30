import { Handlers, PageProps } from "$fresh/server.ts";
import { getDownloadRemain, getParseRemain } from "@db";

interface Remain {
  book: number;
  page: number;
}

export const handler: Handlers<Remain> = {
  async GET(_, ctx) {
    const remain: Remain = {
      book: await getDownloadRemain(),
      page: await getParseRemain(),
    };
    return ctx.render(remain);
  },
};

export default function Home(props: PageProps<Remain>) {
  return (
    <div class="p-4 mx-auto max-w-screen-md">
      <div class="rounded-xl border p-5 shadow-md bg-white mt-8">
        <p>
          Book parse remain: {props.data.book}
        </p>
        <p>
          Page download remain: {props.data.page}
        </p>
      </div>
    </div>
  );
}
