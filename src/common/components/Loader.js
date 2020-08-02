import ReactLoading from "react-loading";

class Loader extends React.Component {
	render() {
		const { loading } = this.props || {};
		if (loading) {
			return (
				<div
					style={{
						position: "fixed",
						top: "auto",
						left: "auto",
						bottom: "50%",
						right: "50%"
					}}
				>
					<ReactLoading type={"spin"} color={"#1a6d96"} />
				</div>
			);
		} else {
			return <div></div>;
		}
	}
}
// Loader.propTypes = {
// 	loading: React.PropTypes.bool.isRequired
// }
Loader.defaultProps = {
	loading: false
};
module.exports = Loader;
