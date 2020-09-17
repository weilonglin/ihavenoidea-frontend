import React from "react"
import styled from "styled-components"

const LoadingDiv = styled.div`
	width: 100vw;
	height: 100vh;
	margin: 0 auto;
	display: flex;
	align-items: stretch;
	flex-direction: column;
	font-size: 20px;

	p {
		align-content: center;
		align-items: stretch;
		margin: 0 auto;
	}
`

export const Loading = () => {
	return (
		<LoadingDiv>
			<p>Loading....</p>
		</LoadingDiv>
	)
}
