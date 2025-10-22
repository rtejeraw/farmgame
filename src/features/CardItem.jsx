import styled from "styled-components";

const CardContainer = styled.div`
	margin-top: 20px;
	padding: 10px;
	background-color: var(--secunday-color);
	border-top: 6px solid var(--primary-color);
	width: 300px;
	display: flex;
	flex-direction: column;
	gap: 20px;
	align-items: flex-start;
	justify-content: flex-start;
	&:hover {
		cursor: pointer;
		background-color: var(--dark-color);
	}
	& p {
		margin: 0;
		font-size: 16px;
		justify-text: justify;
		color: var(--inactive-color);
	}
`;

const CardHeader = styled.div`
	display: flex;
	gap: 20px;
	align-items: flex-start;
	justify-content: flex-start;
	& img {
		margin: 0px;
	}
	& h3 {
		margin: 0;
		color: var(--assent-color);
		font-size: 25px;
	}
`;

const CardData = styled.div`
	display: flex;
	gap: 15px;
`;

function CardItem({ Unit, CallBack }) {
	return (
		<CardContainer
			onClick={() => {
				if (CallBack !== undefined) CallBack({ unitTypeId: Unit.Id });
			}}
		>
			<CardHeader>
				<img
					src={`src/assets/${Unit.Name.toLowerCase().replace(
						" ",
						""
					)}.png`}
					alt="Seed Image"
					width="80px"
					height="80px"
				/>
				<div>
					<h3>{Unit.Name}</h3>
					<p>{Unit.Description}</p>
				</div>
			</CardHeader>

			<CardData>
				{Unit.EnergyCost !== undefined ? (
					<p>Energy: {Unit.EnergyCost}</p>
				) : (
					""
				)}
				{Unit.CurrencyCost !== undefined ? (
					<p>Price: {Unit.CurrencyCost}</p>
				) : (
					""
				)}
				{Unit.Time !== undefined ? (
					<p>Harvest time: {Unit.Time} min</p>
				) : (
					""
				)}
				{Unit.Quantity !== undefined ? (
					<p>Quantity: {Unit.Quantity}</p>
				) : (
					""
				)}
			</CardData>
		</CardContainer>
	);
}

export default CardItem;
