import productParse from "./helpers/productParse";
import Image from "next/image";
import StarIcon from "./SVG/starIcon";
import { createElement, Fragment } from "react";
import { ParseElement } from "../../../addl";

export default function ProductCard({ elem }: { elem: ParseElement }) {
  const parsedProduct = productParse(elem);
  if (!parsedProduct) return null;

  const { image, title, rating, descriptionContent, link } = parsedProduct;

  return (
    <div className="kg-card kg-product-card">
      <div className="kg-product-card-container">
        {image.attributes.src && (
          <div className="kg-product-card-image">
            <Image
              src={image.attributes.src}
              layout="fill"
              sizes="60vw"
              alt={
                image.attributes.alt ||
                `Cover image for ${title} product review.`
              }
            />
          </div>
        )}
        <div className="kg-product-card-title-container">
          <h4 className="kg-product-card-title">{title}</h4>
        </div>
        {rating && (
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
        )}
        {descriptionContent && (
          <div className="kg-product-card-description">
            {createElement(Fragment, {}, ...descriptionContent)}
          </div>
        )}
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
