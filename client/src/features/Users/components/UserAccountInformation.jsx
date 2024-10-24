

export default function AccountInformation(props) {
  const accSchema = [];
  const accFormik = {
    initialValues: accSchema.reduce((acc, field) => {
      acc[field.name] = '';
      return acc;
    }, {}),
  };


  return (
    <div className="w-full min-h-full">
      <h1 className="font-extrabold text-xl  mb-4">Account Information</h1>
      <div className="divider"></div>
      <div className="form-wrapper ">

      </div>
    </div>
  );
}


