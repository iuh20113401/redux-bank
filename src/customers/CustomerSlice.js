const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createAt: "",
};
const CREATED = "customer/created";
const UPDATEFULLNAME = "customer/updateFullName";
export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case CREATED:
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createAt: action.payload.createAt,
      };
    case UPDATEFULLNAME:
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

export function createCustomer(fullName, nationalId) {
  return {
    type: CREATED,
    payload: {
      fullName,
      nationalId,
      createAt: new Date().toISOString(),
    },
  };
}
export function updateFullName(fullName) {
  return { type: UPDATEFULLNAME, payload: fullName };
}
