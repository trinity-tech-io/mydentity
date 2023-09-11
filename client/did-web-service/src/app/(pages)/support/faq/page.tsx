"use client";
import { Typography } from "@mui/material";
import { FC } from "react";
import { FAQ } from "./FAQ";
import { FAQDataDID } from "./faq-data-did";
import { FAQDataDIDWebService } from "./faq-data-did-web-service";
import { FAQGroup } from "./faq-types";

const faqEntries: FAQGroup[] = [
  FAQDataDID,
  FAQDataDIDWebService
]

const FAQPage: FC = () => {
  return (<div className="col-span-full">
    <Typography variant="h3">
      F.A.Q.
    </Typography>
    <Typography>
      You have many questions about these new "identities"? We might have answers.
    </Typography>

    {faqEntries.map((group, i) => <FAQ className="mt-6" key={i} group={group} />)}
  </div>)
}

export default FAQPage;