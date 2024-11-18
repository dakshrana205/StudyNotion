export default function IconBtn({ text, onClick, children, disabled, outline = false, customClasses, type }) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}  // Corrected here
            className={`flex items-center justify-center outline-none ${outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
                } gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 hover:bg-black hover:text-yellow-50 duration-300 ${customClasses}
                ${disabled && 'cursor-not-allowed hover:bg-yellow-50 hover:text-black'} `}
            type={type}
        >
            {
                children ? (
                    <>
                        <span className={`${outline && "text-yellow-50"}`}>{text}</span>
                        {children}
                    </>
                ) :
                    (text)
            }
        </button>
    )
}
