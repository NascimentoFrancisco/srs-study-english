import AuthForm from "../../components/authForms";
import ChangePassword from "../../components/changePassword";

type Props = {
    type: 'edit-user' | 'change-password'
}

function Users({ type }: Props){

    return (
        <main>
            {
                type === 'edit-user' ? 
                    <AuthForm />
                :
                    <ChangePassword />
            }
        </main>
    );
}

export default Users;
