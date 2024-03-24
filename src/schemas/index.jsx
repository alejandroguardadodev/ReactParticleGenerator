import * as yup from "yup"

export const SpriteSheetSchema = yup.object({
    numberOfFrames: yup.number().typeError('Only numbers').positive().min(1, "Must be more than zero").required(),
    framesPerRows: yup.number().typeError('Only numbers').positive().min(1, "Must be more than zero").required(),
    boxHeight: yup.number().typeError('Only numbers').positive().min(1, "Must be more than zero").required(),
    boxWidth: yup.number().typeError('Only numbers').positive().min(1, "Must be more than zero").required(),
    columns: yup.number().typeError('Only numbers').positive().min(1, "Must be more than zero").required(),
    rows: yup.number().typeError('Only numbers').positive().min(1, "Must be more than zero").required(),
    offsetRows: yup.number().typeError('Only numbers').positive().min(0, "Must be more than zero").required(),
    offsetColumns: yup.number().typeError('Only numbers').positive().min(0, "Must be more than zero").required(),
}).required();