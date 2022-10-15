import { createElement } from "react";
import contentEval from "../../lib/contentEval";
import { ParseElement } from "../../addl";

export default function BlockQuote({ elem }: { elem: ParseElement }) {
  return (
    <div className="post__quote">
      <div className="post__quote--start" />
      <QuoteContent elem={elem} />
      <div className="post__quote--end" />
    </div>
  );
}

function QuoteContent({ elem }: { elem: ParseElement }) {
  const content = contentEval(elem);
  return createElement(
    "blockquote",
    { className: "post__quote--content" },
    ...content
  );
}
