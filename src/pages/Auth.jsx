// eslint-disable-next-line react/prop-types
const AuthForm = ({ children, title }) => {
  return (
    <div className="bg-blue-700 min-h-screen grid place-items-center p-4">
      <div className="max-w-[400px] mx-auto p-6 bg-white shadow-lg rounded-md bg-gray-100">
        <div className="flex justify-center">
          <img className="w-1/2" src="../assets/logo_depok.svg" alt="" />
        </div>
        <h2 className="text-3xl mb-4 mt-4 font-bold text-center text-blue-700">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default AuthForm;
