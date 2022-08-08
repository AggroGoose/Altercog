import { createElement } from "react";
import { Fragment } from "react";

export default function childBuilder(children) {
  if (!children) return [];
  const constArr = [];
  children.forEach((elem) => {
    const childContent = elem.content
      ? [elem.content]
      : childBuilder(elem.children);

    switch (elem.name) {
      case "text":
        constArr.push(
          createElement(Fragment, { key: elem.id }, ...childContent)
        );
        break;
      case "strong":
      case "em":
        constArr.push(
          createElement(elem.name, { key: elem.id }, ...childContent)
        );
        break;
      case "a":
      case "span":
      case "p":
      case "button":
      case "h1":
      case "h2":
      case "h3":
      case "h4":
        const obj = elem.attributes
          ? { ...elem.attributes, key: elem.id }
          : { key: elem.id };

        constArr.push(createElement(elem.name, obj, ...childContent));
        break;
    }
  });

  return constArr;
}
