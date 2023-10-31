"use client";
import { FC, useState } from "react";
import { contactUsService } from "@services/contact-us.service";
import { useToast } from "@services/feedback.service";
import Headline from "@components/layout/Headline";
import { Stack, TextField } from "@mui/material";
import { DarkButton } from "@components/button";

const ContactUsPage: FC = () => {
  const [message, setMessage] = useState(""); // State to store the message
  const [sendingMessage, setSendingMessage] = useState(false);
  const { showSuccessToast, showErrorToast } = useToast();

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setMessage(event.target.value.trim()); // Update the message state as the user types
  };

  const handleButtonClick = async (): Promise<void> => {
    setSendingMessage(false);
    try {
      if (message.trim() === "") {
        showErrorToast("Message cannot be empty.");
        return; // Stop execution if message is empty
      }
      setSendingMessage(true);
      const reportSent = await contactUsService.sendReport(message);
      // TODO Replace: When reportSent is true, the sending is successful
      if (reportSent != null || reportSent != undefined) {
        showSuccessToast("Contact us message sent.");
      } else {
        showErrorToast("Failed to send contact us message.");
      }
    } catch (error) {
      showErrorToast("Failed to send contact us message.");
    }
    setSendingMessage(false);
  };
  return (
    <div>
      <Headline
        title="Contact Us"
        description="Feel free to get in touch with our dedicated support team through our Contact Us page. We're here to assist you with any questions,
        feedback, or assistance you may need."
        showBg={true}
      />

      <Stack alignItems="center" spacing={2}>
        <TextField
          id="outlined-multiline"
          className="w-full"
          label="Enter your message"
          multiline
          InputProps={{
            readOnly: sendingMessage,
          }}
          onChange={handleTextareaChange}
          rows={8}
        />
        <DarkButton
          className="w-40 mt-4"
          loading={sendingMessage}
          onClick={handleButtonClick}
          disabled={message.length < 1}
        >
          SUBMIT
        </DarkButton>
      </Stack>
    </div>
  );
};

export default ContactUsPage;
