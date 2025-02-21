import { useEffect, useRef, useState } from "react";

type PropType = {
  children: React.ReactNode;
  view: boolean;
  openAnimation?: string;
  closeAnimation?: string;
  isSidebar?: boolean;
  childPositionX: "start" | "end" | "center";
  childPositionY: "end" | "center" | "start";
};

const OverlayLayout = ({
  children,
  view,
  openAnimation,
  closeAnimation,
  isSidebar,
  childPositionX,
  childPositionY
}: PropType) => {

  const [show, setShow] = useState(false);
  const [isClose, setIsClose] = useState(false);
  const innerRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (view) {
      setIsClose(false);
      setShow(true);
    }else{
      setIsClose(true);
    }
  }, [view]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isClose) {
      timer = setTimeout(() => {
        setIsClose(false);
        setShow(false);
      }, 300);
    }
    return () => clearTimeout(timer);
  }, [isClose]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

    const isOutsideClick =
      innerRef.current && !innerRef.current.contains(e.target as Node);
    
    const isSidebarClick =
      isSidebar &&
      (e.target instanceof HTMLLIElement ||
        e.target instanceof HTMLSpanElement ||
        e.target instanceof HTMLAnchorElement);

    if (isOutsideClick || isSidebarClick) {
      setIsClose(true);
    }
  };

  if (!show) return null;

  return (
    <div className={`overlay flex items-${childPositionY} justify-${childPositionX}`} onClick={handleClick}>
      <div
        ref={innerRef}
        className={`${isClose ? closeAnimation : openAnimation} h-full w-fit`}
      >
        {children}
      </div>
    </div>
  );
};

export default OverlayLayout;
