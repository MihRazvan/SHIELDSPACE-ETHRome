export const Button = ({
  children,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => {},
  type = "button", // Add type prop with default value
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset"; // Add optional type prop
}) => {
  return (
    <button
      className="btn btn-outline rounded-sm"
      onClick={onClick}
      type={type} // Add type attribute to button
    >
      {children}
    </button>
  );
};
