import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Grade Management</h1>
            <div className="links">
                <Link className="navbar-link" to="/">Home</Link>
                <Link className="navbar-btn" to="/new-record">New Grade</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;