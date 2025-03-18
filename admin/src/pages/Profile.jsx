

import React, { useContext, useEffect, useRef ,useState} from 'react'
import { StoreContext } from '../context/store'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getStorage ,ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"
import { app } from '../firebase'
import { deleteUserFailure, deleteUserSuccess, signOutSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice'
import axios from 'axios'
import { toast } from 'sonner'
import { Alert } from 'flowbite-react';
import { IoMdEyeOff } from 'react-icons/io'
import { IoEye } from 'react-icons/io5'
import Loading from '../components/Loading';
import Delete from '../components/Delete';



export default function Profile() {

    const {url ,token , openDelete, setOpenDelete} = useContext(StoreContext)

    const {loading ,error ,currentUser} = useSelector(state => state.user)

    const [formData , setFormData] = useState({})

    const [imageFile ,setImageFile] = useState(null)

    const [imageFileUrl ,setImageFileUrl] = useState(null)

    const [imageFileUploading ,setImageFileUploading] = useState(false)

    const [imageFileUploadProgress ,setImageFileUploadProgress] = useState(null)

    const [imageFileUploadError ,setImageFileUploadError] = useState(null)

    const filePickeRef = useRef()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [showPassword , setShowPassword] = useState(false)


    // handleImageChange
    const handleImageChange = (e) => {

        const file = e.target.files[0]

        if(file)
        {
            setImageFile(file)

            setImageFileUrl(URL.createObjectURL(file))
        }
    }

    // uploadImage
    const uploadImage = () => {

        setImageFileUploadError(null)

        setImageFileUploading(true)

        const storage = getStorage(app)

        const fileName = new Date().getTime() + imageFile.name 

        const storageRef = ref(storage ,fileName)

        const uploadTask = uploadBytesResumable(storageRef , imageFile)

        uploadTask.on(
            'state_changed',
            (snapshot) => {

                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

                setImageFileUploadProgress(progress.toFixed(0))
            },
            (error) => {

                setImageFileUploadProgress(null)

                setImageFileUploadError("could not upload image")

                setImageFileUploading(false)

                setImageFile(null)

                setImageFileUrl(null)

                console.log(error)

            },
            () => {

                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                    setImageFileUrl(downloadURL)

                    setFormData({...formData ,profilePicture:downloadURL})

                    setImageFileUploading(false)
                })
            }
        )
    }


    useEffect(() => {

        if(imageFile)
        {
            uploadImage()
        }

    },[imageFile])

    // handleChange
    const handleChange = (e) => {

        setFormData({...formData , [e.target.name]:e.target.value})

    }

    // handleSubmit
    const handleSubmit = async (e) => {

        e.preventDefault()

        if(Object.keys(formData).length === 0)
        {
            dispatch(updateUserFailure("No Changes made"))

            return 
        }

        if(imageFileUploading)
        {
            dispatch(updateUserFailure("Please wait for the image to finish upload"))

            return
        }

        try
        {
            dispatch(updateUserStart())

            const res = await axios.put(url + `/api/user/update-user/${currentUser._id}`,formData,{headers:{token}})

            if(res.data.success)
            {
                dispatch(updateUserSuccess(res.data.rest))

                toast.success("profile updated successfully")
            }

        }
        catch(error)
        {
            if(error.response)
            {
                const errorMessage = error.response.data.message 

                dispatch(updateUserFailure(errorMessage))

            }
            else
            {
                dispatch(updateUserFailure(error.message))
            }

        }

    }

    // handleDelete
    const handleDelete = async () => {

        try
        {
            setOpenDelete(true)

            const res = await axios.delete(url + `/api/user/delete-user/${currentUser._id}`)

            if(res.data.success)
            {
                navigate('/sign-in')

                toast.error("account delete successfully")

                dispatch(deleteUserSuccess())

            }
            
        }
        catch(error)
        {
            if(error.response)
            {
                const errorMessage = error.response.data.message 

                dispatch(deleteUserFailure(errorMessage))
            }
            else
            {
                dispatch(deleteUserFailure(error.message))
            }
        }

    }

    // handleSignOut
    const handleSignOut = () => {

        dispatch(signOutSuccess())

        navigate('/sign-in')

        localStorage.removeItem("token")

    }

  return (
    <>

        <div className="section space-y-10">

            <h2 className="title2 text-center">Profile</h2>
            
            {/* form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 max-w-xl mx-auto">

                <input 
                    type="file" 
                    onChange={handleImageChange}
                    accept="image/*" 
                    ref={filePickeRef}
                    hidden
                />

                {/* image */}
                <div 
                    className="relative h-32 w-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
                    onClick={() => filePickeRef.current.click()}
                >

                    {imageFileUploadProgress && (

                        <CircularProgressbar 
                            value={imageFileUploadProgress || 0}
                            text={`${imageFileUploadProgress}%`}
                            strokeWidth={5}
                            styles={{
                                root:{
                                    width:'100%',
                                    height:"100%",
                                    position:'absolute',
                                    top:0,
                                    left:0
                                },
                                path:{
                                    stroke:`rgba(62 ,152 ,199, ${imageFileUploadProgress})`
                                }
                            }}
                        />

                    )}

                    <img 
                        src={imageFileUrl || currentUser?.profilePicture}
                        alt="user" 
                        className={`rounded-full w-full h-full object-cover border-8 
                            ${imageFileUploadProgress && imageFileUploadProgress < 100 && `opacity-${imageFileUploadProgress}`}`}
                    />

                </div>

                {imageFileUploadError && (

                    <Alert color="failure">{imageFileUploadError}</Alert>

                )}

                {/* email */}
                <input 
                    type="email" 
                    name="email"
                    placeholder="name@example.com"
                    onChange={handleChange}
                    defaultValue={currentUser?.email}
                    className="input"
                />

                {/* username */}
                <input 
                    type="text" 
                    name="password"
                    placeholder="username"
                    onChange={handleChange}
                    defaultValue={currentUser?.username}
                    className="input"
                />

                {/* password */}
                <div className="w-full relative">

                    <input 
                        type={showPassword ? "text" :"password"}
                        name="password"
                        placeholder="**********"
                        onChange={handleChange}
                        className="input w-full" 
                    />

                    <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        {showPassword ? 
                            (
                                <IoMdEyeOff size={20}/>
                            ) 
                            : 
                            (
                                <IoEye size={20} />
                            )
                        }
                    </button>

                </div>

                <button 
                    className="button"
                    type="submit"
                    disabled={loading || imageFileUploading}
                >
                    {loading 
                        ? 
                        <Loading />
                        :
                        ("update user")
                    }
                </button>

                {/* delete && signout */}
                <div className="flex items-center justify-between cursor-pointer text-sm font-semibold">
                    
                    {/* delete */}
                    <span 
                        className="text-red-500 hover:underline"
                        onClick={() => handleDelete()}
                    >
                        Delete Account
                    </span>

                    {/* sign out */}
                    <span 
                        className="text-red-500 hover:underline"
                        onClick={() => handleSignOut()}
                    >
                        sign out
                    </span>

                </div>

                {error && (

                    <Alert color="failure">{error}</Alert>

                )}

            </form>


        </div>

        {openDelete && (

            <Delete product={"user"} item={currentUser?.username} handleDelete={handleDelete} />

        )}

    </>

  )

}
