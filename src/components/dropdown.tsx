interface DropdownProps {
  className?: string;
}

function Dropdown({ children }: React.PropsWithChildren<DropdownProps>) {
  return (
    <div
      className="absolute  top-full mt-2 px-8 py-3 rounded-[0.7rem] bg-white shadow-2xl max-sm:-right-[50%]"
      id="user-menu-floating"
      role="menu"
    >
      {children}
    </div>
  );
}

export default Dropdown;
