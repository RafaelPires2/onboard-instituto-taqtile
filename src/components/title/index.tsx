import React, { HTMLAttributes } from 'react';
import { TitleContainer } from './styles';

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  content: string;
}

export function Title({ content, ...props }: TitleProps) {
  return <TitleContainer {...props}> {content}</TitleContainer>;
}
