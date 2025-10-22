import styles from "./Land.module.css";
import Plot from "../features/Plot";
import Crop from "../features/Crop";
import CardItem from "../features/CardItem";

function Land({
	UnitList,
	Plots,
	SelectPlot,
	SelectedPlot,
	Inventory,
	PlantCrop,
	HarvestCrop,
}) {
	const Plant = async ({ unitTypeId }) => {
		PlantCrop(SelectedPlot.Id, unitTypeId);
	};
	const Harvest = async ({ unitTypeId }) => {
		HarvestCrop(SelectedPlot.Id, unitTypeId);
	};

	return (
		<div className={styles["container"]}>
			<div className={styles["header"]}>
				<h1>Land</h1>
				<div className={styles["header-line"]}></div>
				<p>
					( Seeds can be planted in the plots of land for harvest. The
					crops can be harvested for consumption or sale. )
				</p>
			</div>

			<div className={styles["body-container"]}>
				<div className={styles["section"]}>
					<div className={styles["plot-list"]}>
						{Plots.map((x) => (
							<Plot
								key={x.id}
								plot={{
									id: x.id,
									UnitTypeId: x.UnitTypeId,
									Unit: UnitList.find(
										(unit) => unit.Id === x.UnitTypeId
									),
								}}
								SelectPlot={SelectPlot}
							/>
						))}
					</div>
				</div>
				<div className={styles["section"]}>
					<div className={styles["plot-data"]}>
						{SelectedPlot === null ? (
							<p>No plot selected.</p>
						) : SelectedPlot.Unit !== null ? (
							<Crop crop={SelectedPlot.Unit} CallBack={Harvest} />
						) : (
							<div>
								<h1>Plant Crop</h1>
								{Inventory.filter((x) =>
									x.Unit.Name.toLowerCase().includes("seed")
								).length === 0 ? (
									<p>
										No seeds available, you must buy them at
										the market.
									</p>
								) : (
									<div className={styles["seed-list"]}>
										{Inventory.filter((x) =>
											x.Unit.Name.toLowerCase().includes(
												"seed"
											)
										).map((x) => (
											<CardItem
												key={x.id}
												Unit={x.Unit}
												CallBack={Plant}
											/>
										))}
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Land;
