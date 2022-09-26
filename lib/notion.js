import { Client } from "@notionhq/client";

let notion;

if (process.env.NODE_ENV === "production") {
  notion = new Client({ auth: process.env.NOTION_SECRET });
} else {
  if (!global.notion) {
    global.notion = new Client({ auth: process.env.NOTION_SECRET });
  }
  notion = global.notion;
}

export default notion;
