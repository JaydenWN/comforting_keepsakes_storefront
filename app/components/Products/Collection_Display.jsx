import styles from "./collection_display.module.css";
import { NavLink } from "@remix-run/react";
import useEmblaCarousel from "embla-carousel-react";

export default function Collection_Display({ collection, products }) {
	const [emblaRef] = useEmblaCarousel({ loop: false, dragFree: true });
	console.log(products);
	return (
		<section className={`${styles["collection-display"]}`}>
			<div className={styles["collection-head"]}>
				<h2>{collection.title}</h2>
				<NavLink to={`/store/${collection.handle}`}>View All</NavLink>
			</div>
			<div className={styles["embla"]} ref={emblaRef}>
				<div className={styles["embla__container"]}>
					{products.map((product) => (
						<div key={product.title} className={styles["embla__slide"]}>
							<div className={styles["preview_card"]}>
								<NavLink to={`/store/product/${product.handle}`}>
									<img src={product.images[0].url} alt={product.title} />
								</NavLink>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
