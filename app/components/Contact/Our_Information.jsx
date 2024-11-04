import Contact_Card from "./Contact_Card";
import styles from "./our_information.module.css";

export default function Our_Information() {
	return (
		<section className={styles["our_information"]}>
			<h2>Our Information</h2>
			<div className={styles["contact_info"]}>
				<Contact_Card
					img={"/icons/phone_icon.svg"}
					imgAlt={"phone"}
					contactInfo={"0418 824 424"}
				/>
				<Contact_Card
					img={"/icons/email_icon.svg"}
					imgAlt={"email"}
					contactInfo={"Email@emailaddress.com"}
				/>
				<Contact_Card
					img={"/icons/location_pin_icon.svg"}
					imgAlt={"location"}
					contactInfo={"131 Oak Road, Matcham. NSW Australia 2250."}
				/>
			</div>
		</section>
	);
}
