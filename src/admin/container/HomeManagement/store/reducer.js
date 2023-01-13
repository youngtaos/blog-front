import { original, produce } from 'immer';
import { CHANGE_SCHEMA, ADD_PAGECHILDREN, CHANGE_PAGE_CHILD, DELETE_PAGE_CHILD, CHANGE_ITEMLOCATION } from './constant';

const initialSchema = { "name": "page", "attributes": {}, "children": [{ "name": "Banner", "attributes": {}, "children": [] }, { "name": "Article", "attributes": {}, "children": [] }, { "name": "Footer", "attributes": {}, "children": [] }] }
    ;

const defaultState = {
    schema: initialSchema
}

const reducer = (state = defaultState, action) => produce(state, (draft) => {
    switch (action.type) {
        case CHANGE_SCHEMA:
            draft.schema = action.value;
            break;
        case ADD_PAGECHILDREN:
            draft.schema.children.push(action.value);
            break;
        case CHANGE_PAGE_CHILD:
            draft.schema.children.splice(action.index, 1, action.value);
            break;
        case DELETE_PAGE_CHILD:
            draft.schema.children.splice(action.index, 1);
            break;
        case CHANGE_ITEMLOCATION:
            const copy = original(draft.schema.children);
            draft.schema.children.splice(action.oldIndex, 1);
            const deleteItem = copy[action.oldIndex];
            draft.schema.children.splice(action.newIndex, 0, deleteItem);
            break;
        default:
            break;
    }
});

export default reducer;