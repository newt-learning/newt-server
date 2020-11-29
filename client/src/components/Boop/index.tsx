import React from "react";
import { animated } from "react-spring";
import useBoop, { BoopConfig } from "../../hooks/useBoop";

interface BoopProps {
  children: React.ReactNode;
  boopConfig?: BoopConfig;
  disableTrigger?: boolean;
  overrideStyle?: any;
}

const Boop = ({
  children,
  boopConfig,
  disableTrigger = false,
  overrideStyle,
}: BoopProps) => {
  const [style, trigger] = useBoop(boopConfig ?? {});

  return (
    <animated.span
      // @ts-ignore
      onMouseEnter={disableTrigger ? null : trigger}
      style={overrideStyle ? overrideStyle : style}
    >
      {children}
    </animated.span>
  );
};

export default Boop;
