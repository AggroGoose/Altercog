import React from "react";
import Image from "next/future/image";

const Avatar = ({ avatarLink, handleProfile, menuType }) => {
  return (
    <button
      className={`header__right--button${
        menuType === "user" ? " drop__active" : ""
      }`}
      onClick={handleProfile}
    >
      <div className="header__right--content">
        <Image
          src={avatarLink}
          width={40}
          height={40}
          alt="User avatar image"
        />
        <p>Profile</p>
      </div>
    </button>
  );
};

export default Avatar;
