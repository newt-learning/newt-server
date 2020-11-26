import React from "react";
import { animated } from "react-spring";
import useBoop, { BoopConfig } from "../../hooks/useBoop";

interface BoopProps {
  children: React.ReactNode;
  boopConfig?: BoopConfig;
}

const Boop = ({ children, boopConfig }: BoopProps) => {
  const [style, trigger] = useBoop(boopConfig ?? {});

  return (
    // @ts-ignore
    <animated.span onMouseEnter={trigger} style={style}>
      {children}
    </animated.span>
  );
};

export default Boop;
