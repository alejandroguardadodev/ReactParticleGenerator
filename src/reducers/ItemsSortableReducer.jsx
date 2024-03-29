import {
    SET_SORTABLE_ITEM,
    SET_ACTIVE_SORTABLE_ITEM_ID
} from '../types/ItemsSortableTypes'

const defaultItemInformation = {
    activeId: null,
    activeItem: null,
    items: []
}

const initialState = {
    'SpritesSheet': {...defaultItemInformation}
}

export default function(state = initialState, action) {
    const { type } = action

    switch(type) {
        case SET_SORTABLE_ITEM:
            const { tag: newItemsTag, items: newItems } = action.payload

            return {
                ...state,
                [newItemsTag]: {
                    ...state[newItemsTag],
                    items: newItems,
                }
            }

        case SET_ACTIVE_SORTABLE_ITEM_ID:
            const { tag, activeId } = action.payload

            return {
                ...state,
                [tag]: {
                    ...state[tag],
                    activeId: activeId
                }
            }

        default:
            return state
    }
}