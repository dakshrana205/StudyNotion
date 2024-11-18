import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSection,
  createSection,
  fetchCourseDetails,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse, setStep } from "../../../../../slices/courseSlice";
import IconBtn from "../../../../common/IconBtn";
import NestedView from "./NestedView";

export default function CourseBuilderForm() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [editingSection, setEditingSection] = useState(null); // Track which section is being edited
  const dispatch = useDispatch();

  // Handle form submission for creating or editing sections
  const onSubmit = async (data) => {
    setLoading(true);

    let newSection;
    if (editingSection) {
      // Edit existing section
      newSection = {
        ...editingSection,
        sectionName: data.sectionName,
      };

      // Update the course content with the modified section
      const updatedCourse = {
        ...course,
        courseContent: course.courseContent.map((section) =>
          section._id === editingSection._id ? newSection : section
        ),
      };
      dispatch(setCourse(updatedCourse));
    } else {
      // Create a new section
      newSection = {
        _id: `temp_${Date.now()}`,
        sectionName: data.sectionName,
        subSection: [],
      };

      // Update UI instantly
      const updatedCourse = {
        ...course,
        courseContent: [...course.courseContent, newSection],
      };
      dispatch(setCourse(updatedCourse));
    }

    try {
      if (!editingSection) {
        // If creating a new section, create it on the backend
        const result = await createSection(
          {
            sectionName: data.sectionName,
            courseId: course._id,
          },
          token
        );

        if (result) {
          const refreshedCourse = await fetchCourseDetails(course._id, token);
          dispatch(setCourse(refreshedCourse)); // Set course with real backend data
          toast.success("Section created successfully!");
        }
      } else {
        toast.success("Section updated successfully!");
      }
    } catch (error) {
      toast.error("An error occurred while saving the section.");
    } finally {
      setLoading(false);
      setEditingSection(null); // Clear editing state
    }

    setValue("sectionName", ""); // Clear input field
  };

  const handleEdit = (section) => {
    setEditingSection(section); // Set the section to be edited
    setValue("sectionName", section.sectionName); // Prefill the input field
  };

  const handleDelete = async (sectionId) => {
    setLoading(true);

    try {
      // Remove the section from the course content
      const updatedCourse = {
        ...course,
        courseContent: course.courseContent.filter((section) => section._id !== sectionId),
      };
      dispatch(setCourse(updatedCourse));

      // Delete the section from the backend (implement this in your API call)
      await deleteSection(sectionId, course._id, token);

      toast.success("Section deleted successfully!");
    } catch (error) {
      toast.error("An error occurred while deleting the section.");
    } finally {
      setLoading(false);
    }
  };

  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add at least one section.");
      return;
    }
    dispatch(setStep(3));
  };

  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="sectionName">
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="sectionName"
            disabled={loading}
            placeholder="Add a section to build your course"
            {...register("sectionName", { required: true })}
            className="p-3 bg-gray-800 text-black border border-gray-600 rounded-lg focus:outline-none focus:ring-2"
          />
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200" role="alert">
              Section name is required
            </span>
          )}
        </div>
        <div className="flex items-end gap-x-4">
          <IconBtn
            type="submit"
            disabled={loading}
            text={editingSection ? "Update Section" : "Create Section"}
            outline
          >
            <IoAddCircleOutline size={20} className="text-yellow-50" />
          </IconBtn>
        </div>
      </form>

      <NestedView handleChangeEditSectionName={handleEdit} />

      

      <div className="flex justify-end gap-x-3">
        <IconBtn text="Next" disabled={loading} onClick={goToNext}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </div>
  );
}
