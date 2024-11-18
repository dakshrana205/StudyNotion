import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function RequirementsField({ name, label, register, setValue, errors }) {
  const { editCourse, course } = useSelector((state) => state.course);
  const [requirement, setRequirement] = useState("");
  const [requirementsList, setRequirementsList] = useState([]);

  useEffect(() => {
    if (editCourse && course?.instructions) {
      setRequirementsList(course.instructions || []);
    }
    register(name, {
      required: true,
      validate: (value) => value && value.length > 0,
    });
  }, [editCourse, course?.instructions, register, name]);

  useEffect(() => {
    setValue(name, requirementsList);
  }, [requirementsList, name, setValue]);

  // Add a new requirement
  const handleAddRequirement = () => {
    if (requirement.trim() && !requirementsList.includes(requirement.trim())) {
      setRequirementsList([...requirementsList, requirement.trim()]);
      setRequirement("");
    }
  };

  // Delete a requirement
  const handleRemoveRequirement = (index) => {
    setRequirementsList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          id={name}
          value={requirement}
          placeholder="Enter a requirement"
          onChange={(e) => setRequirement(e.target.value)}
          className="p-2 bg-gray-800 text-black border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-black bg-yellow-50 px-3 py-2 rounded hover:bg-black hover:text-yellow-50 focus:outline-none"
        >
          Add
        </button>
      </div>

      <div className="flex w-full flex-wrap gap-1 mt-2">
        {requirementsList.map((requirement, index) => (
          <div
            key={index}
            className="m-1 flex items-center bg-gray-700 rounded-full px-2 py-1 text-sm text-richblack-5"
          >
            {requirement}
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleRemoveRequirement(index)}
            >
              <RiDeleteBin6Line className="text-pink-200 text-sm hover:scale-125 duration-200" />
            </button>
          </div>
        ))}
      </div>

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}
