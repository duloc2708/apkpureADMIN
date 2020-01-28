import { updateDataImageUploads } from "modules/post/actions/form";
import * as uploadActions from "modules/uploads/actions/form";
var tus = require("tus-js-client");
class UploadsFormView extends React.Component {
	componentDidMount() {
		this.props.getListData();
	}
	_onChangeFile(e) {
		// Get the selected file from the input element
		var file = e.target.files[0];
		// Create a new tus upload
		var upload = new tus.Upload(file, {
			endpoint: "http://localhost:1080/uploads/",
			retryDelays: [0, 1000, 3000, 5000],
			metadata: {
				filename: file.name,
				filetype: file.type
			},
			onError: function(error) {
				console.log("Failed because: " + error);
			},
			onProgress: function(bytesUploaded, bytesTotal) {
				var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(
					2
				);
				console.log(bytesUploaded, bytesTotal, percentage + "%");
			},
			onSuccess: function() {
				let url = upload.url;
				let stuff = url.split("/");
				let id = stuff[stuff.length - 1];
				axios.post(`${Config.API_URL}files/upload`, {
					fileId: id,
					name: upload.file.name,
					type: upload.file.type.split("/")[1]
				});
			}
		});
		// Start the upload
		upload.start();
	}
	_onRemove(item) {}
	render() {
		const { data, listHeader } = this.props.uploads;
		return (
			<div
				className="form-group"
				style={{
					margin: "10px",
					marginBottom: "50px",
					height: "500px"
				}}
			>
				<input type={"file"} onChange={e => this._onChangeFile(e)} />
				<hr />
				<table className="table">
					<thead>
						<tr>
							{listHeader.map((item, i) => {
								return <th key={item.code}>{item.label}</th>;
							})}
						</tr>
					</thead>
					<tbody>
						{data.map((itemDta, i) => {
							return (
								<tr
									key={itemDta.id}
									// onClick={() =>
									//   that._checkClickRow(itemDta, !itemDta.checked)
									// }
								>
									<td>{itemDta.fileId}</td>
									<td>{itemDta.name}</td>
									<td>{itemDta.type}</td>
									<td>
										<button
											onClick={() =>
												this._onRemove(itemDta)
											}
										>
											<i
												className="fa fa-trash"
												aria-hidden="true"
											></i>
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}
const mapStateToProps = ({ i18n, uploads }, ownProps) => {
	return {
		i18n,
		uploads
	};
};
const mapDispatchToProps = dispatch => {
	return Redux.bindActionCreators(
		{
			...ReactRouterRedux.routerActions,
			updateDataImageUploads,
			...uploadActions
		},
		dispatch
	);
};
export default ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(UploadsFormView);
