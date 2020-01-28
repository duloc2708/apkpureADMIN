import * as postActions from "modules/post/actions/form";
import { Modal } from "react-bootstrap";
import { getListData } from "modules/uploads/actions/form";

class VideoFormView extends React.Component {
	_onShowVideos(item) {
		this.props.showModalVideo(true);
		this.props.handleVideos(item);
	}
	validate() {
		const { objVideo } = this.props.post;
		if (!objVideo.name) {
			alert("Vui lòng nhập tên bài học");
			return false;
		}
		if (!objVideo.url) {
			alert("Vui lòng nhập link video");
			return false;
		}
		return true;
	}
	_onSaveVideo() {
		if (this.validate()) {
			const { objVideo, objChapter, objArticle } = this.props.post;
			let objVideoTemp = _.clone(objVideo, true);
			objVideoTemp.chapterId = objChapter.id;
			this.props.submitVideo(objVideoTemp).then(() => {
				this.child._addNotification(`Cập nhật thành công!`, "success");
				this.props.editItemChapter(objChapter.id);
				this.props.editItemArticle(objArticle.id);
			});
		}
	}
	handleInput(e) {
		const { id, value } = e.target;
		const { objVideo } = this.props.post;
		let objVideoTemp = _.clone(objVideo, true);
		objVideoTemp[id] = value;
		this.props.updateInputDataVideo(objVideoTemp);
	}
	_onClickRow() {
		this.props.updateInputDataVideo(item);
	}
	_onRemoveVideo(item) {
		const { objChapter, objArticle } = this.props.post;
		this.props.removeVideo(item.id).then(() => {
			this.child._addNotification(`Cập nhật thành công!`, "success");
			this.props.editItemChapter(objChapter.id);
			this.props.editItemArticle(objArticle.id);
		});
	}
	_onHide() {
		this.props.showModalVideo(false);
	}
	ChangeValueComboboxMulti(obj) {
		let { key, data, keyValue } = obj;
		console.log(obj);
		const { objVideo } = this.props.post;
		let objVideoTemp = _.clone(objVideo, true);
		objVideoTemp["url"] = data;
		this.props.updateInputDataVideo(objVideoTemp);
	}
	componentDidMount() {
		this.props.getListData();
	}
	_parseDataFiles(data) {
		let newData = [];
		data.map(item => {
			newData.push({
				lable: item.name,
				value: item.fileId,
				code: item.fileId,
				name: item.name
			});
		});
		return newData;
	}
	render() {
		const {
			isModalVideo,
			listHeaderVideo,
			listDataVideos,
			objVideo
		} = this.props.post;
		const { data } = this.props.uploads;
		const newDatas = this._parseDataFiles(data);
		return (
			<Modal
				size="lg"
				show={isModalVideo}
				onHide={() => this._onHide()}
				aria-labelledby="example-modal-sizes-title-sm"
			>
				<Modal.Header closeButton>
					<Modal.Title>Danh sách bài học </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AlertCustom onRef={ref => (this.child = ref)} />
					<div>
						<div className="form-group">
							<div className="row">
								<div className="col-md-4">
									<div className="input-group">
										<input
											onChange={event =>
												this.handleInput(event)
											}
											id="name"
											placeholder="Nhập tên bài học ..."
											type="text"
											className="form-control"
										/>
									</div>
								</div>
								<div className="col-md-8">
									<div className="input-group">
										<ComboboxMultiple
											multi={true}
											css={"react-select"}
											comboOther={"url"}
											list_data_other={newDatas}
											id="url"
											value={objVideo.url}
											parentObject={this}
										/>
									</div>
								</div>
							</div>
							<br />
							<div className="row">
								<div className="col-md-12">
									<div className="input-group">
										<input
											onChange={event =>
												this.handleInput(event)
											}
											id="description"
											placeholder="Nhập mô tả  ..."
											type="text"
											className="form-control"
										/>
										<span className="input-group-btn">
											<button
												onClick={() =>
													this._onSaveVideo()
												}
												className="btn btn-secondary"
												type="button"
											>
												Cập nhật
											</button>
										</span>
									</div>
								</div>
							</div>
							<hr></hr>
							<div className="row">
								<div className="col-md-12">
									<label>Danh sách</label>
									<table className="table table-striped">
										<thead>
											<tr>
												{listHeaderVideo.map(item => {
													return (
														<th
															key={`header_key${item.key}`}
														>
															{item.title}
														</th>
													);
												})}
											</tr>
										</thead>
										<tbody>
											{listDataVideos &&
												listDataVideos.map(item => {
													const {
														id,
														name,
														duration,
														url,
														description
													} = item;
													return (
														<tr
															onCLick={() =>
																this._onClickRow(
																	item
																)
															}
															key={`header_data$d}`}
														>
															<td>{name}</td>
															<td>{duration}</td>
															<td>{url}</td>
															<td>
																{description}
															</td>
															<td>
																<button
																	onClick={() =>
																		this._onRemoveVideo(
																			item
																		)
																	}
																>
																	Xoá
																</button>
															</td>
														</tr>
													);
												})}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</Modal.Body>

				<Modal.Footer></Modal.Footer>
			</Modal>
		);
	}
}
const mapStateToProps = ({ userAuth, i18n, post, uploads }, ownProps) => {
	return {
		userAuth,
		i18n,
		ownProps,
		post,
		uploads
	};
};
const mapDispatchToProps = dispatch => {
	return Redux.bindActionCreators(
		{
			...ReactRouterRedux.routerActions,
			...postActions,
			getListData
		},
		dispatch
	);
};
export default ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(VideoFormView);
