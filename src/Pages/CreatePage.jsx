import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { downloadCreateImage } from "../utils";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../Components";
import { useSpeechRecognition } from 'react-speech-kit';
import { FiMic } from "react-icons/fi";

const CreatePage = () => {
  // Create an variable to use useNavigate from react-router-dom
  const navigate = useNavigate();
  // Declare the useState initially
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  // function for generate the image-
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('https://backend-surge-ai-ea020498fad1.herokuapp.com/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        })

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` })
      } catch (error) {
        alert(error)
      }
      finally {
        setGeneratingImg(false)
      }
    } else {
      alert('Please enter the prompt')
    }
  }

  // function for handling the submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('https://backend-surge-ai-ea020498fad1.herokuapp.com/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form)
        })
        await response.json();
        navigate('/')
      } catch (error) {
        alert(error)
      }
      finally {
        setLoading(false)
      }
    } else {
      alert('Please enter a prompt and generate an image')
    }
  }

  // create a function for handling the on Change in input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Create Speech Function
  const { listen, stop } = useSpeechRecognition({
    onResult: (result) => {
      setForm({ ...form, prompt: result })
    },
  });



  // create a function for handling the Suprise me button

  const handleSupriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt })
  }
  return (
    <>
      <section className="max-w-7xl mx-auto">
        <div>
          <h1 className='font-extrabold text-[#222328] text-[32px]'>Create</h1>
          <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>Create imaginative and visually stunnig images through DALL-E-AI and share them with community</p>
        </div>
        <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <FormField
              labelName="Your name"
              type="text"
              name='name'
              placeholder="e.g, Joe Doe"
              value={form.name}
              handleChange={handleChange}
              display='hidden'
            />
            <FormField
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder="e.g. A Space Shuttle flying above Cape Town, digital art"
              value={form.prompt}
              handleChange={handleChange}
              isSupriseMe
              handleSupriseMe={handleSupriseMe}
            />
            <button className="mx-6 w-8 relative bottom-14 -right-[43rem] active:animate-pulse active:text-red-700 md:text-xl" onMouseDown={listen} onMouseUp={stop}>
              <FiMic />
            </button>

            <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
              {form.photo ? (
                <div>
                  <img src={form.photo} alt={form.prompt}
                    className='w-full h-full object-contain' />
                  {!generatingImg && <button type='button' className="outline-none bg-blue-800 absolute top-[13rem] left-[13.5rem] text-white p-3 rounded-lg border-none" onClick={() => downloadCreateImage(form.photo)}>
                    <i className="fa-solid fa-arrow-down active:text-fuchsia-900 hover:animate-pulse"></i>
                  </button>}
                </div>
              ) : (
                <img src={preview} alt="preview" className='w-9/12 h-9/12 object-contain opacity-40 ' />
              )}
              {generatingImg && (
                <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                  <Loader />
                </div>
              )}
            </div>
          </div>
          <div className="mt-5 flex gap-5">
            <button type='button' onClick={generateImage} className='bg-green-700 font-medium rounded-md  text-sm w-full sm:w-auto px-5 py-2.5 text-center text-white active:bg-green-800'>
              {generatingImg ? 'Generating...' : 'Generate'}
            </button>
          </div>
          <div className="mt-10">
            <p className='mt-2 text-[#666e75] text-[14px]'>Once you have created the image you can share it with others in the Community</p>
          </div>
          <button type='submit' className='mt-3 text-white bg-[#4649ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </form>
      </section>
    </>
  )
}

export default CreatePage