import styled from "styled-components";

const StyledBar = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	gap: 40px;
`;

const StyledElement = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: center;
	& h4 {
		margin: 0;
		font-size: 20px;
		color: var(--assent-color);
	}
	& p {
		margin: 0;
		font-size: 25px;
		font-weight: Bold;
		color: var(--white-color);
	}
`;

function StatsBar({ Currency, Energy }) {
	return (
		<StyledBar>
			<StyledElement>
				<h4>Currency</h4>
				<p>{Currency}</p>
			</StyledElement>
			<StyledElement>
				<h4>Energy</h4>
				<p>{Energy}</p>
			</StyledElement>
		</StyledBar>
	);
}

export default StatsBar;
