export type MenuType = {
  name: string;
  image: string;
};

export type Props = {
  category?: string;
  setCategory?: React.Dispatch<React.SetStateAction<string>>;
  searchQuery?: string;
};

export type FoodType = {
  _id: string;
  name?: string;
  rating?: string;
  image?: string;
  price: number;
  description?: string;
  category?: string;
};

export type CartItems = {
  [key: string]: number;
};

export type StoreContextType = {
  foodList: FoodType[];
  cartItems: CartItems;
  setCartItems: React.Dispatch<React.SetStateAction<CartItems>>;
  addToCart: (foodId: string) => void;
  removeFromCart: (foodId: string) => void;
  getTotalCartAmount: () => number;
  url: string;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  foodListLoading: boolean;
};

export type LoginPopupProps = {
setShowLoginPopup: React.Dispatch<React.SetStateAction<boolean>>;
showLoginPopup?: boolean;
};