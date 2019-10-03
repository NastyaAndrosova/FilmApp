import React      from "react"
import {
    Input, InputAdornment, IconButton
}                 from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"

const SearchField = ({ searchString, handleKeyPress, handleSearchChange, handleClickOnSearch }) => {
    return (
        <React.Fragment>
            <Input
                type='text'
                placeholder='Enter the title'
                value={ searchString }
                style={ { "width" : '100%' } }
                onChange={ handleSearchChange }
                onKeyPress={ (e) => handleKeyPress( e ) }
                endAdornment={
                    <InputAdornment>
                        <IconButton style={ { color : 'black' } } onClick={ handleClickOnSearch }>
                            <SearchIcon/>
                        </IconButton>
                    </InputAdornment>
                }
            />
        </React.Fragment>
    )
}
export default SearchField