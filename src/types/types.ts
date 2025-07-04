export type GuitarData = {
    id: number;
    name: string;
    image: string
    description: string;
    price: number
}

export type GuitarItem = GuitarData & {
    quantity: number
}

export type IdGuitarItem = GuitarData['id']