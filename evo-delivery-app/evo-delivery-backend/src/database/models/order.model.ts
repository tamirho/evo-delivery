import mongoose, { Schema, trusted } from "mongoose";


export interface IOrder{
    id?: mongoose.Types.ObjectId;
    shippingAddress: IRegularAddress;
    shippingDate?: Date;
    weight: number;
    createdAt:Date;
    updatedAt:Date;
}

export interface IRegularAddress {
    state: string;
    city: string;
    street: string;
    buildingNumber: number;
    apartmentNumber: number;
    postalCode: number;
    coordinates: ICoordinatesAddress;
};
  
export interface ICoordinatesAddress{
    latitude: string;
    longitude: string;
};


const addressSchema = new Schema<IRegularAddress>({
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    buildingNumber: {
        type: Number,
        required: true
    },
    apartmentNumber: {
        type: Number,
    },
    postalCode: {
        type: Number,
    },
    coordinates: {
        latitude: {
            type: String
        },
        longitude: {
        type : String
        }}
})

const orderSchema = new Schema<IOrder>({
    shippingAddress: addressSchema,
    shippingDate: {
        type: Date,
        default: new Date()
    },
    weight: {
        type : Number,
        required: true
    }},
    {
        timestamps: true,
        collection: 'Orders'
    })


export default mongoose.model<IOrder>('Order', orderSchema);
