import { createElement } from "react";
import contentEval from "../../lib/contentEval";

export default function BlockQuote({ elem }) {
  return (
    <div className="post__quote">
      <div className="post__quote--start" />
      <QuoteContent elem={elem} />
      <div className="post__quote--end" />
    </div>
  );
}

function QuoteContent({ elem }) {
  const content = contentEval(elem);
  return createElement(
    "blockquote",
    { className: "post__quote--content" },
    ...content
  );
}
