export type Product = {
  description: string,
  price: number,
  title: string,
  count: number
}
export type ProductFull = Product & {
  id: string
};

export type ErrorInfo = {
  message: string
};