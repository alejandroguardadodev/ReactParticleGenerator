import * as yup from "yup"

export const SpriteSheetSchema = yup.object({
    numberOfFrames: yup.number().typeError('Only numbers').positive().min(1, "Must be more than zero").required(),
    framesPerRows: yup.number().typeError('Only numbers').positive().min(1, "Must be more than zero").required(),
    boxHeight: yup.number().typeError('Only numbers').positive().min(1, "Must be more than zero").required(),
    boxWidth: yup.number().typeError('Only numbers').positive().min(1, "Must be more than zero").required(),
}).required();