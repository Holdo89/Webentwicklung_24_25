import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Box } from "@mui/material";

export default function DateCalendarFormProps() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh", // Full screen height
          backgroundColor: "#f5f5f5", // Light background (optional)
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "600px",
            height: "400px", // Wider calendar container
            padding: 3,
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <DemoContainer components={["DateCalendar", "DateCalendar"]}>
            <DemoItem label="">
              <DateCalendar defaultValue={dayjs("2022-04-17")} readOnly />
            </DemoItem>
          </DemoContainer>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
