import { Modal, Dialog, ModalOverlay, Button } from "react-aria-components";
import styles from "./product_added_modal.module.css";
import { NavLink } from "@remix-run/react";

export default function Product_Added_Modal({ product, isOpen, setOpen }) {
	return (
		<ModalOverlay
			className={styles["my-overlay"]}
			isDismissable
			isOpen={isOpen}
			onOpenChange={setOpen}
		>
			<Modal className={styles["product_modal"]}>
				<Dialog className={styles["modal_content"]}>
					<div className={styles["modal_header"]}>
						<img src="/icons/cart_tick_icon.svg" alt="cart success" />
						<p>Product Added</p>
					</div>
					<p>{product.title} was added to your cart.</p>
					<div className={styles["modal_buttons"]}>
						<NavLink to={"/store/cart"} className={styles["modal_button"]}>
							View Cart
						</NavLink>
						<Button
							type="button"
							onPress={() => setOpen(false)}
							className={styles["modal_button"]}
						>
							Close
						</Button>
					</div>
				</Dialog>
			</Modal>
		</ModalOverlay>
	);
}
