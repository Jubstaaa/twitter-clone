import React from "react";
interface Props {
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  onClick?: () => {};
}

function SidebarRow({ Icon, title, onClick }: Props) {
  return (
    <div onClick={() => onClick?.()} className="sidebar-items ">
      <Icon className="h-6 w-6" />
      <p className="hidden md:inline-flex text-base  lg:text-xl">{title}</p>
    </div>
  );
}

export default SidebarRow;
