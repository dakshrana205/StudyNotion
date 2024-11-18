import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { changePassword } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitPasswordForm = async (data) => {
    console.log("password Data - ", data)
    try {
      await changePassword(token, data)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-6 sm:px-12">
          <h2 className="text-lg font-semibold text-richblack-5">Password</h2>

          {/* Current Password */}
          <div className="relative flex flex-col gap-2">
            <label htmlFor="oldPassword" className="block text-sm font-medium text-white mb-1">
              Current Password
            </label>
            <input
              type={showOldPassword ? "text" : "password"}
              id="oldPassword"
              placeholder="Enter Current Password"
              className="w-full p-2 rounded-lg border border-gray-600 bg-richblack-700 text-white placeholder-gray-500"
              {...register("oldPassword", { required: true })}
            />
            <span
              onClick={() => setShowOldPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showOldPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            {errors.oldPassword && (
              <span className="text-sm text-yellow-100 mt-1">
                Please enter your Current Password.
              </span>
            )}
          </div>

          {/* New Password and Confirm New Password */}
          <div className="flex flex-col gap-5 lg:flex-row">
            {/* New Password */}
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="newPassword" className="block text-sm font-medium text-white mb-1">
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                placeholder="Enter New Password"
                className="w-full p-2 rounded-lg border border-gray-600 bg-richblack-700 text-white placeholder-gray-500"
                {...register("newPassword", { required: true })}
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.newPassword && (
                <span className="text-sm text-yellow-100 mt-1">
                  Please enter your New Password.
                </span>
              )}
            </div>

            {/* Confirm New Password */}
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-white mb-1">
                Confirm New Password
              </label>
              <input
                type={showConfirmNewPassword ? "text" : "password"}
                id="confirmNewPassword"
                placeholder="Confirm New Password"
                className="w-full p-2 rounded-lg border border-gray-600 bg-richblack-700 text-white placeholder-gray-500"
                {...register("confirmNewPassword", { required: true })}
              />
              <span
                onClick={() => setShowConfirmNewPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showConfirmNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.confirmNewPassword && (
                <span className="text-sm text-yellow-100 mt-1">
                  Please confirm your New Password.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/my-profile")}
            className="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-500"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Update" />
        </div>
      </form>
    </>
  )
}
