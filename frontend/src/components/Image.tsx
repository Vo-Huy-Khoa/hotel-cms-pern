import React from "react";
import PropTypes from "prop-types";

function Image(props: any) {
  const { src, alt, width, height } = props;

  return (
    <img
      className="custom-image"
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

Image.defaultProps = {
  width: 200,
  height: 200,
};

{
  /* <CustomImage
src="https://example.com/image.jpg"
alt="Example image"
width={400}
height={300}
/> */
}
