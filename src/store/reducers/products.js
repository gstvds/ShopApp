import PRODUCTS from "../../data/dummy-data";

const initialState = {
  avialableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(products => products.ownerId === "u1")
};

export default (state = initialState, action) => {
  return state;
};
