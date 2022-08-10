import * as React from 'react';
import { OrderForm } from '../OrderForm/OrderForm';
import { ENTITY_VIEW_STATES } from '../../../common';


export const CreateOrder = () => {
    return <OrderForm state={ENTITY_VIEW_STATES.create} />
}