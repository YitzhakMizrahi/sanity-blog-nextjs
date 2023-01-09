function Logo(props: any) {
    const { renderDefault, title } = props;
  
    return (
      <div className="flex items-center space-x-2">
        <img
          className="rounded-full"
          width={50}
          src="/avatar.png"
          alt="logo"
        />
        {renderDefault && <>{renderDefault(props)}</>}
      </div>
    );
  }
  
  export default Logo;