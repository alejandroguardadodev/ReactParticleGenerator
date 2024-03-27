import { useSelector, useDispatch } from 'react-redux'

import {
    setItemsByTag,
    setActiveIdByTag,
} from '../actions/ItemsSortableAction'

const useItemsSortable = (tag) => {

    const dispatch = useDispatch()

    const { [tag] : data } = useSelector(state => state.sortabledItem)

    const setItems = _items => { dispatch(setItemsByTag(tag, _items)) }
    const actionSetActiveId = id => dispatch(setActiveIdByTag(tag, id))

    const findIndexByItemId = id => {
        const { items } = data
        let index = -1;
    
        items.find(function(item, i){
          if(item.id === id) {
            index = i
            return i
          }
        });
    
        return index
    }

    return {
        ...data,
        setItems,
        findIndexByItemId,
        setActiveItemId: actionSetActiveId
    }
}

export default useItemsSortable