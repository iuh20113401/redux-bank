import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    loanRequest: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan += action.payload.amount;
        state.balance += action.payload.amount;
        state.loanPurpose = action.payload.purpose;
      },
    },
    payLoan(state, action) {
      if (state.balance < state.loan) return;
      state.balance -= action.payload;
      state.loan = 0;
      state.loanPurpose = "";
    },
  },
});
export const { deposit, withdraw, loanRequest, payLoan } = accountSlice.actions;

export default accountSlice.reducer;
// export default function reducer(state = initialState1, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/loanRequest":
//       if (state.loan > 0) return;
//       return {
//         ...state,
//         balance: state.balance + action.payload.amount,
//         loan: state.loan + action.payload.amount,
//         loanPurpose: action.payload.purpose,
//       };
//     case "account/payLoan":
//       if (state.balance < state.loan || state.loan < 0) return;
//       return {
//         ...state,
//         balance: state.balance - state.loan,
//         loan: state.loan - state.loan,
//         loanPurpose: "",
//       };
//     case "account/converted":
//       return { ...state, isLoading: true };
//     default:
//       return state;
//   }
// }
// export function deposit(amount, currency) {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };
//   return async function (dispatch, getState) {
//     dispatch({ type: "account/converted" });
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );
//     const data = await res.json();
//     dispatch({ type: "account/deposit", payload: data.rates.USD });
//   };
// }
// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }
// export function loanRequest(amount, purpose) {
//   return {
//     type: "account/loanRequest",
//     payload: { amount: amount, purpose: purpose },
//   };
// }
// export function payLoan() {
//   return { type: "account/payLoan" };
// }
