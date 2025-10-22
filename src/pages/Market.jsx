import styles from "./Market.module.css";
import CardList from "../features/CardList";

function Market({ SellUnits, BuyUnit, Inventory, SellUnit }) {
	return (
		<div className={styles["container"]}>
			<div className={styles["header"]}>
				<h1>Market</h1>
				<div className={styles["header-line"]}></div>
				<p>
					( From the marketplace, you can buy and sell the seeds you
					need for farming. You can also sell the produce for a
					profit. )
				</p>
			</div>

			<div className={styles["section"]}>
				<h2>Buy seeds</h2>
				<CardList items={SellUnits} CallBack={BuyUnit} />
			</div>
			<div className={styles["section"]}>
				<h2>Sell products</h2>
				{Inventory.length > 0 ? (
					<CardList items={Inventory} CallBack={SellUnit} />
				) : (
					<p>No items to sell.</p>
				)}
			</div>
		</div>
	);
}

export default Market;
