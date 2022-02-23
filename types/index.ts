export interface RegisterUser {
    is_marketing: boolean
    last_name: string
    address: string
    avatar: string
    password_confirmation: string
    password: string
    first_name: string
    phone_number: string
    email: string
}
export interface LoginUser {
  email: string
  password: string
}

export type UserData = {
    uuid: string
    first_name: string,
    last_name: string,
    email: string,
    avatar: string | null,
    address: string | number,
    phone_number: string | number,
    is_marketing: boolean,
    updated_at: string,
    created_at: string,
    token?: string
}
export interface AuthenticateUserResponse  {
  success: 1,
  data: UserData,
  error: null,
  errors: any[],
  extra: any[]
}
export interface LoginUserResponse  {
  success: 1,
  data: {
    token: string
  },
  error: null,
  errors: any[],
  extra: any[]
}

export interface LatestPromotion {
  uuid: string
  title: string
  content: string
  metadata: {
    image: string
    valid_to: string
    valid_from: string
  }
  created_at: string
  updated_at: string
}

export interface Category {
  uuid: string
  title: string
  slug: string
  created_at: string
  updated_at: string
}

export interface BlogPost {
  uuid: string
  title: string
  slug: string
  content: string
  metadata: {
      image: string
      author: string
  }
  created_at: string
  updated_at: string
}

export interface getImageStatus {
  src?: string
  status: boolean
  message?: string
}

export interface Brand {
  uuid: string
  title: string
  slug: string
  created_at: string
  updated_at: string
}

export interface Product {
  category_uuid: string
  title: string
  uuid: string
  price: number
  description: string
  metadata: {
    brand: string
    image: string
  }
  created_at: string,
  updated_at: string,
  deleted_at: null,
  category: Category
  brand: Brand
}

export interface CartItem {
  category_uuid: string
  title: string
  uuid: string
  price: number
  description: string
  metadata: {
    brand: string
    image: string
  }
  quantity: number
}

export interface SliderProduct {
  categoryName: string
  products: Product[]
}