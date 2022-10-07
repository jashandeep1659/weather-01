import React from "react";

const Navbar = () => {
    return (
        <section id="Navbar">
            <div className="logo">🌧 My Weather</div>
            <ul className="links">
                <li>
                    <a href="#">Home</a>
                </li>
                <li>
                    <a href="#">About</a>
                </li>
            </ul>
        </section>
    );
};

export default Navbar;
