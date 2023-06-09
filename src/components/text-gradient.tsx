import React from "react";
import styled, { keyframes, css } from "styled-components";

/**
 * Example Text Gradient Animation
 */
export default function TextGradientComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AnimatedGradientText>{children}</AnimatedGradientText>;
}

const gradient = css`
  ${keyframes`
0% {
  background-position: 0 50%;
}
50% {
  background-position: 100% 50%;
}
100% {
  background-position: 0 50%;
}
`}
`;

const AnimatedGradientText = styled.h1`
  animation: ${gradient} 5s ease-in-out infinite;
  background: linear-gradient(to right, #bbdefb, #fff, #bbdefb, #fff);
  background-size: 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
