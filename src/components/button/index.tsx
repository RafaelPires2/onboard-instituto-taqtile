import { ButtonHTMLAttributes } from 'react';
import { ButtonContainer } from './styles';

type ButtonTypeProps = ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonContainerProps = {
  width: string;
  height: string;
  textColor?: string;
  content: any;
  type: 'submit' | 'button' | 'reset';
  bgButton: string;
} & ButtonTypeProps;

export function CustomButton({
  width,
  height,
  textColor,
  content,
  type,

  ...props
}: ButtonContainerProps) {
  return (
    <>
      <ButtonContainer width={width} height={height} type={type} textColor={textColor} {...props}>
        {content}
      </ButtonContainer>
    </>
  );
}
