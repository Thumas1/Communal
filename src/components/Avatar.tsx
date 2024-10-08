import React from "react";
import styled from "styled-components";

export const Avatar = ({
  imageUrl,
  altText,
  size,
  name,
  tooltipClasses,
  clickable,
  onClick,
  large,
}: {
  imageUrl: string | undefined;
  altText: string;
  size: string;
  tooltipClasses?: string;
  name?: string;
  clickable?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  large?: boolean;
}) => (
  <ImgWrapper
    size={size}
    clickable={clickable}
    onClick={onClick && onClick}
    className={tooltipClasses}
    data-text={name}
    large={large}
  >
    {large ? (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ProfileImage src={imageUrl} alt={altText} />
      </div>
    ) : (
      <Image src={imageUrl} alt={altText} />
    )}
  </ImgWrapper>
);

const Image = styled.img`
  display: block;
  border-radius: 50%;
  width: max(2vw, 45px);
  max-width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  box-shadow: ${({ theme }) => theme.utils.boxShadow};
`;
const ProfileImage = styled.img`
  display: block;
  border-radius: 50%;
  width: max(5vw, 140px);
  aspect-ratio: 1/1;
  object-fit: cover;
`;

const ImgWrapper = styled.div<{
  size: string;
  clickable?: boolean;
  large?: boolean;
}>`
  box-sizing: border-box;
  border-radius: 50%;
  width: ${(props) => props.size};
  min-width: ${(props) => props.size};
  min-height: ${(props) => props.size};
  ${(props) => props.clickable && "cursor: pointer;"}
`;
