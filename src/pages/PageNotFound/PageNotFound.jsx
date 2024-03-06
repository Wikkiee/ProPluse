import Navbar from "../../components/Navbar";

const PageNotFound = () => {
  return (
    <>
      <div>
        <Navbar />
        <div className="w-full h-screen flex justify-center items-center">
          <h1 className="text-[50px] font-bold italic">
            404 Page Not Found !.
          </h1>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
