import React from "react";
const FormField = (props) => {
  const {
    labelName,
    type,
    name,
    placeholder,
    handleChange,
    isSupriseMe,
    handleSupriseMe,
    value,
    display,
  } = props;


  return (
    <>
      <div className="flex items-center gap-4 mb-2">
        <label
          htmlFor="name"
          className="block text-sm text-gray-900 font-bold"
        >
          {labelName}
        </label>
        <button type="button" onClick={handleSupriseMe} className={`font-semibold text-xs bg-[#ECECF1] active:bg-[#d1d1da] py-1 px-2 rounded-[5px] text-black mx-5 ${display}`}>
          Suprise me   
        </button>
      </div>
      <input type={type} id={name} name={name} placeholder={placeholder} value={value} onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-fulll p-3"/>
      
      
    </>
  );
};

export default FormField;
