import styled from "styled-components";

const CropContainer = styled.div`
	display: flex;
	gap: 20px;
	height: 100%;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
	& h3 {
		margin: 0px;
	}
	& p {
		color: var(--white-color);
		margin: 0px;
	}
	& button {
		padding: 10px 10px;
		border: none;
		border-radius: 6px;
		color: var(--white-color);
		cursor: pointer;
		font-size: 16px;
		background-color: var(--green-color);
		&:hover {
			background-color: var(--assent-color);
		}
	}
`;

function Crop({ crop, CallBack }) {
	return (
		<CropContainer>
			<div>
				<h1>{crop.Name}</h1>
				<p>{crop.Description}</p>
			</div>
			<button onClick={() => CallBack({ unitTypeId: crop.Id })}>
				Harvest Crop
			</button>
		</CropContainer>
	);
}

export default Crop;
