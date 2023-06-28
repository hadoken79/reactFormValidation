import { z } from "zod";
import { maxTextErr50, negNumErr, regJsonUrlErr, reqAgeErr, reqNameErr } from "../utils/errorMsgStore";
import { httpsJsonReg } from "../utils/regexStore";

export const schema = z.object({
    name: z.string().min(1, { message: reqNameErr }).max(50, { message: maxTextErr50 }).regex(new RegExp(httpsJsonReg), { message: regJsonUrlErr }),
    age: z.number({ invalid_type_error: reqAgeErr }).nonnegative({ message: negNumErr }),
    terms: z.boolean(), //.refine((x) => x === true, { message: reqTermsErr }), //mandatory
    something: z.boolean(),
  });