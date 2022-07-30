import http from "../http-common";
const getAll = () => {
  return http.get("/admin_user/getAllFlatBooking");
};
const get = bookingNo => {
  return http.get(`/admin_user/getFlatBooking/${bookingNo}`);
};
const create = data => {
  return http.post("/admin/addFlatBooking", data);
};
const update = (bookingNo,data) => {
  return http.put(`/admin/updateFlatBooking/${bookingNo}`, data);
};
const remove = bookingNo => {
  return http.delete(`/admin_user/deleteFlatBooking/${bookingNo}`);
};
/* any other service or queries or sorting or features which you want to add
const removeAll = () => {
  return http.delete(`/tutorials`);
};
const findByTitle = title => {
  return http.get(`/tutorials?title=${title}`);
};*/
const FlatBookingService = {
  getAll,
  get,
  create,
  update,
  remove,
  //removeAll,
  //findByTitle
  //you can add more actions here
};
export default FlatBookingService;