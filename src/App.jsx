import styles from "./App.module.css";
import { Route, Routes } from "react-router";
import Header from "./shared/Header";
import Home from "./pages/home";
import Land from "./pages/Land";
import Market from "./pages/market";
import About from "./pages/about";
import NotFound from "./pages/notfound";
import StatsBar from "./shared/StatsBar";

import { reducer, actions, initialState } from "./reducers/States.reducer.js";
import { useEffect, useCallback, useReducer } from "react";

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/`;
const token = `Bearer ${import.meta.env.VITE_PAT}`;

function App() {
	const [States, dispatch] = useReducer(reducer, initialState);

	const encodeUrl = useCallback((tableName) => {
		let table = "";
		switch (tableName) {
			case "Base":
				table = import.meta.env.VITE_TABLE_BASE;
				break;
			case "Plots":
				table = import.meta.env.VITE_TABLE_PLOTS;
				break;
			case "Inventory":
				table = import.meta.env.VITE_TABLE_INVENTORY;
				break;
			case "UnitType":
				table = import.meta.env.VITE_TABLE_UNITTYPE;
				break;
		}
		return encodeURI(`${url}${table}`);
	}, []);

	useEffect(() => {
		fetchUnitTypes();
		fetchBase();
		fetchPlots();
		fetchInventory();
	}, []);

	const fetchUnitTypes = async () => {
		let records = await APIFetch("UnitType", "GET", null);
		dispatch({
			type: actions.loadUnitTypes,
			unitTypes: records.map((item) => {
				return { id: item.id, ...item.fields };
			}),
		});
	};
	const fetchInventory = async () => {
		let records = await APIFetch("Inventory", "GET", null);
		dispatch({
			type: actions.loadInventory,
			inventory: records.map((x) => {
				return { id: x.id, fields: x.fields };
			}),
		});
	};
	const fetchBase = async () => {
		let baseResult = await APIFetch("Base", "GET", null);
		dispatch({
			type: actions.loadBase,
			baseId: baseResult[0].id,
			currency: baseResult[0].fields.Currency,
			energy: baseResult[0].fields.Energy,
			timestamp: baseResult[0].fields.timestamp,
		});
	};
	const fetchPlots = async () => {
		let plots = await APIFetch("Plots", "GET", null);

		dispatch({
			type: actions.loadPlots,
			plots: plots.map((x) => {
				return { id: x.id, ...x.fields };
			}),
		});
	};

	const BuyUnit = async ({ unitTypeId }) => {
		try {
			const unitType = States.unitList.find((x) => x.Id === unitTypeId);

			if (States.Currency < unitType.CurrencyCost) {
				throw new Error("Not enough currency to buy this item.");
			}

			const inventoryUnit = States.Inventory.find(
				(x) => x.UnitTypeId === unitTypeId
			);

			if (inventoryUnit === undefined) {
				//CREATE NEW INVENTORY ITEM
				await APIFetch("Inventory", "POST", {
					UnitTypeId: unitType.Id,
					Quantity: 1,
				});
			} else {
				//UPDATE EXISTING INVENTORY ITEM
				await APIFetch("Inventory", "PATCH", {
					id: inventoryUnit.id,
					Quantity:
						inventoryUnit !== null ? inventoryUnit.Quantity + 1 : 1,
				});
			}

			await APIFetch("Base", "PATCH", {
				id: States.BaseId,
				Energy: States.Energy,
				Currency: States.Currency - unitType.CurrencyCost,
			});
			fetchInventory();
			fetchBase();
		} catch (error) {
			dispatch({ type: actions.setLoadError, error });
		}
	};

	const SellUnit = async ({ unitTypeId }) => {
		try {
			const unitType = States.unitList.find((x) => x.Id === unitTypeId);

			const inventoryUnit = States.Inventory.find(
				(x) => x.UnitTypeId === unitTypeId
			);

			await APIFetch("Inventory", "PATCH", {
				id: inventoryUnit.id,
				Quantity:
					inventoryUnit !== null ? inventoryUnit.Quantity - 1 : 0,
			});

			await APIFetch("Base", "PATCH", {
				id: States.BaseId,
				Energy: States.Energy,
				Currency: States.Currency + unitType.CurrencyCost,
			});
			fetchInventory();
			fetchBase();
		} catch (error) {
			dispatch({ type: actions.setLoadError, error });
		}
	};

	const SelectPlot = async (plotId) => {
		let plot = States.plotList.find((x) => x.id === plotId);

		dispatch({
			type: actions.selectPlot,
			plot: {
				id: plot.id,
				Id: plot.Id,
				Unit:
					plot.UnitTypeId !== undefined
						? States.unitList.find((x) => x.Id === plot.UnitTypeId)
						: null,
				TimeStamp: plot.TimeStamp !== undefined ? plot.TimeStamp : null,
			},
		});
	};

	const PlantCrop = async (plotId, unitTypeId) => {
		try {
			//UPDATE PLOT WITH CROP
			if (
				States.Energy <
				States.unitList.find((x) => x.Id === unitTypeId).EnergyCost
			) {
				throw new Error("Not enough energy to plant this crop.");
			}

			let plot = States.plotList.find((x) => x.Id === plotId);
			let unit = null;
			switch (States.unitList.find((x) => x.Id === unitTypeId).Name) {
				case "Cabbage Seed":
					unit = States.unitList.find(
						(x) => x.Name === "Cabbage Crop"
					);
					break;
				case "Carrot Seed":
					unit = States.unitList.find(
						(x) => x.Name === "Carrot Crop"
					);
					break;
			}

			await APIFetch("Plots", "PATCH", {
				id: plot.id,
				UnitTypeId: unit.Id,
				TimeStamp: new Date().toISOString(),
			});

			//DECREASE INVENTORY
			const inventoryUnit = States.Inventory.find(
				(x) => x.UnitTypeId === unitTypeId
			);

			await APIFetch("Inventory", "PATCH", {
				id: inventoryUnit.id,
				Quantity:
					inventoryUnit !== null ? inventoryUnit.Quantity - 1 : 0,
			});

			//DECREASE ENERGY
			await APIFetch("Base", "PATCH", {
				id: States.BaseId,
				Energy:
					States.Energy -
					States.unitList.find((x) => x.Id === unitTypeId).EnergyCost,
				Currency: States.Currency,
			});

			dispatch({ type: actions.selectPlot, plot: null });

			fetchBase();
			fetchPlots();
			fetchInventory();
		} catch (error) {
			dispatch({ type: actions.setLoadError, error });
		}
	};

	const HarvestCrop = async (plotId, unitTypeId) => {
		try {
			if (
				States.Energy <
				States.unitList.find((x) => x.Id === unitTypeId).EnergyCost
			) {
				throw new Error("Not enough energy to harvest this crop.");
			}

			//UPDATE PLOT WITH CROP
			let plot = States.plotList.find((x) => x.Id === plotId);
			let unit = null;
			switch (States.unitList.find((x) => x.Id === unitTypeId).Name) {
				case "Cabbage Crop":
					unit = States.unitList.find((x) => x.Name === "Cabbage");
					break;
				case "Carrot Crop":
					unit = States.unitList.find((x) => x.Name === "Carrot");
					break;
			}

			await APIFetch("Plots", "PATCH", {
				id: plot.id,
				UnitTypeId: null,
				TimeStamp: null,
			});

			//INCREASE INVENTORY
			const inventoryUnit = States.Inventory.find(
				(x) => x.UnitTypeId === unit.Id
			);

			if (inventoryUnit === undefined) {
				//CREATE NEW INVENTORY ITEM
				await APIFetch("Inventory", "POST", {
					UnitTypeId: unit.Id,
					Quantity: 1,
				});
			} else {
				//UPDATE EXISTING INVENTORY ITEM
				await APIFetch("Inventory", "PATCH", {
					id: inventoryUnit.id,
					Quantity: inventoryUnit.Quantity + 1,
				});
			}

			//DECREASE ENERGY
			await APIFetch("Base", "PATCH", {
				id: States.BaseId,
				Energy:
					States.Energy -
					States.unitList.find((x) => x.Id === unitTypeId).EnergyCost,
				Currency: States.Currency,
			});

			dispatch({ type: actions.selectPlot, plot: null });

			fetchBase();
			fetchPlots();
			fetchInventory();
		} catch (error) {
			dispatch({ type: actions.setLoadError, error });
		}
	};

	const ConsumeItem = async ({ unitTypeId }) => {
		try {
			const unitType = States.unitList.find((x) => x.Id === unitTypeId);

			const inventoryUnit = States.Inventory.find(
				(x) => x.UnitTypeId === unitTypeId
			);

			if (unitType.Name.toLowerCase().includes("seed")) {
				dispatch({
					type: actions.setLoadError,
					error: { message: "You cannot consume seeds." },
				});
				return;
			}

			await APIFetch("Base", "PATCH", {
				id: States.BaseId,
				Energy: States.Energy + unitType.EnergyCost,
				Currency: States.Currency,
			});

			await APIFetch("Inventory", "PATCH", {
				id: inventoryUnit.id,
				Quantity:
					inventoryUnit !== null ? inventoryUnit.Quantity - 1 : 0,
			});
			fetchBase();
			fetchInventory();
		} catch (error) {
			dispatch({ type: actions.setLoadError, error });
		}
	};

	async function APIFetch(table, method, unit) {
		dispatch({
			type: actions.fetchData,
		});

		let body = null;

		if (method !== "GET")
			switch (table) {
				case "Base":
					body = JSON.stringify({
						fields: {
							Energy: unit.Energy,
							Currency: unit.Currency,
							TimeStamp: new Date().toISOString(),
						},
					});
					break;
				case "Inventory":
					body = JSON.stringify({
						fields: {
							UnitTypeId: unit.UnitTypeId,
							Quantity: unit.Quantity,
						},
					});
					break;
				case "Plots":
					body = JSON.stringify({
						fields: {
							UnitTypeId: unit.UnitTypeId,
							TimeStamp: unit.TimeStamp,
						},
					});
					break;
			}

		const options = {
			method: method,
			headers: {
				Authorization: token,
				"Content-Type": "application/json",
			},
			body: method !== "GET" ? body : null,
		};

		try {
			const resp = await fetch(
				`${encodeUrl(table)}${method === "PATCH" ? "/" + unit.id : ""}`,
				options
			);
			if (!resp.ok) {
				throw new Error(resp.statusText);
			}
			const { records } = await resp.json();
			switch (method) {
				case "GET":
					return records;
			}
		} catch (error) {
			dispatch({ type: actions.setLoadError, error });
		}
	}

	return (
		<div className={styles["app"]}>
			<Header title={"Farm Game"} />
			<hr />
			<StatsBar Currency={States.Currency} Energy={States.Energy} />
			<div className={styles["container"]}>
				<Routes>
					<Route
						path="/"
						element={
							<Home
								Inventory={States.Inventory.filter(
									(x) => x.Quantity > 0
								).map((x) => {
									let unit = States.unitList.find(
										(unit) => unit.Id === x.UnitTypeId
									);
									return {
										id: unit.Id,
										Id: unit.Id,
										Name: unit.Name,
										Description: unit.Description,
										Quantity: x.Quantity,
									};
								})}
								ConsumeItem={ConsumeItem}
							/>
						}
					/>
					<Route
						path="/land"
						element={
							<Land
								UnitList={States.unitList}
								Plots={States.plotList}
								SelectPlot={SelectPlot}
								SelectedPlot={States.selectedPlot}
								Inventory={States.Inventory.filter(
									(x) => x.Quantity > 0
								).map((x) => {
									return {
										id: x.id,
										Id: x.Id,
										Unit: States.unitList.find(
											(unit) => unit.Id === x.UnitTypeId
										),
										Quantity: x.Quantity,
									};
								})}
								PlantCrop={PlantCrop}
								HarvestCrop={HarvestCrop}
							/>
						}
					/>
					<Route
						path="/market"
						element={
							<Market
								SellUnits={States.unitList.filter(
									(x) => x.Time !== 0
								)}
								BuyUnit={BuyUnit}
								Inventory={States.Inventory.filter(
									(x) => x.Quantity > 0
								).map((x) => {
									let unit = States.unitList.find(
										(unit) => unit.Id === x.UnitTypeId
									);
									return {
										id: unit.Id,
										Id: unit.Id,
										Name: unit.Name,
										Description: unit.Description,
										Quantity: x.Quantity,
										CurrencyCost: unit.CurrencyCost,
									};
								})}
								SellUnit={SellUnit}
							/>
						}
					/>
					<Route path="/about" element={<About />} />
					<Route path="/*" element={<NotFound />} />
				</Routes>
				{States.errorMessage !== "" ? (
					<div className={styles["error-container"]}>
						<p>{States.errorMessage}</p>
						<button
							type="button"
							onClick={() => {
								dispatch({
									type: actions.setLoadError,
									error: { message: "" },
								});
							}}
						>
							Dismiss
						</button>
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
}

export default App;
