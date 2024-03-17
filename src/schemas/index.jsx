import * as yup from "yup"

export const SpriteSheetSchema = yup.object({
    numberOfFrames: yup.number().typeError('Number Of Frames must be a number').positive().min(0, "Number Of Frames must be more than zero").required(),
}).required();