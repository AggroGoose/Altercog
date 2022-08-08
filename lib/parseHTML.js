import cheerio from "cheerio";

export default function parseHTML(post) {
  const $ = cheerio.load(post);
  const a = $("body").contents().toArray();

  const contentArray = parseHtmlObject(a);

  return contentArray;
}

const parseHtmlObject = (arr) => {
  const newArr = [];
  for (const i in arr) {
    if (arr[i].type != "tag") continue;

    const obj = {};
    obj.id = i;
    obj.name = arr[i].name;
    if (arr[i].attributes.length > 0) obj.attributes = arr[i].attribs;

    if (arr[i].children.length < 1) {
      newArr.push(obj);
      continue;
    }

    if (arr[i].children.length > 1 || arr[i].children[0].type == "tag") {
      obj.children = parseHtmlChildren(arr[i].children);
    } else {
      obj.content = arr[i].children[0].data;
    }

    newArr.push(obj);
  }

  return newArr;
};

const parseHtmlChildren = (arr) => {
  const newArr = [];
  for (const i in arr) {
    if (arr[i].type != "tag") {
      if (arr[i].type == "text" && arr[i].data) {
        const textObj = {
          id: i,
          name: "text",
          content: arr[i].data,
        };
        newArr.push(textObj);
      }
      continue;
    }

    const obj = {};
    obj.id = i;
    obj.name = arr[i].name;
    if (arr[i].attributes.length > 0) obj.attributes = arr[i].attribs;

    if (arr[i].children.length < 1) {
      newArr.push(obj);
      continue;
    }

    if (arr[i].children.length > 1 || arr[i].children[0].type == "tag") {
      obj.children = parseHtmlChildren(arr[i].children);
    } else if (arr[i].children[0].data) {
      obj.content = arr[i].children[0].data;
    }

    newArr.push(obj);
  }

  return newArr;
};
