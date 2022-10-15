import { ParseElement } from "../../../addl";

export default function HeaderCard({ elem }: { elem: ParseElement }) {
  const headerSection = elem.children?.find((child) =>
    child.attributes?.class?.includes("card-header")
  );
  const subheaderSection = elem.children?.find((child) =>
    child.attributes?.class?.includes("card-subheader")
  );

  if (!headerSection) return null;

  return (
    <div className={elem.attributes?.class}>
      <h2
        className="kg-header-card-header"
        id={headerSection.attributes?.id || "genid_header"}
      >
        {headerSection.content}
      </h2>
      {subheaderSection && (
        <h3 className="kg-header-card-subheader">{subheaderSection.content}</h3>
      )}
    </div>
  );
}
