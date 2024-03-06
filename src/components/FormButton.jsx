const FormButton = ({ Text, width, onClickFunction }) => {
  return (
    <button
      onClick={() => {
        onClickFunction();
      }}
      className={`bg-[#000000] w-${
        width ? width : "full"
      } py-4 font-bold text-[14px] rounded-[5px] my-2 text-[#C7C7C7]`}
    >
      {Text}
    </button>
  );
};

export default FormButton;
