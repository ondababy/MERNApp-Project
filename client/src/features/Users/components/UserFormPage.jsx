
import { PageTitle } from '@partials';
import { useParams } from 'react-router-dom';
import UserForm from './UserForm';

export default function UserFormPage({ title = 'User Form', action = "create" }) {
  const { id } = useParams();

  return (
    <div className="w-full h-full">
      <PageTitle title={title} />
      <UserForm id={id} action={action} />
    </div>
  );
};

