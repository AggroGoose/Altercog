import { ParseElement } from "../../../addl";
import Tweet from "./tweet";

export default function TwitterCard({ elem }: { elem: ParseElement }) {
  return <>{elem.additional?.tweet && <Tweet {...elem.additional.tweet} />}</>;
}
