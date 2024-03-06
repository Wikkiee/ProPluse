const FormTextField = ({ placeholder, Type, width, onChangeFunction }) => {
  return (
    <input
      className={`bg-[#353535] text-[#ababab] px-3 py-4 pl-5  rounded-[5px] w-[300px] my-2 font-light w-${
        width ? width : "auto"
      }`}
      placeholder={placeholder}
      type={Type}
      onChange={() => {
        onChangeFunction();
      }}
    ></input>
  );
};

const FormTextAreaField = ({ placeholder, Type, width }) => {
  return (
    <textarea
      className={`bg-[#353535] text-[#ababab] px-3 py-4 pl-5  rounded-[5px] my-2 font-light `}
      placeholder={placeholder}
      cols={100}
      rows={4}
    ></textarea>
  );
};

export default FormTextField;
export { FormTextAreaField };
