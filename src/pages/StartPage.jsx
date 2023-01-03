import { useAuthContext } from '../contexts/AuthContext'

const StartPage = () => {
    const { currentUser } = useAuthContext()

    return (
        <div>Hi!

            {currentUser 
                ? <p> {currentUser.email}</p>
                : <p> Who are you?</p>    
            }
        </div>
    )
}

export default StartPage