import { toast } from "react-hot-toast"

import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { settingsEndpoints } from "../apis"
import { logout } from "./authAPI"

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints



// ================ update User Profile Image  ================
// ================ update User Profile Image  ================
export function updateUserProfileImage(token, formData) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...");
  
      try {
        const response = await apiConnector(
          "PUT",
          UPDATE_DISPLAY_PICTURE_API,
          formData,
          {
            "Content-Type": "multipart/form-data",  // Required for file uploads
            Authorization: `Bearer ${token}`,
          }
        );
        console.log("UPDATE_DISPLAY_PICTURE_API API RESPONSE............", response);
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
  
        // Success
        toast.success("Display Picture Updated Successfully");
        dispatch(setUser(response.data.data));
  
        // Update localStorage to ensure the new profile image is persisted
        localStorage.setItem("user", JSON.stringify(response.data.data));
      } catch (error) {
        console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error.response || error);
        toast.error(error.response?.data?.message || "Could Not Update Profile Picture");
      } finally {
        toast.dismiss(toastId);  // Dismiss the loading toast, regardless of success or error
      }
    };
  }
  
  // ================ update Profile  ================
  export function updateProfile(token, formData) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...");
  
      try {
        const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
          Authorization: `Bearer ${token}`,
        });
        console.log("UPDATE_PROFILE_API API RESPONSE............", response);
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
  
        const userImage = response.data?.updatedUserDetails?.image
          ? response.data.updatedUserDetails.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`;
  
        // Dispatch updated user data
        dispatch(setUser({ ...response.data.updatedUserDetails, image: userImage }));
  
        // Update localStorage to ensure the new profile data is persisted
        localStorage.setItem("user", JSON.stringify({ ...response.data.updatedUserDetails, image: userImage }));
        toast.success("Profile Updated Successfully");
      } catch (error) {
        console.log("UPDATE_PROFILE_API API ERROR............", error);
        toast.error(error.response?.data?.message || "Could Not Update Profile");
      } finally {
        toast.dismiss(toastId);  // Dismiss the loading toast, regardless of success or error
      }
    };
  }
  


// ================ change Password  ================
export async function changePassword(token, formData) {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CHANGE_PASSWORD_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Password Changed Successfully")
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
}

// ================ delete Profile ================
export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Successfully")
      dispatch(logout(navigate))
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Delete Profile")
    }
    toast.dismiss(toastId)
  }
}