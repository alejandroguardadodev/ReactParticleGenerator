import * as yup from "yup"

export const SpriteSheetSchema = yup.object({
    numberOfFrames: yup.number().typeError('Only numbers').positive().min(0, "Must be more than zero").required(),
    framesPerRows: yup.number().typeError('Only numbers').positive().min(0, "Must be more than zero").required(),
}).required();