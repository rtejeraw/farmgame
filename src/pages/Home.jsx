import styles from "./Home.module.css";
import CardList from "../features/CardList";

function Home({ Inventory, ConsumeItem }) {
	return (
		<div className={styles["container"]}>
			<div className={styles["section"]}>
				<h2>Welcome to Farm Game!</h2>
				<p>
					This farming game lets you manage a small farm: purchase
					seeds, plant crops, harvest produce, and manage your
					inventory. Seeds and harvested crops are stored in the
					Inventory and shown below in two sections: "Seeds" (used to
					plant crops) and "Consumables" (produce that you can consume
					to gain energy). Explore planting strategies, keep your
					energy up, and grow your farm over time.
				</p>
			</div>
			<div className={styles["header"]}>
				<h1>Inventory</h1>
				<div className={styles["header-line"]}></div>
				<p>
					( All purchased seeds and harvested crops are in your
					inventory. Crops can be consumed to gain energy. )
				</p>
			</div>

			<div className={styles["body-container"]}>
				<div className={styles["section"]}>
					<h2>Seeds</h2>
					{Inventory.filter((x) =>
						x.Name.toLowerCase().includes("seed")
					).length !== 0 ? (
						<CardList
							items={Inventory.filter((x) =>
								x.Name.toLowerCase().includes("seed")
							)}
							CallBack={ConsumeItem}
						/>
					) : (
						<p>No seeds in inventory.</p>
					)}
				</div>
				<div className={styles["section"]}>
					<h2>Consumables</h2>
					{Inventory.filter(
						(x) => !x.Name.toLowerCase().includes("seed")
					).length !== 0 ? (
						<CardList
							items={Inventory.filter(
								(x) => !x.Name.toLowerCase().includes("seed")
							)}
							CallBack={ConsumeItem}
						/>
					) : (
						<p>No consumables in inventory.</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default Home;
