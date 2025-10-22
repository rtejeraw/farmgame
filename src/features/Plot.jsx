import styled from "styled-components";

const PlotContainer = styled.div`
	display: flex;
	width: 100px;
	height: 100px;
	background-color: var(--green-color);
	border: solid 2px var(--darkgreen-color);
	align-items: center;
	justify-content: center;
	&:hover {
		border: solid 2px var(--white-color);
		border-radius: 6px;
		cursor: pointer;
	}
	& img {
		width: 80px;
		height: 80px;
	}
`;

function Plot({ plot, SelectPlot }) {
	return (
		<PlotContainer
			onClick={() => {
				SelectPlot(plot.id);
			}}
		>
			{plot.UnitTypeId !== undefined ? (
				<img
					src={`src/assets/${plot.Unit.Name.toLowerCase().replace(
						" ",
						""
					)}.png`}
					alt="Crop Image"
				></img>
			) : (
				<></>
			)}
		</PlotContainer>
	);
}

export default Plot;
