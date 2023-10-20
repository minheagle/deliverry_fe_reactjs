import * as Yup from "yup";

const loginValidatorSchema = Yup.object().shape({
  account: Yup.string().required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Min 8 character")
    .max(32, "Max 32  character"),
});

export default loginValidatorSchema;
