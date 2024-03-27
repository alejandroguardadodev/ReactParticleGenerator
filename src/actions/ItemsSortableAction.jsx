import {
    SET_SORTABLE_ITEM,
    SET_ACTIVE_SORTABLE_ITEM_ID
} from '../types/ItemsSortableTypes'

export function setItemsByTag(tag, items) {
    return async (dispatch) => dispatch({
        type: SET_SORTABLE_ITEM,
        payload: {
            tag: tag,
            items: items
        }
    })
}

export function setActiveIdByTag(tag, id) {
    return async (dispatch) => dispatch({
        type: SET_ACTIVE_SORTABLE_ITEM_ID,
        payload: {
            tag: tag,
            activeId: id
        }
    })
}