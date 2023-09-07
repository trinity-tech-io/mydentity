import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface DatePickerCommonProps {
  selectedDate: Date | null;
  onDateChange: (date: Date) => void;
}
function DatePickerCommon({ selectedDate, onDateChange }: DatePickerCommonProps): React.JSX.Element {

  const handleDateChange = (date: Date): void => {
    onDateChange(date); // callback
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="Choose a birth date"
          value={selectedDate}
          onChange={handleDateChange}
          slotProps={{ textField: { fullWidth: true } }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default DatePickerCommon;