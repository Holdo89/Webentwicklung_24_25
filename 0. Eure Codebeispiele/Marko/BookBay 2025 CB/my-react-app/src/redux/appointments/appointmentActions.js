// src/redux/appointments/appointmentActions.js

export const getAppoinmentData = (data) => ({
  type: "SET_APPOINTMENTS",
  payload: data,
});

export const deleteAnAppoinment = (id) => ({
  type: "DELETE_APPOINTMENT",
  payload: id,
});
