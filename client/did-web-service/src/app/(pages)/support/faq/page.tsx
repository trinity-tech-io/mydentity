"use client";
import { FC } from "react";
import { Stack, Typography } from "@mui/material";
import { FAQ } from "./FAQ";
import { FAQDataDID } from "./faq-data-did";
import { FAQDataMydentity } from "./faq-data-mydentity";
import { FAQGroup } from "./faq-types";
import Headline from "@components/layout/Headline";

const faqEntries: FAQGroup[] = [FAQDataDID, FAQDataMydentity];

const FAQPage: FC = () => {
  return (
    <div>
      <Headline
        title="Frequently Asked Questions"
        description="Do you have questions about these new 'identities'? We are here with answers to address any queries you may have."
        showBg={true}
      />
      <Stack spacing={2}>
        {faqEntries.map((group, i) => (
          <FAQ key={i} group={group} />
        ))}
      </Stack>
    </div>
  );
};

export default FAQPage;
