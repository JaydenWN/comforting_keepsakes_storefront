import { Button } from "react-aria-components";
import styles from "./testimonials.module.css";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import TestimonialCard from "./Testimonial_Card";
import Autoplay from "embla-carousel-autoplay";
export default function Testimonials() {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);
	return (
		<section className={`${styles["customer-stories"]} gutter-m section-p`}>
			<h2>Customer Stories</h2>
			<div className={styles["embla"]}>
				<div className={styles["embla__viewport"]} ref={emblaRef}>
					<div className={styles["embla__container"]}>
						<div className={styles["embla__slide"]}>
							<TestimonialCard
								quote="After losing my grandmother, I wanted something special to remember her by. The memory bear made from her favorite sweater has brought so much comfort to our family."
								quotee="Sarah M"
								img="/images/keepsake_bear_landing_image.jpg"
								imgAlt="bear"
							/>
						</div>
						<div className={styles["embla__slide"]}>
							<TestimonialCard
								quote="After losing my grandmother, I wanted something special to remember her by. The memory bear made from her favorite sweater has brought so much comfort to our family."
								quotee="Sarah M"
								img="/images/keepsake_bear_landing_image.jpg"
								imgAlt="bear"
							/>
						</div>
					</div>
				</div>
				<div className={styles["embla_controls"]}>
					<Button className={styles["embla__prev"]} onPress={scrollPrev}>
						<img src="/icons/arrow-left_icon.svg" alt="previous" />
					</Button>
					<Button className={styles["embla__next"]} onPress={scrollNext}>
						<img src="/icons/arrow-right_icon.svg" alt="next" />
					</Button>
				</div>
			</div>
		</section>
	);
}
