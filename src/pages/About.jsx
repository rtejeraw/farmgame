import styled from "styled-components";

const StyledDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 20px;
	padding: 20px 0px;
	& p {
		text-align: justify;
	}
`;

function About() {
	return (
		<StyledDiv>
			<StyledDiv>
				<h2>CTD React Course</h2>
				<p>
					Practical example application for final project to the
					advanced React course. Simple prototype application for a
					farming game. It allows you to buy seeds, plant them,
					harvest crops, and consume them to gain energy. The project
					was developed to demonstrate acquired knowledge in data
					management and presentation using various techniques.
				</p>
			</StyledDiv>
			<StyledDiv>
				<h2>Raul Tejera</h2>
				<p>
					Software programmer with over 18 years of experience in
					.NET, C#, WPF, and more. Keen to update his knowledge of new
					web programming trends and best practices.
				</p>
			</StyledDiv>
		</StyledDiv>
	);
}

export default About;
