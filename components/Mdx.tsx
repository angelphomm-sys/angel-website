import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { YouTube, Figure, Gallery, Todo, LinkCard } from "./Media";

const components = { YouTube, Figure, Gallery, Todo, LinkCard };

export async function Mdx({ source }: { source: string }) {
  const compiled = await compile(source, { outputFormat: "function-body", development: false });
  const { default: Content } = await run(compiled, { ...runtime, baseUrl: import.meta.url });
  return (
    <div className="prose-post">
      <Content components={components} />
    </div>
  );
}
