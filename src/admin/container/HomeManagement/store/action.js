import { CHANGE_SCHEMA, ADD_PAGECHILDREN, CHANGE_PAGE_CHILD, DELETE_PAGE_CHILD, CHANGE_ITEMLOCATION } from './constant';
export const getChangeSchemaAction = (schema) => {
    return {
        type: CHANGE_SCHEMA,
        value: schema
    }
};

export const getAddPagechildrenAction = () => {
    return {
        type: ADD_PAGECHILDREN,
        value: {}
    }
}

export const getChangePageChild = (temp, index) => {
    return {
        type: CHANGE_PAGE_CHILD,
        value: temp,
        index
    }
}

export const getDeletePageChild = (index) => {
    return {
        type: DELETE_PAGE_CHILD,
        index
    }
}

export const getItemLocationChange = (oldIndex, newIndex) => {
    return {
        type: CHANGE_ITEMLOCATION,
        oldIndex,
        newIndex
    }
}