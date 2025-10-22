const initialState = {
	isLoading: false,
	Currency: 0,
	Energy: 0,
	BaseId: null,
	BaseTimeStamp: null,
	Inventory: [],
	unitList: [],
	plotList: [],
	selectedPlot: null,
	errorMessage: "",
};

const actions = {
	fetchData: "fetchData",
	loadBase: "loadBase",
	loadInventory: "loadInventory",
	loadUnitTypes: "loadUnitTypes",
	loadPlots: "loadPlots",
	selectPlot: "selectPlot",
	setLoadError: "setLoadError",
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case actions.fetchData: {
			return { ...state, isLoading: true };
		}
		case actions.loadBase: {
			return {
				...state,
				BaseId: action.baseId,
				Currency: action.currency,
				Energy: action.energy,
				baseTimeStamp: action.timestamp,
				isLoading: false,
				errorMessage: "",
			};
		}
		case actions.loadInventory: {
			return {
				...state,
				Inventory: action.inventory.map((x) => {
					return {
						id: x.id,
						...x.fields,
					};
				}),
				isLoading: false,
				errorMessage: "",
			};
		}
		case actions.loadUnitTypes: {
			return {
				...state,
				unitList: action.unitTypes,
				isLoading: false,
				errorMessage: "",
			};
		}
		case actions.loadPlots: {
			return {
				...state,
				plotList: action.plots,
				isLoading: false,
				errorMessage: "",
			};
		}
		case actions.selectPlot: {
			return {
				...state,
				selectedPlot: action.plot,
				errorMessage: "",
			};
		}
		case actions.setLoadError: {
			return { ...state, errorMessage: action.error.message };
		}
	}
}

export { initialState, actions, reducer };
