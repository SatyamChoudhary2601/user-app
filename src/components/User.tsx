import useFetch from "../hooks/useFetch";

const User: React.FC = () => {
    const { name, email, loading, handleRefresh } = useFetch();
    return (
        <div className="userContainer">
            <h1 className="heading">{name}</h1>
            <p className="email">{email}</p>
            <button className="btn" onClick={handleRefresh} disabled={loading}>
                {loading ? "fetching..." : "Refresh"}
            </button>
        </div>
    );
};

export default User;
