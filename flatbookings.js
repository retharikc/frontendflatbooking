import {
    ADD_FLATBOOKING,
  RETRIEVE_FLATBOOKING,
  UPDATE_FLATBOOKING,
  DELETE_FLATBOOKING,
  } from "../actions/types";
  const initialState = [];
  function flatbookingReducer(flatbookings = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case ADD_FLATBOOKING:
        return [...flatbookings, payload];
      case RETRIEVE_FLATBOOKING:
        return payload;
      case UPDATE_FLATBOOKING:
        return flatbookings.map((flatbooking) => {
          if (flatbooking.bookingNo === payload.bookingNo) {
            return {
              ...flatbooking,
              ...payload,
            };
          } else {
            return flatbooking;
          }
        });
      case DELETE_FLATBOOKING:
        return flatbookings.filter(({ bookingNo }) => bookingNo !== payload.bookingNo);
      
      default:
        return flatbookings;
    }
  };
  export default flatbookingReducer;