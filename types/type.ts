
export type MenuType = {
  name: string
  image: string 

}

export type Props = {
    category?: string
    setCategory?: React.Dispatch<React.SetStateAction<string>>
}

export type FoodType = {
    _id?: string
    name?: string
    rating?: string
    image?: string
    price?: number
    description?: string
    category?: string
}

export type StoreContextValue = {
  foodList: FoodType[]
}
