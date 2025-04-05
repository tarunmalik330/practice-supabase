const Cta = ({
  children,
  className = "",
  type = "button",
  onClick = () => {},
  variant = "default",
}) => {
  const btnType = {
    default: "bg-green-600 hover:bg-green-600/90",
    primary: "bg-red-600",
    secondary: "bg-amber-500",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        btnType[variant] || btnType.default
      } ${className} rounded-lg text-white py-2 px-4 tracking-wider text-lg font-medium w-max cursor-pointer transition-all ease-linear duration-300`}
    >
      {children}
    </button>
  );
};

export default Cta;
