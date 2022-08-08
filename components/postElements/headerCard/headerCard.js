export default function HeaderCard({ elem }) {
  const headerSection = elem.children.find((child) =>
    child.attributes?.class.includes("card-header")
  );
  const subheaderSection = elem.children.find((child) =>
    child.attributes?.class.includes("card-subheader")
  );

  return (
    <div className={elem.attributes?.class}>
      <h2 className="kg-header-card-header" id={headerSection.attributes?.id}>
        {headerSection.content}
      </h2>
      <h3 className="kg-header-card-subheader">{subheaderSection.content}</h3>
    </div>
  );
}
