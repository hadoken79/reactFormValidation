import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import checkboxesNotAllUnused from "../utils/checkBoxValidator";
import { schema } from "../schemas/formSchema";

type FormData = z.infer<typeof schema>;

const Form = () => {
  const [checkboxErrorMessage, setCheckboxErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    const result = checkboxesNotAllUnused.safeParse(data);

    if (result.success) {
      // Valid form data, continue with form submission
      console.log(data);
      setCheckboxErrorMessage("");
    } else {
      // Invalid form data, handle the validation errors
      const errorMessage = result.error.errors[0]?.message || "Validation failed";
      console.log("Validation failed: ", errorMessage);
      setCheckboxErrorMessage(errorMessage);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input {...register("name")} className="input" type="text" placeholder="Text input" />
            {errors.name && <p className="has-text-danger">{errors.name.message}</p>}
          </div>
        </div>
        <div className="field">
          <label className="label">Age</label>
          <div className="control">
            <input {...register("age", { valueAsNumber: true })} className="input" type="number" placeholder="Age input" />
            {errors.age && <p className="has-text-danger">{errors.age.message}</p>}
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input {...register("terms")} type="checkbox" /> I agree to the <a href="#">terms and conditions</a>
              {errors.terms && <p className="has-text-danger">{errors.terms.message}</p>}
            </label>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input {...register("something")} type="checkbox" /> I agree to <a href="#">something else</a>
            </label>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button type="submit" className="button is-link">
              Submit
            </button>
            {checkboxErrorMessage && <p className="has-text-danger">{checkboxErrorMessage}</p>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
