import styled from "styled-components";
import { ROUTER_PATH } from "../router/path";
import { useNavigate } from "react-router-dom";
import { Button, Card, Page } from "../components";
import { getLocalStorage, setLocalStorage } from "../utils";
import React, { useState } from "react";

const NameCard = () => {
  const navigate = useNavigate();
  const cards = getLocalStorage("card");
  const targetCard = cards[cards.length - 1];
  const [name, setName] = useState("");

  const handleNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleButtonClicked = (routerPath: string) => () => {
    cards[cards.length - 1].name = name;
    console.log(cards[cards.length - 1].name);
    setLocalStorage("card", cards);
    navigate(routerPath);
  };

  return (
    <Page>
      <TitleWrapper>카드 등록이 완료되었습니다.</TitleWrapper>
      <Card {...targetCard} />
      <NameInputWrapper>
        <NameInput id="cardName" value={name} onChange={handleNameChanged} />
      </NameInputWrapper>
      <Button
        isShown={true}
        text="확인"
        type="button"
        onClick={handleButtonClicked(ROUTER_PATH.MyCard)}
      />
    </Page>
  );
};

const TitleWrapper = styled.h3`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 40px;
`;

const NameInputWrapper = styled.div`
  display: flex;
  height: 280px;
  align-items: center;
  text-align: center;
`;

const NameInput = styled.input`
  width: 50vw;
  height: 30px;
  text-align: center;
  border: none;

  font-size: 18px;

  border-bottom: 1.5px solid #737373;
  outline: none;

  &:focus {
    border-bottom: 1.5px solid blue;
  }
`;

export default NameCard;
