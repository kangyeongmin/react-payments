import { HTMLAttributes } from "react";
import styled from "styled-components";
import { CARD_INPUT_MAX_LENGTH, CARD_INPUT_MIN_LENGTH } from "../constants";

interface CardInputType extends HTMLAttributes<HTMLInputElement> {
  id: "cardNumber" | "expiredDate" | "ownerName" | "cvc" | "password";
  value: number | string | undefined;
  width: string;
  isSecured?: boolean;
  isAutoFocus?: boolean;
  isRequired?: boolean;
}

const CardInput = (props: CardInputType) => {
  return (
    <CardInputWrapper
      id={props.id}
      value={props.value}
      width={props.width}
      type={props.isSecured ? "password" : "text"}
      autoFocus={props.isAutoFocus}
      required={props.isRequired}
      maxLength={CARD_INPUT_MAX_LENGTH[props.id]}
      minLength={CARD_INPUT_MIN_LENGTH[props.id]}
      placeholder={props.placeholder}
      onChange={props.onChange}
      onKeyDown={props.onKeyDown}
    />
  );
};

const CardInputWrapper = styled.input`
  width: ${(props) => props.width};
  height: 45px;

  padding: 0 10px;

  text-align: center;
  font-size: ${(props) => (props.type === "password" ? "32px" : "19px")};
  color: black;

  background: #ecebf1;
  border-radius: 7px;
  border: none;

  &:focus {
    outline-color: #525252;
  }

  &::placeholder {
    font-size: 15px;
  }
`;

export default CardInput;
