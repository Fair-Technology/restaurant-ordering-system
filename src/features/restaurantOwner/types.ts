export interface Item {
  id?: string;
  shopId: string;
  name: string;
  description: string;
  price: number;
  size: string;
  isAvailable: boolean;
  createdAt?: string;
  updatedAt?: string;
}
