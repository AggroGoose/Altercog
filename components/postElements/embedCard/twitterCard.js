export default function TwitterCard({ elem }) {
  const tlink = elem.children
    .find((child) => child.name == "blockquote")
    .children.find((child) => child.name == "a").attributes.href;
  const tweetSrc = tlink.substring(0, tlink.indexOf("?ref_src"));
  return (
    <figure className="kg-card kg-embed-card kg-width">
      <iframe
        className="twitter-tweet"
        src={tweetSrc}
        width="100%"
        height="500"
        frameBorder="0"
        scrolling="no"
        allowFullScreen="true"
      ></iframe>
    </figure>
  );
}
