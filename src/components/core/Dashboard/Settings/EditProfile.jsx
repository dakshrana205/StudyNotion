import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { updateProfile } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { register, handleSubmit, formState: { errors } } = useForm()

  const submitProfileForm = async (data) => {
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* Profile Information */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-6 sm:px-12">
          <h2 className="text-lg font-semibold text-white">
            Profile Information
          </h2>

          {/* First Name & Last Name */}
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" className="block text-sm font-medium  text-white mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter first name"
                className="w-full p-2 rounded-lg border border-gray-600 bg-richblack-700 text-white placeholder-gray-500"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && <p className="text-sm text-yellow-400 mt-1">Please enter your first name.</p>}
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName" className="block text-sm font-medium  text-white mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter last name"
                className="w-full p-2 rounded-lg border border-gray-600 bg-richblack-700 text-white placeholder-gray-500"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && <p className="text-sm text-yellow-400 mt-1">Please enter your last name.</p>}
            </div>
          </div>

          {/* Date of Birth & Gender */}
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dateOfBirth" className="block text-sm font-medium  text-white mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                className="w-full p-2 rounded-lg border border-gray-600 bg-richblack-700 text-white"
                {...register("dateOfBirth", { required: true })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && <p className="text-sm text-yellow-400 mt-1">{errors.dateOfBirth.message}</p>}
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="block text-sm font-medium  text-white mb-1">
                Gender
              </label>
              <select
                id="gender"
                className="w-full p-2 rounded-lg border border-gray-600 bg-richblack-700 text-white"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((gender, index) => (
                  <option key={index} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
              {errors.gender && <p className="text-sm text-yellow-400 mt-1">Please select your gender.</p>}
            </div>
          </div>

          {/* Contact Number & About */}
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber" className="block text-sm font-medium  text-white mb-1">
                Contact Number
              </label>
              <input
                type="tel"
                id="contactNumber"
                placeholder="Enter contact number"
                className="w-full p-2 rounded-lg border border-gray-600 bg-richblack-700 text-white placeholder-gray-500"
                {...register("contactNumber", { required: true })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && <p className="text-sm text-yellow-400 mt-1">{errors.contactNumber.message}</p>}
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="block text-sm font-medium  text-white mb-1">
                About
              </label>
              <input
                type="text"
                id="about"
                placeholder="Enter bio details"
                className="w-full p-2 rounded-lg border border-gray-600 bg-richblack-700 text-white placeholder-gray-500"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && <p className="text-sm text-yellow-400 mt-1">Please enter your About section.</p>}
            </div>
          </div>
        </div>

        {/* Save and Cancel Buttons */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/my-profile")}
            className="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-500"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Save" />
        </div>
      </form>
    </>
  )
}
