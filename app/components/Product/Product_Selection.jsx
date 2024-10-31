import styles from "./product_selection.module.css";

import {
	Button,
	Label,
	ListBox,
	ListBoxItem,
	Popover,
	Select,
	SelectValue,
	TextField,
	Input,
	Text,
	TextArea,
	FieldError,
} from "react-aria-components";

export default function Product_Selection({
	productVariants,
	setSelectedVariant,
	selectedVariant,
	setCustomText,
	customText,
}) {
	function handleSelectionChange(key) {
		const newVaraiant = productVariants.filter(
			(variant) => variant.id === key,
		)[0];
		setSelectedVariant(newVaraiant);
		if (!newVaraiant.metadata.canEmbroider && customText) {
			setCustomText(null);
		}
	}

	return (
		<div className={styles["product_selection_group"]}>
			<Select
				onSelectionChange={handleSelectionChange}
				className={styles["product_select"]}
				defaultSelectedKey={selectedVariant.id}
			>
				<Label>Options</Label>
				<Button>
					<SelectValue />
					<span aria-hidden="true">▼</span>
				</Button>
				<Popover className={styles["product_popover"]}>
					<ListBox items={productVariants}>
						{productVariants.length > 1
							? productVariants.map((variant) => (
									<ListBoxItem id={variant.id} key={variant.id}>
										{variant.title}
									</ListBoxItem>
								))
							: null}
					</ListBox>
				</Popover>
			</Select>

			{selectedVariant.metadata?.canEmbroider === "true" ? (
				<TextField
					type="text"
					isRequired
					name="custom_text"
					maxLength={28}
					onChange={(e) => setCustomText(e)}
					className={styles["custom_text"]}
				>
					<Label> Custom Embroidered Text</Label>
					<Text className={"form_error"} slot="description">
						Cannot be longer than 28 characters.
					</Text>
					<FieldError className={"form_error"} />
					<Input maxLength={28} required={true} />
				</TextField>
			) : null}
		</div>
	);
}
