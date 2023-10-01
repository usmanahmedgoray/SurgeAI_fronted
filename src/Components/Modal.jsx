import React from "react";
import { BiWindowClose } from "react-icons/bi";

export default function Modal({selectedFile,handleFileUpload,handleModal}) {

    // handle Close Moal Button
  const handleCloseBtn = () =>{
    // setShowModal(false)
    handleModal()
    
  }
// handle upload Button
  const handleUploadBtn =()=>{
    handleFileUpload();
    handleModal()
  }
  
  return (
    <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Preview
                  </h3>
                  <span onClick={handleCloseBtn} className="cursor-pointer">
                  <BiWindowClose className="text-3xl hover:animate-pulse text-red-600"/>
                  </span>
                  
                </div>
                {/*body*/}
                <img height={386} width={386} className='rounded-lg m-4' src={URL.createObjectURL(selectedFile)} alt="" />
                <div className='w-[386px] flex justify-center'>
                <button className='bg-blue-800 font-inter text-white p-3 rounded-lg my-4 text-xl' onClick={handleUploadBtn}>Upload</button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
  );
}