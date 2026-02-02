
export type MenuType = {
  name: string
  image: string 

}

export type Props = {
    category?: string
    setCategory?: React.Dispatch<React.SetStateAction<string>>
}