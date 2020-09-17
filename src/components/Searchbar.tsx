import React from "react"
import styled from "styled-components"

const SearchInput = styled.input`
	background: #efefef;
	border: 1px solid #dfdfdf;
	box-sizing: border-box;
	border-radius: 5px;
	padding: 10px;
	width: 79%;
`

type Props = {
	searchResults: string
	handleResult: Function
}

export const Searchbar = ({ searchResults, handleResult }: Props) => {
	return (
		<SearchInput
			type="text"
			placeholder="Search... (minimum of 3 characters)"
			value={searchResults}
			onChange={(e) => handleResult(e)}
		/>
	)
}
