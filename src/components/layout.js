import React             from 'react'
import * as PropTypes    from 'prop-types'
import clsx              from 'clsx'
import { withStyles }    from '@material-ui/core/styles'
import {
	Drawer, CssBaseline, AppBar,
	Toolbar, Typography,
	IconButton
}                        from '@material-ui/core'
import MenuIcon          from '@material-ui/icons/Menu'
import ChevronLeftIcon   from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon  from '@material-ui/icons/ChevronRight'
import ResultField       from './ResultList/ResultField'
import MovieDetails      from './infoPanel/MovieDetails'
import axios             from "axios"


const drawerWidth = 360;

const styles = theme => ( {
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create( ['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		} ),
	},
	appBarShift: {
		width: `calc(100% - ${ drawerWidth }px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create( ['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		} ),
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 20,
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing( 3 ),
		transition: theme.transitions.create( 'margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		} ),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create( 'margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		} ),
		marginLeft: 0,
	},
} );

class MainDrawer extends React.Component {
	constructor(props) {
		super( props )

		this.handleDrawer = this.handleDrawer.bind( this )
		this.handleUserClick = this.handleUserClick.bind( this )
		this.handleClickOnSearch = this.handleClickOnSearch.bind( this )
		this.handleSearchChange = this.handleSearchChange.bind( this )
		this.handleKeyPress = this.handleKeyPress.bind( this )

		this.state = {
			open: true,
			infoActive: false,
			itemInfo: [],
			searchString: '',
			list: []
		}
	}


	handleUserClick(e, id) {
		axios.get( ` http://www.omdbapi.com/?apikey=1977b733&i=${ id }` )
			.then( (response) => {
				// handle success
				this.setState( {
					itemInfo: response.data,
					infoActive: true
				} )
			} )
			.catch( function (error) {
				// handle error
				console.error( error )
			} )
	}

	//check the state of the left panel
	handleDrawer() {
		this.setState( { open: !this.state.open } );
	}


	handleSearchChange(e) {
		this.setState( { searchString: e.target.value } )
	}


	handleKeyPress(e) {

		if ( e.key === 'Enter' ) {
			this.handleClickOnSearch()
		}
	}

	handleClickOnSearch() {
		axios.get( `http://omdbapi.com/?apikey=1977b733&s=${ this.state.searchString }` )
			.then( (response) => {
				// handle success
				this.setState( { list: response.data.Search } )
			} )
			.catch( function (error) {
				// handle error
				console.error( error )
			} )
	}


	render() {
		const { classes, theme } = this.props
		const {
			open, list, searchString, itemInfo, infoActive
		} = this.state;

		return (
			<div className={ classes.root }>
				<CssBaseline/>
				<AppBar
					position="fixed"
					className={ clsx( classes.appBar, {
						[classes.appBarShift]: open,
					} ) }
				>
					<Toolbar disableGutters={ !open }>
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={ this.handleDrawer }
							className={ clsx( classes.menuButton, open && classes.hide ) }
						>
							<MenuIcon/>
						</IconButton>
						<Typography variant="h6" color="inherit" noWrap>
							Information about film
						</Typography>
					</Toolbar>
				</AppBar>
				<Drawer
					className={ classes.drawer }
					variant="persistent"
					anchor="left"
					open={ open }
					classes={ {
						paper: classes.drawerPaper,
					} }
				>
					<div>
						<IconButton onClick={ this.handleDrawer }>
							{ theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/> }
						</IconButton>
					</div>
					<ResultField
						list={ list }
						handleUserClick={ this.handleUserClick }
						searchString={ searchString }
						handleSearchChange={ this.handleSearchChange }
						handleClickOnSearch={ this.handleClickOnSearch }
						handleKeyPress={ this.handleKeyPress }
					/>
				</Drawer>
				<main
					className={ clsx( classes.content, {
						[classes.contentShift]: open,
					} ) }
				>
					<MovieDetails
						itemInfo={ itemInfo }
						infoActive={ infoActive }
						list={ list }
					/>
				</main>
			</div>
		)
	}
}

MainDrawer.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

export default withStyles( styles, { withTheme: true } )( MainDrawer )