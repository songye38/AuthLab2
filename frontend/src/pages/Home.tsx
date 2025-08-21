import LoggedInView from "../components/LoggedInView";
import LoggedOutView from "../components/LoggedOutView";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
    const { user } = useAuth();
    console.log("Home user:", user);
    return (
        <>
            {user ? (
                <LoggedInView userName={user} />
            ) : (
                <LoggedOutView />
            )}
        </>
    );
};

export default Home;
