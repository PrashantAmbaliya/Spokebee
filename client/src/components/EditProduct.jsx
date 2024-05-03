import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import validationSchema from '../schema/validationSchema';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Slide from '@mui/material/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const EditProduct = ({ product, open, onClose, userToken, Refresh }) => {
    const { handleSubmit, register, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    useEffect(() => {
        if (product) {
            Object.keys(product).forEach(key => setValue(key, product[key]));
        }
    }, [product, setValue]);

    const onFormSubmit = async (data) => {
        try {
            await axios.patch(`${import.meta.env.VITE_SERVER_URL}/products/edit`, data, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            onClose();
            Refresh();
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
        <Dialog open={open} onClose={onClose} TransitionComponent={Transition} aria-describedby="alert-dialog-slide-description">
            <DialogTitle>Edit Product</DialogTitle>
            <DialogContent>

                    <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-wrap w-full gap-3">
                        <div className="flex gap-4 w-full">
                            <div className="flex flex-wrap w-full  mb-1">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="productName">
                                    Product Name
                                </label>
                                <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 mb-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-600`} id="productName" type="text" placeholder="Enter Product Name" {...register("name")} />
                                {errors.productName && (
                                    <span className="text-xs text-red-600 font-light italic">
                                        {errors.productName.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-wrap w-full mb-1">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="sellerName">
                                    Seller Name
                                </label>
                                <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 mb-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-600`} id="sellerName" type="text" placeholder="Enter Seller Name" {...register("sellerName")} />
                                {errors.sellerName && (
                                    <span className="text-xs text-red-600 font-light italic">
                                        {errors.sellerName.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-4 w-full">
                            <div className="flex flex-wrap w-full mb-1">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="price">
                                    Price
                                </label>
                                <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 mb-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-600`} id="price" type="number" placeholder="Enter Price" {...register("price")} />
                                {errors.price && (
                                    <span className="text-xs text-red-600 font-light italic">
                                        {errors.price.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-wrap w-full mb-1">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="image">
                                    Image
                                </label>
                                <input className={`block w-full text-sm text-gray-900 border border-gray-200 py-3 mb-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-600 rounded-lg cursor-pointer bg-gray-50 `} id="image" type="file" accept=".jpeg, .jpg, .png" placeholder="Select Image" onChange={handleImageChange} />
                                {errors.image && (
                                    <span className="text-xs text-red-600 font-light italic">
                                        {errors.image.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap w-full mb-1">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="documentId">
                                Document ID
                            </label>
                            <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 mb-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-600`} id="documentId" type="text" placeholder="Enter Document ID" {...register("documentId")} />
                            {errors.documentId && (
                                <span className="text-xs text-red-600 font-light italic">
                                    {errors.documentId.message}
                                </span>
                            )}
                        </div>

                        <div className="flex gap-4 w-full">
                            <div className="flex flex-wrap w-full mb-1">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="wvmOption">
                                    WVM Option
                                </label>
                                <select className={`block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 pr-8 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-blue-600`} id="wvmOption" {...register("wvmOption")}>
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
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="wvmId">
                                    WVM ID
                                </label>
                                <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 mb-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-600`} id="wvmId" type="text" placeholder="Enter WVM ID" {...register("wvmId")} />
                                {errors.wvmId && (
                                    <span className="text-xs text-red-600 font-light italic">
                                        {errors.wvmId.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap w-full mb-1">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="elementId">
                                Element ID
                            </label>
                            <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 mb-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-600`} id="elementId" type="text" placeholder="Enter Element ID" {...register("elementId")} />
                            {errors.elementId && (
                                <span className="text-xs text-red-600 font-light italic">
                                    {errors.elementId.message}
                                </span>
                            )}
                        </div>

                        <div className="w-full mb-6 md:mb-0">
                            <button className="relative block text-white appearance-none w-full bg-blue-600 hover:bg-blue-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
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

export default EditProduct;
