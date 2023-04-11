import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

type ButtonType = ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonContainerProps = {
  width: string;
  height: string;
  textColor?: string;
  bgButton?: string;
} & ButtonType;

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.bgButton};

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 4px;

  font-size: 16px;
  font-weight: 400;
  padding: 10px;
  cursor: pointer;

`;
