import {EaComponentTypes} from "../types";
import {eaHttpClientAdapter} from "../clients";

export const getComponentDetails = async (componentType: EaComponentTypes) => {
    return eaHttpClientAdapter.getComponentDetails(componentType);
}