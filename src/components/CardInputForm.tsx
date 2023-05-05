import React, { FormEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CardInput, Button } from "./index";
import { CardType } from "../types";
import { QuestionMark } from "../assets";
import { PASSWORD_DIGIT_INDEX } from "../constants";
import {
  validateCardNumber,
  validateCvc,
  validateExpiredDate,
  validateForm,
  validateOwnerName,
  validatePassword,
} from "../utils";
import { useCardInputRefs } from "../hooks";

interface CardInputFormType {
  card: CardType;
  setNewCard: (key: keyof CardType, value: string) => void;
  onSubmit: (e: FormEvent) => void;
}

const CardInputForm = ({ card, setNewCard, onSubmit }: CardInputFormType) => {
  const [password, setPassword] = useState(["", ""]);
  const [isValidForm, setIsValidForm] = useState(false);
  const questionMarkRef = useRef(null);
  const [inputRefs] = useCardInputRefs();

  useEffect(() => {
    if (validateCardNumber(card.cardNumber) === "") {
      console.log(1);
      if (inputRefs[1].current) inputRefs[1].current.focus();
    }
    if (validateExpiredDate(card.expiredDate) === "") {
      console.log(2);
      if (inputRefs[2].current) inputRefs[2].current.focus();
    }
    if (validateCvc(card.cvc) === "") {
      if (inputRefs[4].current) inputRefs[4].current.focus();
    }
  }, [card]);

  useEffect(() => {
    setIsValidForm(validateForm(card));
  }, [card]);

  const handleInputChanged =
    (key: keyof CardType) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewCard(key, e.target.value);
    };

  const handleInputKeyDown =
    (key: keyof CardType) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!(e.target instanceof HTMLInputElement) || e.key !== "Backspace")
        return;

      const value = e.target.value;
      e.target.value = "";
      e.target.value = value;

      setNewCard(key, e.target.value);
    };

  const handlePasswordChanged =
    (digit: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      password[digit] = e.target.value;
      setPassword(password);
      setNewCard("password", password.join(""));
    };

  return (
    <CardInputFormWrapper onSubmit={onSubmit}>
      <InputSetWrapper>
        <label htmlFor="cardNumber">카드 번호</label>
        <CardInput
          ref={inputRefs[0]}
          value={card.cardNumber}
          placeholder="카드 번호를 입력해 주세요."
          width="318px"
          isAutoFocus
          isRequired
          maxLength={25}
          onChange={handleInputChanged("cardNumber")}
          onKeyDown={handleInputKeyDown("cardNumber")}
        />
        {<span>{card.cardNumber && validateCardNumber(card.cardNumber)}</span>}
      </InputSetWrapper>

      <InputSetWrapper>
        <label htmlFor="expiredDate">만료일</label>
        <CardInput
          ref={inputRefs[1]}
          value={card.expiredDate}
          placeholder="MM / YY"
          width="137px"
          isRequired
          maxLength={7}
          onChange={handleInputChanged("expiredDate")}
          onKeyDown={handleInputKeyDown("expiredDate")}
        />
        <span>{card.expiredDate && validateExpiredDate(card.expiredDate)}</span>
      </InputSetWrapper>

      <InputSetWrapper>
        <OwnerNameLabelWrapper>
          <label htmlFor="ownerName">카드 소유자 이름 (선택)</label>
          <span>{card.ownerName.length}/14</span>
        </OwnerNameLabelWrapper>
        <CardInput
          ref={inputRefs[2]}
          value={card.ownerName}
          width="318px"
          maxLength={14}
          placeholder="카드에 표시된 이름과 동일하게 입력하세요."
          onChange={handleInputChanged("ownerName")}
        />
        {<span>{card.ownerName && validateOwnerName(card.ownerName)}</span>}
      </InputSetWrapper>

      <InputSetWrapper>
        <label htmlFor="cvc">보안 코드(CVC/CVV)</label>
        <CvcInputWrapper>
          <CardInput
            ref={inputRefs[3]}
            value={card.cvc}
            width="84px"
            isSecured
            isRequired
            maxLength={3}
            onChange={handleInputChanged("cvc")}
          />
          <img ref={questionMarkRef} src={QuestionMark} alt="도움말" />
          <AnswerBoxWrapper>
            <p>카드 뒷면의 보안 3자리 숫자를 입력해 주세요 😊</p>
          </AnswerBoxWrapper>
        </CvcInputWrapper>
        {<span>{card.cvc && validateCvc(card.cvc)}</span>}
      </InputSetWrapper>

      <InputSetWrapper>
        <label htmlFor="password">카드 비밀번호</label>
        <PasswordInputWrapper>
          <CardInput
            ref={inputRefs[4]}
            id="password1"
            value={password[PASSWORD_DIGIT_INDEX.FIRST]}
            width="42px"
            maxLength={1}
            isSecured
            isRequired
            onChange={handlePasswordChanged(PASSWORD_DIGIT_INDEX.FIRST)}
          />
          <CardInput
            ref={inputRefs[5]}
            id="password2"
            width="42px"
            value={password[PASSWORD_DIGIT_INDEX.SECOND]}
            isSecured
            isRequired
            maxLength={1}
            onChange={handlePasswordChanged(PASSWORD_DIGIT_INDEX.SECOND)}
          />
          <SecuredPasswordWrapper>●</SecuredPasswordWrapper>
          <SecuredPasswordWrapper>●</SecuredPasswordWrapper>
        </PasswordInputWrapper>
        {<span>{card.password && validatePassword(card.password)}</span>}
      </InputSetWrapper>
      <Button isShown={isValidForm} type="submit">
        다음
      </Button>
    </CardInputFormWrapper>
  );
};

const CardInputFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;

  padding: 20px;
`;

const InputSetWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 8px;

  & > label {
    font-weight: 500;
    font-size: 12px;
    color: #525252;
    margin-bottom: 6px;
  }

  & > span {
    margin: 5px 2px;
    font-size: 10px;
    color: red;
  }
`;

const OwnerNameLabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  & > label {
    font-weight: 500;
    font-size: 12px;
    color: #525252;

    margin-bottom: 6px;
  }

  & > span {
    color: black;
    font-size: 12px;
  }
`;

const CvcInputWrapper = styled.div`
  display: flex;
  position: relative;

  & > img {
    width: 27px;
    height: 27px;

    margin: 8px 0 0 10px;

    cursor: pointer;
  }
`;

const PasswordInputWrapper = styled.div`
  display: flex;

  & > :first-child {
    margin-right: 5px;
  }

  & > :nth-child(2) {
    margin-right: 7px;
  }
`;

const SecuredPasswordWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 48px;

  font-size: 12px;
`;

const AnswerBoxWrapper = styled.div`
  ${CvcInputWrapper} > img:hover + & {
    display: flex;
  }
  display: none;
  width: 180px;
  height: 50px;

  position: absolute;
  top: -20px;
  left: 130px;

  padding: 10px;

  background: #ecebf1;
  border-radius: 8px;

  & > p {
    align-self: center;
    font-size: 13px;
    color: #636c72;
  }
`;

export default CardInputForm;
