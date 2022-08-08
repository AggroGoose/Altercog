import childBuilder from "./childBuilder";

export default function contentEval(elem) {
  if (elem.content) {
    return [elem.content];
  } else if (elem.children?.length >= 1) {
    return childBuilder(elem.children);
  } else {
    return [];
  }
}
