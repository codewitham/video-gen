"use client"
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Hourglass } from 'react-loader-spinner'
import * as yup from "yup"
const VideoGen = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [videoUrl, setVideoUrl] = useState<string>("")

    const validationSchema = yup.object().shape({
        prompt: yup.string().required("prompt is required"),
        token: yup.string().required("token is required")
    })

    const formik = useFormik({
        initialValues: {
            prompt: "",
            token: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            const res = await axios.post("/api/video-gen", values);
            console.log(res);
            const url = res.data.output[0]
            setVideoUrl(url)
            setLoading(false)
        }
    })

    return (
        <div className=' rounded-md shadow-xl p-5 max-w-lg w-full'>
            <div>
                <h3 className=' text-2xl font-bold'>Video Generation</h3>
                <p className=' text-slate-500 text-sm mt-2'>Generate next level video with prompt.</p>
            </div>
            <div className='h-[300px] w-full rounded-md border-2 border-dashed my-5 flex flex-col items-center justify-center'>
                {loading ?

                    <Hourglass
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="hourglass-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        colors={['#306cce', '#72a1ed']}
                    />
                    :
                    videoUrl ?
                        (
                            <video width={"100%"} controls>
                                <source src={videoUrl} type='video/mp4' />
                            </video>
                        )
                        :
                        (
                            <div>No video</div>
                        )
                }
            </div>
            <form className=' flex flex-col gap-5' onSubmit={formik.handleSubmit}>
                <input
                    type="text"
                    name="prompt"
                    placeholder='enter prompt here...'
                    className='p-2 rounded-md border outline-none text-sm'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.prompt}
                />
                {formik.touched.prompt && formik.errors.prompt && (
                    <div className=' text-red-500 text-sm'>{formik.errors.prompt}</div>
                )}
                <input
                    type="password"
                    name="token"
                    placeholder='enter token here...'
                    className='p-2 rounded-md border outline-none text-sm'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.token}
                />
                {formik.touched.token && formik.errors.token && (
                    <div className=' text-red-500 text-sm'>{formik.errors.token}</div>
                )}
                <button type='submit' className=' text-white bg-slate-800 hover:bg-slate-600 p-2 rounded-md'>generate</button>
            </form>
        </div>
    )
}


export default VideoGen