import styles from "./about_shop.module.css";
export default function About_Shop() {
	return (
		<section className={`${styles["about_shop"]} section-p`}>
			<h2>About Comforting Keepsakes</h2>
			<div className={styles["about_card"]}>
				<p>
					At Comforting Keepsakes, we believe in preserving memories through the
					art of handcrafted keepsakes. Our founder, Trina Naylon, is dedicated
					to transforming the clothing of those who have passed into cherished
					items that honor their memory and bring comfort to those who miss
					them. From quilts and pillows to handmade memory bears, each piece
					carries a story and holds a unique, irreplaceable connection to a
					loved one.
				</p>
			</div>
		</section>
	);
}
