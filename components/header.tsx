const Header = () => {
  return (
    <header className="flex gap-5 px-4 h-16 items-center border-b border-border">
      <div className="flex gap-2 items-center">
        <div className="w-6 h-6 bg-primary rounded" />
        <span className="text-xl font-medium">
          Ether Coffee
        </span>
      </div>
    </header>
  );
};

export default Header;
