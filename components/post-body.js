import genElements from "../lib/genElems";

export default function PostBody({ content }) {
  return (
    <div className="markdown main-grid">
      {content.map((elem) => genElements(elem))}
    </div>
  );
}
