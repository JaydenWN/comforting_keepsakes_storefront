import { NavLink } from "@remix-run/react";

export default function Navbar() {
	return (
		<>
			<NavLink to={"/"}>Site Title</NavLink>
			<ul>
				<li>
					<NavLink to={"/about"}>About</NavLink>
				</li>
				<li>
					<NavLink to={"/services"}>Services</NavLink>
				</li>
				<li>
					<NavLink to={"/contact"}>Contact</NavLink>
				</li>
				<li>
					<NavLink to={"/store/customer"}>Account</NavLink>
				</li>
				<li>
					<NavLink to={"/store"}>Store</NavLink>
				</li>
				<li>
					<NavLink to={"/store/cart"}>Cart</NavLink>
				</li>
			</ul>
		</>
	);
}
