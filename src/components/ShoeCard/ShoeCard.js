import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper className={variant}>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price className={variant}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variant === "on-sale" ? (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          ) : (
            ""
          )}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  flex: 1 1 25%;
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  width: 100%;
`;

const ImageWrapper = styled.div`
  position: relative;

  &::before {
    position: absolute;
    right: -4px;
    top: 12px;
    padding: 6px 10px;
    font-size: 14px;
    font-weight: ${WEIGHTS.bold};
    border-radius: 2px;
    color: ${COLORS.white};
  }

  &.new-release {
    &::before {
      content: "Just released!";
      background-color: ${COLORS.secondary};
    }
  }

  &.on-sale {
    &::before {
      content: "Sale";
      background-color: ${COLORS.primary};
    }
  }
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  font-size: 1rem;
`;

const Name = styled.h3`
  margin-right: auto;
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  &.on-sale {
    text-decoration: line-through;
  }
`;

const ColorInfo = styled.p`
  margin-right: auto;
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
