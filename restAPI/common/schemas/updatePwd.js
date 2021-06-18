import Joi from "joi";

export const updatePwdSchema = Joi.object({
  oldPwd: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  newPwd: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .not(Joi.ref("oldPwd"))
    .required(),
});

export default updatePwdSchema;
