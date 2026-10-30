import { createSlice } from "@reduxjs/toolkit";
const makeShowKey = ({ movieId, date, time, hallName }) =>`${movieId}|${date}|${time}|${hallName}`;
const initialState={
    currentBooking: null,
    bookedSeatsByShow: {}
};
const bookingSlice=createSlice({
    name:"booking",initialState,
    reducers:{
        startBooking:(state,action)=>{
            state.currentBooking={
                ...action.payload,selectedSeats:[],status:"draft",
            };
        },
        toggleSeat:(state,action)=>{
            const booking=state.currentBooking;
            if(!booking || booking.status!=="draft") return;
            const showKey=makeShowKey(booking);
            const bookedSeats=state.bookedSeatsByShow[showKey] || [];
            const seat=action.payload;
            if(bookedSeats.includes(seat)) return;
            const selectedSeats=booking.selectedSeats;
            if(selectedSeats.includes(seat)){
                booking.selectedSeats=selectedSeats.filter((selectedSeats)=>selectedSeats!==seat);}
            else{
                selectedSeats.push(seat);
            }
        },
        confirmBooking:(state)=>{
            const booking=state.currentBooking;
            if(!booking || booking.status!=="draft") return;
            const showkey=makeShowKey(booking);
            const bookedSeats=state.bookedSeatsByShow[showkey]||[];
            state.bookedSeatsByShow[showkey]=[
                ...new Set([...bookedSeats,...booking.selectedSeats])];
                booking.status="confirmed";
        },
        cancelBooking:(state)=>{
            const booking=state.currentBooking;
            if(!booking || booking.status!=="confirmed") return;
            const showkey=makeShowKey(booking);
            state.bookedSeatsByShow[showkey]=(state.bookedSeatsByShow[showkey]||[]).filter((seat)=>!booking.selectedSeats.includes(seat))
                booking.status="cancelled";
        },
        clearBooking:(state)=>{
            state.currentBooking=null;
        },
    },
  
});
export const{
    startBooking,
    toggleSeat,
    confirmBooking,
    cancelBooking,
    clearBooking,
}=bookingSlice.actions;
export default bookingSlice.reducer