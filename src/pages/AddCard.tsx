import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../context";
import { ROUTER_PATH } from "../router/path";
import type { CardType } from "../types";
import { getLocalStorage, setLocalStorage, getEmptyCard } from "../utils";
import {
  Page,
  Header,
  Card,
  CardInputForm,
  BottomSheet,
  CardCompany,
} from "../components";

const AddCard = () => {
  const navigate = useNavigate();
  const [newCard, setNewCard] = useState<CardType>(getEmptyCard());
  const { toggleModal } = useContext(ModalContext);

  useEffect(() => {
    toggleModal();
  }, []);

  const handleFormSubmited = () => {
    const cards = getLocalStorage("card");
    setLocalStorage("card", [...cards, newCard]);
    navigate(ROUTER_PATH.NameCard);
  };

  const handleCardCompanyChanged = (companyName: string) => {
    setNewCard((prev): CardType => ({ ...prev, cardCompany: companyName }));
  };

  return (
    <Page>
      <Header title="카드 추가" isBack />
      <div onClick={toggleModal}>
        <Card {...newCard} />
      </div>
      <CardInputForm
        card={newCard}
        setCard={setNewCard}
        onSubmit={handleFormSubmited}
      />
      <BottomSheet>
        <CardCompany onChange={handleCardCompanyChanged} />
      </BottomSheet>
    </Page>
  );
};

export default AddCard;
