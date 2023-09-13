"use client";
import { MainButton } from "@components/generic/MainButton";
import { FC } from "react";

const ElastosPage: FC = () => {
  const openElastosWebsite = (): void => {
    window.open("https://elastos.org", "_blank");
  }

  return (<div className="col-span-full">
    Elastos is the underlying technology behind all those <b>identities</b>.
    <MainButton onClick={openElastosWebsite} className="mt-6">Discover Elastos</MainButton>
  </div>)
}

export default ElastosPage;