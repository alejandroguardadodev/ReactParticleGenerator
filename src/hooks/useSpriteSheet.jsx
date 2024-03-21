import { useSelector, useDispatch } from 'react-redux'

const useSpriteSheet = () => {
    const dispatch = useDispatch()

    const { sprites } = useSelector(state => state.spriteSheets)
    
    return {
        sprites
    }
}

export default useSpriteSheet