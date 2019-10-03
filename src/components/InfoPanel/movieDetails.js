import React, { Component }  from "react"
import * as PropTypes        from 'prop-types'
import { withStyles }        from '@material-ui/core/styles'
import { Paper }             from '@material-ui/core'

const styles = ()=>( {
	infoContainer: {
		textAlign: 'center',
		backgroundColor: '#f6f6f6',
		padding: '8% 10% 0 10%',
		height: '100%',
		fontSize: '25px'
	},
	postPaper: {
		margin: '10px',
		padding: '5px'
	}
} )

class MovieDetails extends Component {

	render() {
		const {
			classes, itemInfo, infoActive, list
		} = this.props

		let content = <div className={ classes.infoContainer }> Select any movie from the list on the left.
		</div>
		if ( infoActive ) {
			content =
				<div className={ classes.infoContainer }>
					<Paper style={ { padding: '10px', margin: '50px' } }>
						<img src={ itemInfo.Poster }/><br/>
						{ `Title: ${ itemInfo.Title }` }<br/>
						{ `Director: ${ itemInfo.Director }` }<br/>
						{ `Released: ${ itemInfo.Released }` }<br/>
						{ `Plot: ${ itemInfo.Plot }` }<br/>
					</Paper>

				</div>
		} else if ( !list ) {
			content = <div className={ classes.infoContainer }> Nothing found </div>

		}
		return <React.Fragment> { content } </React.Fragment>
	}
}

MovieDetails.propTypes = {
	classes: PropTypes.object.isRequired,
	infoActive: PropTypes.bool.isRequired,
	itemInfo: PropTypes.array

}

export default ( withStyles ( styles ) ( MovieDetails ) )