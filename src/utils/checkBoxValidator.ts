import { schema } from "../schemas/formSchema";
import { reqOneCheckbox } from "./errorMsgStore";

const checkboxesNotAllUnused = schema
.pick({
  terms: true,
  something: true,
})
.refine(
  (data) => {
    const usedCheckboxes = Object.values(data).filter(Boolean);
    return usedCheckboxes.length !== 0;
  },
  {
    message: reqOneCheckbox,
  }
);

export default checkboxesNotAllUnused;