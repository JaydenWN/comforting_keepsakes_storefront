import styles from "./page_header.module.css";
export default function Page_Header({ title }) {
	return (
		<h1 className={`${styles["page-title"]} gutter-m section-p`}>{title}</h1>
	);
}
