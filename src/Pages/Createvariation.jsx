import React, { useState } from 'react'
import { BsUpload } from "react-icons/bs";
import { downloadCreateImage } from '../utils'
import { Modal } from '../Components';
import { Loader } from '../Components';


const Createvariation = () => {
    // Declare the useState hooks
    const [selectedFile, setselectedFile] = useState()
    const [Image, setImage] = useState()
    const [showModal, setShowModal] = useState(false)
    const [Loading, setLoading] = useState(false)

    // Handle the selection of file
    const handleFileChange = (e) => {
        console.log(e.target.files[0]);
        setselectedFile(e.target.files[0])
        setShowModal(true)
    }


    // handle the Uoloadation of the file
    const handleFileUpload = async () => {
        console.log("Uploaded");
        const formData = new FormData();
        formData.append("file", selectedFile)
        setImage()
        setLoading(true)

        try {
            const options = {
                method: "POST",
                body: formData
            }

            const response = await fetch("https://surge-ai-backend-f9adfaf2dbc0.herokuapp.com/api/v1/dalle/variation", options)
            const data = await response.json()
            let ParseImage = `data:image/jpeg;base64,${data}`
            setImage(ParseImage)
            setLoading(false)
            // console.log(data)

        } catch (error) {
            console.error(error)
        }
    }

    // handle the modal setting
    const handleModal = () => {
        setShowModal(false)
    }

    return (
        <section className="md:w-full w-[24rem] mx-auto flex flex-col items-center justify-center">
            <div className='w-[23rem] md:w-[33rem]'>
                <h1 className='font-extrabold text-[#222328] text-[28px] md:text-[32px]'>Image Variation</h1>
                <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px] text-justify'>Create Image variation imaginative and visually stunnig images through DALL-E-AI and share them with community</p>
            </div>
            <div className='border border-blue-800 p-12 w-[22rem] md:w-[30rem] flex justify-center items-center flex-col rounded-lg my-12'>
                <label htmlFor="image" className='flex flex-col items-center cursor-pointer select-none'><BsUpload className='text-2xl' /><p>Upload your Image</p> </label>
                <input type="file" accept="image/*" name="image" id="image" hidden onChange={handleFileChange} />
            </div>



            {Image ? <div>
                <img src={Image} width={400} height={400} className='rounded-lg' alt="the image" />
                <button type='button' className="outline-none bg-blue-800 p-3 rounded-full border-none relative -right-[21rem] -top-16" onClick={() => downloadCreateImage(Image)}>
                    {/* <img src={download} alt="download" className='w-6 h-6 object-contain invert'/> */}
                    <i className="fa-solid fa-arrow-down active:text-fuchsia-900 hover:animate-pulse text-white"></i>
                </button>
            </div> : (Loading && <div className='flex justify-center items-center mt-24'><Loader /></div>)}
            {showModal && <Modal selectedFile={selectedFile} handleFileUpload={handleFileUpload} handleModal={handleModal} />}
        </section>
    )
}

export default Createvariation