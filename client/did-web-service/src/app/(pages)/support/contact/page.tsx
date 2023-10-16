"use client";
import { FC, useState } from "react";
import { contactUsService } from "@services/contact-us.service";
import { useToast } from '@services/feedback.service';

const ContactUsPage: FC = () => {
  const [message, setMessage] = useState(''); // State to store the message
  const { showSuccessToast, showErrorToast } = useToast();

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value); // Update the message state as the user types
  };

  const handleButtonClick = async (): Promise<void> => {
    try {
      if (message.trim() === '') {
        showErrorToast('Message cannot be empty.');
        return; // Stop execution if message is empty
      }
      const reportSent = await contactUsService.sendReport(message);
     // TODO Replace: When reportSent is true, the sending is successful
      if (reportSent != null || reportSent != undefined) {
        showSuccessToast('Contact us message sent.');
      } else {
        showErrorToast('Failed to send contact us message.')
      }
    } catch (error) {
      showErrorToast('Failed to send contact us message.')
    }
  };
  return (
    <div className="flex flex-col items-center justify-start">
      <h1 className="text-3xl font-bold mb-4">Contact us</h1>

      <textarea
        placeholder="Enter your message"
        className="border border-gray-300 p-2 my-2 w-3/4 h-60"
        value={message} // Set the value of the textarea to the message state
        onChange={handleTextareaChange} // Assign the change event handler
        rows={8}
      />
      <button className="bg-blue-500 text-white p-4 rounded-lg w-40 mt-4"
      onClick={handleButtonClick}
      >Submit</button>
    </div>
  );
};

export default ContactUsPage;