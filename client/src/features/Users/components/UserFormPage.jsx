
import { PageTitle } from '@partials';
import UserForm from './UserForm';

export default function UserFormPage({ title = 'User Form', action = "create" }) {
  return (
    <div className="w-full h-full">
      <PageTitle title={title} />
      <UserForm action={action} />
    </div>
  );
};

