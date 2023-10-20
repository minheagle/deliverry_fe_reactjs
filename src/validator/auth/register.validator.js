import * as Yup from "yup";

const registerValidatorSchema = Yup.object().shape({
  userName: Yup.string()
    .required("Required")
    .min(2, "Min 2 character")
    .max(255, "Max 255 character"),
  fullName: Yup.string()
    .required("Required")
    .min(2, "Min 2 character")
    .max(255, "Max 255 character"),
  phone: Yup.string()
    .required("Required")
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Phone is invalid"),
  email: Yup.string()
    .email("Email is invalid")
    .required("Required")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Email is invalid"
    ),
  password: Yup.string()
    .required("Required")
    .min(8, "Min 8 character")
    .max(32, "Max 32  character"),
  rePassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Not match"),
});

export default registerValidatorSchema;
