class CustomTable extends React.Component {
	onClickRow(item, checked) {
		this.props.parentObject._onClickRow(item, checked);
	}
	onClickButtonNoPermission(obj) {
		this.props.parentObject.onClickButtonNoPermission(obj);
	}
	onClickButtonPermission(obj) {
		this.props.parentObject.onClickButtonPermission(obj);
	}
	changeValueNumber(obj) {
		this.props.parentObject.changeValueNumber(obj);
	}
	onKeyPressInput(obj) {
		this.props.parentObject.onKeyPressInput(obj);
	}
	ChangeValueCombobox(obj) {
		this.props.parentObject.ChangeValueCombobox(obj);
	}
	_renderSumary() {
		let { list_col, list_data } = this.props || {};
		let listColData = [];
		list_col.map((item, i) => {
			let {
				type,
				title,
				key,
				format,
				icon,
				width,
				toFixedNum,
				isSum,
				isReal,
				custom
			} = item;
			if (i == 0) {
				listColData.push(
					<td key={`td_total__${key}`}>
						<b>Tổng cộng</b>
					</td>
				);
			} else {
				if (isSum) {
					let totalData = _.sum(_.map(list_data, key));
					switch (format) {
						case "money":
							totalData = totalData
								? SportConfig.function._formatMoney(totalData)
								: "";
							break;
						case "gold":
							totalData = totalData
								? SportConfig.function._formatGold(totalData)
								: "";
							break;
						default:
							break;
					}
					listColData.push(
						<td key={`td_total_${key}`}>
							<b>
								{title}: {totalData}
							</b>
						</td>
					);
				} else {
					listColData.push(<td key={`td_total__${key}`}></td>);
				}
			}
		});
		return listColData;
	}
	_onLinkRow(obj){
		this.props.parentObject._onClickRow(obj);
	}
	_renderCol(obj, index) {
		let { list_col } = this.props || {};
		let listColData = [];
		list_col.map((item, i) => {
			let {
				type,
				key,
				format,
				icon,
				width,
				toFixedNum,
				isSum,
				type_code,
				codeCustom,
				custom
			} = item;
			let valueData = obj[key];
			switch (type) {
				case "checked":
					listColData.push(
						<th scope="row" key={`colCheck_${index}`}>
							<label>
								<input
									type="checkbox"
									checked={valueData}
									onChange={() =>
										this.onClickRow(obj, !valueData)
									}
								/>
							</label>
						</th>
					);
					break;

				case "inputNumber":
					listColData.push(
						<td key={`td_${index}_${key}_${i}`}>
							<InputNumberFormat
								width={width}
								toFixedNum={toFixedNum}
								id={index}
								keyInput={key}
								value={valueData || ""}
								parentObject={this}
							/>
						</td>
					);
					break;
				case "link":
						listColData.push(
							<td key={`td_${index}_${key}_${i}`}><a  onClick={()=>this._onLinkRow(obj)}>{valueData}</a></td>
						);
						break;
				case "text":
					let valueFomart = valueData ? valueData : "";
					switch (format) {
						case "money":
							valueFomart = valueFomart
								? SportConfig.function._formatMoney(valueFomart)
								: "";
							break;
						case "gold":
							valueFomart = valueFomart
								? SportConfig.function._formatGold(valueFomart)
								: "";
							break;
						default:
							break;
					}
					listColData.push(
						<td key={`td_${index}_${key}_${i}`}>{valueFomart}</td>
					);
					break;
				case "combobox":
					listColData.push(
						<td key={`td_${index}_${key}_${i}`}>
							<Combobox
								width={width}
								type_code={type_code}
								keyInput={key}
								id={index}
								value={valueData}
								parentObject={this}
							/>
						</td>
					);
					break;
				case "button":
					listColData.push(
						<td key={`td_${index}_${key}_${i}`}>
							<ButtonPermission
								type={key}
								key={key}
								nameBtn={key}
								icon={icon}
								data={{
									item: obj,
									status: "",
									codeCustom: codeCustom
								}}
								parentObject={this}
							/>
							{/* <button ><i className={icon} aria-hidden="true"></i></button> */}
						</td>
					);
					break;
				case "button-no-per":
					listColData.push(
						<td key={`td_${index}_${key}_${i}`}>
							<button
								onClick={() =>
									this.onClickButtonNoPermission({
										key: key,
										data: obj
									})
								}
							>
								{" "}
								<i className={icon} aria-hidden="true"></i>
							</button>
						</td>
					);
					break;
				case "date":
					listColData.push(
						<td key={`td_${index}_${key}_${i}`}>
							{(valueData &&
								moment.utc(valueData).format(format)) ||
								""}
						</td>
					);
					break;
				default:
					break;
			}
		});
		return listColData;
	}
	_changeSortTable(item) {
		this.props.parentObject.changeSortTable(item);
	}
	_onKeyPressFilter(e) {
		if (e.key == "Enter") {
			let { id, value } = e.target;
			let obj = { id, value };
			this.props.parentObject.onChangeFilterTable(obj);
		}
	}
	render() {
		const { list_col, list_data, idTable, idBody } = this.props || {};
		let checkSum = list_col.filter(x => x.isSum == true);
		let checkFilter = list_col.filter(x => x.filter == true);
		return (
			<table id={`${idTable}`} className="table table-striped">
				<thead>
					<tr key={`tr_title`}>
						{list_col.map((item, i) => {
							let { key, title, sort, sortBy } = item;
							return (
								<th
									style={{ textAlign: "left" }}
									key={`thead_${key}_${i}`}
									scope="col"
								>
									{title}
									{sort ? (
										<a style={{ pointerEvents: `auto` }}>
											<i
												onClick={() =>
													this._changeSortTable(item)
												}
												className={`${
													sort
														? `fa fa-fw fa-sort${
																sortBy
																	? "-" +
																	  sortBy
																	: ""
														  }`
														: ""
												}`}
											></i>
										</a>
									) : (
										""
									)}
								</th>
							);
						})}
					</tr>
					{checkFilter.length > 0 ? (
						<tr key={`tr_filter`}>
							{list_col.map((item, i) => {
								let { key, title, sort, sortBy, filter } = item;
								return (
									<th
										style={{ textAlign: "left" }}
										key={`thead_${key}_${i}`}
										scope="col"
									>
										{filter ? (
											<input
												id={key}
												type="text"
												onKeyPress={e =>
													this._onKeyPressFilter(e)
												}
												//  onClick={(e) => this._onChangeFilterTable(e)}
												className={`name form-control`}
											/>
										) : (
											""
										)}
									</th>
								);
							})}
						</tr>
					) : (
						""
					)}
				</thead>
				<tbody id={`${idBody}`}>
					{list_data.map((item, i) => {
						let listCol = this._renderCol(item, i);
						return <tr key={`tr_${idTable}_${i}`}>{listCol}</tr>;
					})}
					{checkSum.length > 0 ? (
						<tr key={`tr_${idTable}_${`total`}`}>
							{this._renderSumary()}
						</tr>
					) : (
						""
					)}
				</tbody>
			</table>
		);
	}
}
module.exports = CustomTable;
