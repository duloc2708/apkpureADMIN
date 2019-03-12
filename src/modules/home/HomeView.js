

import MenuTopView from 'modules/menu.top/MenuTopView'
import MenuNavView from 'modules/menu.nav/MenuNavView'
class HomeView extends React.Component {
	// shouldComponentUpdate (nextProps, nextState) { 
	// 	return shallowCompare(this, nextProps, nextState)
	//  }
	render() {
		console.log('LOCALHOST_PHOTO',Config.LOCALHOST_PHOTO);
		
		return (
			<div id="page-top">
				<MenuTopView />
				<div id="wrapper">
					<MenuNavView />
					<div id="content-wrapper">
						{this.props.children}
						{/*Sticky Footer */}
						{/* <footer className="sticky-footer">
						<div className="container my-auto">
							<div className="copyright text-center my-auto">
								<span>Copyright © Your Website 2018</span>
							</div>
						</div>
					</footer> */}

					</div>
				</div>

				<a className="scroll-to-top rounded" href="#page-top">
					<i className="fas fa-angle-up"></i>
				</a>

				{/* <Logout /> */}
			</div>
		)
	}
}

export default HomeView
