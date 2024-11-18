import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { RiDeleteBin6Line } from 'react-icons/ri';
export default function ChipInput({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
}) {
  const { editCourse, course } = useSelector((state) => state.course);
  const [chipValue, setChipValue] = useState("");
  const [chips, setChips] = useState([]);

  // Initialize chips when editing a course
  useEffect(() => {
    if (editCourse && course?.tag) {
      setChips(course.tag || []);
    }
    register(name, {
      required: true,
      validate: (value) => value && value.length > 0,
    });
  }, [editCourse, course?.tag, register, name]);

  // Update form value whenever chips change
  useEffect(() => {
    setValue(name, chips);
  }, [chips, name, setValue]);

  // Add a new chip
  const handleAddChip = () => {
    if (chipValue.trim() && !chips.includes(chipValue.trim())) {
      setChips([...chips, chipValue.trim()]);
      setChipValue("");
    }
  };

  // Delete an existing chip
  const handleDeleteChip = (chipIndex) => {
    setChips((prevChips) => prevChips.filter((_, index) => index !== chipIndex));
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div className="flex items-center space-x-2">
        <input
          id={name}
          type="text"
          placeholder={placeholder}
          value={chipValue}
          onChange={(e) => setChipValue(e.target.value)}
          className="p-2 bg-gray-800 text-black border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        <button
          type="button"
          onClick={handleAddChip}
          className="font-semibold text-black bg-yellow-50 px-3 py-2 rounded hover:bg-black hover:text-yellow-50 focus:outline-none"
>
          Add
        </button>
      </div>

      <div className="flex w-full flex-wrap gap-y-2 mt-2">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full px-2 py-1 text-sm text-richblack-5"
          >
            {chip}
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleDeleteChip(index)}
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
