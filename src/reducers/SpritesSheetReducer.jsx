const initialState = {
    sprites: [
        {
            id: 1,
            img: ""
        },{
            id: 2,
            img: ""
        },{
            id: 3,
            img: ""
        },
    ]
}

export default function(state = initialState, action) {
    const { type } = action

    switch(type) {

        default:
            return state
    }
}