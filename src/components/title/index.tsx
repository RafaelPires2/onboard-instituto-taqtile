import React, { HTMLAttributes } from 'react';

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  content: string;
}

export function Title({ content, ...props }: TitleProps) {
  return <h1 {...props}> {content}</h1>;
}
