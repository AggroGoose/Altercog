import Image from "next/image";

export default function Avatar({ name, picture }) {
  return (
    <div className="avatar">
      <div className="avatar__image">
        {picture && (
          <Image
            src={`${picture}?auto=format,compress,enhance&w=100&h=100`}
            layout="fill"
            className="avatar__image--img"
            alt={name}
          />
        )}
      </div>
      <div className="avatar__name">{name}</div>
    </div>
  );
}
