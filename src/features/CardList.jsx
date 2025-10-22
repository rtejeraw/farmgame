import CardItem from "./CardItem";
import styled from "styled-components";

const CardListContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	gap: 40px;
	flex-wrap: wrap;
`;

function CardList({ items, CallBack }) {
	return (
		<CardListContainer>
			{items.map((item) => (
				<CardItem key={item.id} Unit={item} CallBack={CallBack} />
			))}
		</CardListContainer>
	);
}

export default CardList;
