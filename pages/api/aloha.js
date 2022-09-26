import notion from "../../lib/notion";

export default async function handler(req, res) {
  let page;
  try {
    const blockId = "c4853a7a-f55e-4265-835e-c7363703e3dc";
    page = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 50,
    });
  } catch (error) {
    console.error(error);
  }

  res.status(200).json(page);
}
