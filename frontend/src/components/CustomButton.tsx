import PropTypes from "prop-types";

export function Button(props: any) {
  const { children, onClick, disabled } = props;

  return (
    <button className="custom-button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick: () => {},
  disabled: false,
};

{
  /* <CustomButton onClick={() => console.log('Button clicked')}>
Click Me
</CustomButton> */
}
