import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  productName: Yup.string().max(80, "Extended Product Name Limit").required("Product Name is required"),
  sellerName: Yup.string().max(40, "Extended Seller Name Limit").required("Seller Name is required"),
  price: Yup.number().transform((value, originalValue) => originalValue === "" ? null : value).required("Price is required"),
  image: Yup.mixed().required("Image is required"),
  documentId: Yup.string().matches(/^[a-zA-Z0-9]+$/, { message: "Document ID must contain only alphanumeric characters" }).required("Document ID is required"),
  wvmOption: Yup.string().required("WVM Option is required"),
  wvmId: Yup.string().matches(/^[a-zA-Z0-9]+$/, { message: "WVM ID must contain only alphanumeric characters" }).required("WVM ID is required"),
  elementId: Yup.string().matches(/^[a-zA-Z0-9]+$/, { message: "Element ID must contain only alphanumeric characters" }).required("Element ID is required")
});

export default validationSchema;
