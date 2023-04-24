import { FormEvent } from "react";
import { useState } from "react";
import Card from "../components/Card";
import CardInputForm from "../components/CardInputForm";
import Header from "../components/common/Header";
import Page from "../components/common/Page";
import { CARD_COLOR } from "../constants";
import { CardType } from "../types";
import { getLocalStorage, setLocalStorage } from "../utils";

const AddCard = () => {
  const [card, setCard] = useState<CardType>({
    cardNumber: "",
    expiredDate: "",
    ownerName: "",
    cvc: "",
    password: ["", ""],
    color: CARD_COLOR[Math.floor(Math.random() * 10)],
  });

  const registerCard = (e: FormEvent) => {
    const cards = getLocalStorage("card");
    setLocalStorage("card", [...cards, card]);
  };

  return (
    <Page>
      <Header title="카드 추가" isBack />
      <Card
        color={card.color}
        ownerName={card.ownerName}
        expiredDate={card.expiredDate}
        cardNumber={card.cardNumber}
      />
      <CardInputForm
        card={card}
        setCard={setCard}
        onSubmit={(e: FormEvent) => registerCard(e)}
      />
    </Page>
  );
};

export default AddCard;
