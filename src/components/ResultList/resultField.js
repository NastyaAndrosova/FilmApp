import React                     from "react"
import * as PropTypes            from 'prop-types'
import { withStyles }            from '@material-ui/core/styles'
import TablePagination           from '@material-ui/core/TablePagination'
import SearchField               from './searchField'

const styles = () => ({
    userContainer: {
        width: '100%',
        boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
        zIndex: '1',
        padding: '10px'
    },
    column: {
        fontSize: '20px',
        listStyleType: 'none',
        paddingTop: '13px',
        cursor: 'pointer',
        borderBottom: '1px solid black'
    }

})

class ResultField extends  React.Component {
    constructor(props) {
        super(props)

        this.handleChangeItemsPerPage   = this.handleChangeItemsPerPage.bind(this)
        this.handleChangePage           = this.handleChangePage.bind(this)


        this.state = {
            total: 0,
            page: 0,
            itemsPerPage: 12,
            autoResults: []
        }


    }
    handleChangePage (e, page) {
        this.setState({page})
    }


    handleChangeItemsPerPage(e) {
        this.setState({ itemsPerPage: e.target.value })
    }

    render() {
        const { page, itemsPerPage } = this.state
        const {
            classes, list, searchString, handleSearchChange,
            handleClickOnSearch, handleUserClick,
            handleKeyPress
        } = this.props


        return (
            <React.Fragment>
                <div className={ classes.userContainer }>
                    <div>
                        <SearchField
                            searchString={ searchString }
                            handleSearchChange={ handleSearchChange }
                            handleClickOnSearch={ handleClickOnSearch }
                            handleKeyPress={ handleKeyPress }
                        />
                    </div>
                    { list ?
                        list.slice( page * itemsPerPage, page * itemsPerPage + itemsPerPage ).map( (item, idx) => {
                            return (
                                <div key={ idx } className={ classes.column }
                                     onClick={ (e) => handleUserClick( e, item.imdbID ) }>{ item.Title }</div>
                            )
                        } )

                        : null }
                    <TablePagination
                        component='div'
                        count={ list ? list.length : 0 }
                        rowsPerPage={ itemsPerPage }
                        rowsPerPageOptions={ [5, 10, 15] }
                        labelRowsPerPage='стр'
                        labelDisplayedRows={ ({ from, to, count }) => `${ from }-${ to } из ${ count }` }
                        page={ page }
                        backIconButtonProps={ { 'aria-label': 'Previous Page' } }
                        nextIconButtonProps={ { 'aria-label': 'Next Page' } }
                        onChangePage={ this.handleChangePage }
                        onChangeRowsPerPage={ (e) => this.handleChangeItemsPerPage( e ) }
                    />
                </div>
            </React.Fragment>
        )

    }
}
ResultField.propTypes = {
    classes: PropTypes.object.isRequired,
    searchString: PropTypes.string,
    handleSearchChange: PropTypes.func,
    handleClickOnSearch: PropTypes.func,
    handleUserClick: PropTypes.func,
    handleKeyPress: PropTypes.func

};
export default (withStyles(styles)(ResultField))