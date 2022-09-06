export default function TwitterCard({ elem }) {
  const tlink = elem.children
    .find((child) => child.name == "blockquote")
    .children.find((child) => child.name == "a").attributes.href;
  const tweetSrc = tlink.substring(0, tlink.indexOf("?ref_src"));
  return (
    <figure class="kg-card kg-embed-card kg-width">
      // Create a new iframe twitter element
      <iframe
        class="twitter-tweet"
        src={tweetSrc}
        width="100%"
        height="500"
        frameborder="0"
        scrolling="no"
        allowfullscreen="true"
      ></iframe>
    </figure>
  );
}
