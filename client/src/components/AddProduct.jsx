import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios'
import { toast } from 'react-hot-toast';
import validationSchema from '../schema/validationSchema'
import { useEffect, useState } from "react";

const AddProduct = () => {
  const [loading, setLoading] = useState(false)
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema)
  });
  // const [userRole, setUserRole] = useState('');
  const [userToken, setUserToken] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      // setUserRole(parsedUserData.role);
      setUserToken(parsedUserData.token);
    }

  }, []);

  const onSubmit = async (data) => {

    console.log(import.meta.env.VITE_SERVER_URL)
    try {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/products/addProduct`, data, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });
      console.log('Form submitted successfully:', response.data);
      toast.success(response?.data?.message);
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }

  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const fileName = file.name;
    const fileExtension = fileName.split('.')[1].toLowerCase();
    const base64Image = await convertImageToBase64(file);
    const imageObject = {
      name: file.name,
      extension: fileExtension,
      data: base64Image,
    };
    setValue('image', imageObject);
  };

  return (
    <main className="flex items-center justify-center min-h-[80vh] bg-white border rounded-md shadow p-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap w-full gap-3"
      >

        {/* Product Name */}
        <div className="flex gap-4 w-full">
          <div className="flex flex-wrap w-full  mb-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="productName"
            >
              Product Name
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 mb-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-600`}
              id="productName"
              type="text"
              placeholder="Enter Product Name"
              {...register("productName")}
            />
            {errors.productName && (
              <span className="text-xs text-red-600 font-light italic">
                {errors.productName.message}
              </span>
            )}
          </div>

          {/* Seller Name */}
          <div className="flex flex-wrap w-full mb-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="sellerName"
            >
              Seller Name
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 mb-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-600`}
              id="sellerName"
              type="text"
              placeholder="Enter Seller Name"
              {...register("sellerName")}
            />
            {errors.sellerName && (
              <span className="text-xs text-red-600 font-light italic">
                {errors.sellerName.message}
              </span>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="flex gap-4 w-full">
          <div className="flex flex-wrap w-full mb-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 mb-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-600`}
              id="price"
              type="number"
              placeholder="Enter Price"
              {...register("price")}
            />
            {errors.price && (
              <span className="text-xs text-red-600 font-light italic">
                {errors.price.message}
              </span>
            )}
          </div>

          {/* Image */}
          <div className="flex flex-wrap w-full mb-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="image"
            >
              Image
            </label>
            <input
              className={`block w-full text-sm text-gray-900 border border-gray-200 py-3 mb-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-600 rounded-lg cursor-pointer bg-gray-50 `}
              id="image"
              type="file"
              accept=".jpeg, .jpg, .png"
              placeholder="Select Image"
              onChange={handleImageChange}
            />
            {errors.image && (
              <span className="text-xs text-red-600 font-light italic">
                {errors.image.message}
              </span>
            )}
          </div>
        </div>

        {/* Document ID */}
        <div className="flex flex-wrap w-full mb-1">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="documentId"
          >
            Document ID
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 mb-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-600`}
            id="documentId"
            type="text"
            placeholder="Enter Document ID"
            {...register("documentId")}
          />
          {errors.documentId && (
            <span className="text-xs text-red-600 font-light italic">
              {errors.documentId.message}
            </span>
          )}
        </div>

        {/* WVM Option and WVM ID */}
        <div className="flex gap-4 w-full">
          <div className="flex flex-wrap w-full mb-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="wvmOption"
            >
              WVM Option
            </label>
            <select
              className={`block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 pr-8 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-blue-600`}
              id="wvmOption"
              {...register("wvmOption")}
            >
              <option value="">Select WVM Option</option>
              <option value="w">w</option>
              <option value="v">v</option>
              <option value="m">m</option>
            </select>
            {errors.wvmOption && (
              <span className="text-xs text-red-600 font-light italic">
                {errors.wvmOption.message}
              </span>
            )}
          </div>

          <div className="flex flex-wrap w-full mb-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="wvmId"
            >
              WVM ID
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 mb-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-600`}
              id="wvmId"
              type="text"
              placeholder="Enter WVM ID"
              {...register("wvmId")}
            />
            {errors.wvmId && (
              <span className="text-xs text-red-600 font-light italic">
                {errors.wvmId.message}
              </span>
            )}
          </div>
        </div>

        {/* Element ID */}
        <div className="flex flex-wrap w-full mb-1">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="elementId"
          >
            Element ID
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 mb-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-600`}
            id="elementId"
            type="text"
            placeholder="Enter Element ID"
            {...register("elementId")}
          />
          {errors.elementId && (
            <span className="text-xs text-red-600 font-light italic">
              {errors.elementId.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <div className="w-full mb-6 md:mb-0">
          <button
            disabled={loading}
            className="relative block text-white appearance-none w-full bg-blue-600 hover:bg-blue-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </main>
  );
};

const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export default AddProduct;
