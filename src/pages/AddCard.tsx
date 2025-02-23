import { useState } from "react";
import Card from "../components/Card";
import CardInputForm from "../components/CardInputForm";
import Header from "../components/common/Header";
import Page from "../components/common/Page";
import { CARD_COLOR } from "../constants";
import { CardType } from "../types";
import { getLocalStorage, setLocalStorage } from "../utils";

const AddCard = () => {
  const [newCard, setNewCard] = useState<CardType>({
    cardNumber: "",
    expiredDate: "",
    ownerName: "",
    cvc: "",
    password: ["", ""],
    color: CARD_COLOR[Math.floor(Math.random() * 10)],
  });

  const registerCard = () => {
    const cards = getLocalStorage("card");
    setLocalStorage("card", [...cards, newCard]);
  };

  return (
    <Page>
      <Header title="카드 추가" isBack />
      <Card {...newCard} />
      <CardInputForm
        card={newCard}
        setCard={setNewCard}
        onSubmit={registerCard}
      />
    </Page>
  );
};

export default AddCard;
