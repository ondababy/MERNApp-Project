import { useDispatch, useSelector } from 'react-redux';
import UserForm from "./UserForm";

export default function AccountInformation({ onSave = () => { } }) {
  const { userInfo } = useSelector(state => state.auth)

  return (
    <div className="w-full min-h-full">
      <h1 className="font-extrabold text-xl  mb-4">Account Information</h1>
      <div className="divider"></div>
      <div className="form-wrapper ">
        <UserForm action="edit" id={userInfo?.id} onSave={onSave} />
      </div>
    </div>
  );
}


