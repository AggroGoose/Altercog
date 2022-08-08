import productParse from "./helpers/productParse";
import Image from "next/image";
import StarIcon from "./SVG/starIcon";
import { createElement, Fragment } from "react";

export default function ProductCard({ elem }) {
  const { image, title, rating, descriptionContent, link } = productParse(elem);

  return (
    <div className="kg-card kg-product-card">
      <div className="kg-product-card-container">
        <div className="kg-product-card-image">
          <Image
            src={image.attributes.src}
            layout="fill"
            sizes="60vw"
            alt={
              image.attributes.alt || `Cover image for ${title} product review.`
            }
          />
        </div>
        <div className="kg-product-card-title-container">
          <h4 className="kg-product-card-title">{title}</h4>
        </div>
        <div className="kg-product-card-rating">
          {rating.map((r) => {
            return (
              <span
                className="kg-product-card-rating-active kg-product-card-rating-star"
                key={r.id}
              >
                <StarIcon />
              </span>
            );
          })}
        </div>
        <div className="kg-product-card-description">
          {createElement(Fragment, {}, ...descriptionContent)}
        </div>
        <a
          href={link}
          className="kg-product-card-button kg-product-card-btn-accent"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Check it Out MAAAN</span>
        </a>
      </div>
    </div>
  );
}
