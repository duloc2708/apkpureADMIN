const { DATE_NULL, DATA_LIMIT } = Config;
const { CheckEmpty, CheckAttr } = Check;
import CryptoJS from 'crypto-js'
var keyString = 'SAJI';
export const DisplayDate = (date) => {
	if (date === DATE_NULL) {
		return '';
	}
	if (CheckEmpty(date))
		return '';
	if (typeof date === 'undefined')
		return '';

	date = date.split(' ')[0];
	const dateArr = date.split('-');
	const year = dateArr[0];
	const month = dateArr[1];
	const day = dateArr[2];

	return day + '/' + month + '/' + year;
};
export const _formatMoney = (num) => {
	if (num && !_.isNaN(num)) {
		let p = (num.toString()).split(".")
		return p[0].split("").reverse().reduce(function (acc, num, i, orig) {
			return num == "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc
		}, "") + "." + (p[1] && p[1].length > 1 ? p[1].substring(0, 2) : p[1] && p[1].length == 1 ? p[1] + '0' : '00')
	}
	return '0.00'
}
export const DisplayDateTime = (dateTime) => {
	if (dateTime === DATE_NULL) {
		return '';
	}
	if (CheckEmpty(dateTime))
		return '';
	if (typeof dateTime === 'undefined')
		return '';

	let date = dateTime.split(' ')[0];
	const dateArr = date.split('-');
	const year = dateArr[0];
	const month = dateArr[1];
	const day = dateArr[2];

	let time = dateTime.split(' ')[1];
	const timeArr = time.split(':');
	const hour = timeArr[0];
	const minute = timeArr[1];
	const second = timeArr[2];

	return day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;
};

export const DisplayDateFriendly = (dateTime) => {
	if (dateTime === DATE_NULL) {
		return '';
	}
	if (CheckEmpty(dateTime))
		return '';
	if (typeof dateTime === 'undefined')
		return '';

	let date = dateTime.split(' ')[0];
	const dateArr = date.split('-');
	const year = dateArr[0];
	const month = parseInt(dateArr[1]);
	const day = parseInt(dateArr[2]);


	return `${day} Tháng ${month} Năm ${year}`;
};

export const GetFilesUpload = files => {
	let rFiles = [];
	files.map(file => {
		if (!CheckAttr(file, 'uid'))
			rFiles.push(file);
	});
	return rFiles;
};

export const GetTotalPages = all => {
	if (all === 0)
		return 1;
	return Math.ceil(all / DATA_LIMIT);
};

export const GetOffsetPage = page => {
	return (page - 1) * DATA_LIMIT;
};

export const DisableWebKeyboard = () => {
	document.onkeydown = function (event) {
		event = event || window.event;
		var control = event.which || event.keyCode || document.all;
		switch (control) {
			case 112:
			case 113:
			case 114:
			case 115:
			case 116:
			case 117:
			case 118:
			case 119:
			case 120:
				event.preventDefault();
				event.stopPropagation();
		}
	};
};

export const GetContentHeight = (element) => {
	return $(window).height() - 48 - 43;
};

export const ScrollIntoView = (element, container) => {
	/*if(typeof $(element).offset() !== 'undefined'){
		const containerTop = $(container).scrollTop();
		const containerBottom = containerTop + $(container).height();
		const elemTop = $(element).offset().top;
		const elemBottom = elemTop + $(element).height();
		if(elemTop < containerTop)
			$(container).scrollTop(elemTop);
		else if(elemBottom > containerBottom)
			$(container).scrollTop(elemBottom-$(container).height());
	}*/
};

export const GetListQuery = (list, offset, limit, search) => {
	let array = [];
	const length = (list.length <= (offset + limit)) ? list.length : (offset + limit);
	for (let i = offset; i < length; i++) {
		let l = list[i];
		var valid = true;
		for (var key in search) {
			var value = search[key];
			var lkey = l[key];
			if (typeof lkey.indexOf === 'function') {
				if (lkey.indexOf(value) === -1) {
					valid = false;
				}
			} else {
				if (lkey != value && value !== '') {
					valid = false;
				}
			}
		}
		if (valid)
			array.push(l);
	}
	return array;
};

export const round = (value, exp) => {
	if (typeof exp === 'undefined' || +exp === 0)
		return Math.round(value);

	value = +value;
	exp = +exp;

	if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
		return NaN;

	// Shift
	value = value.toString().split('e');
	value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

	// Shift back
	value = value.toString().split('e');
	return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
}
export const getParam = (url_string, key) => {
	const url = new URL(url_string)
	const val = url.searchParams.get(key)
	return val
}
export const roundNumber = (value, exp) => {
	if (typeof exp === 'undefined' || +exp === 0)
		return Math.round(value);

	value = +value;
	exp = +exp;

	if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
		return NaN;

	// Shift
	value = value.toString().split('e');
	value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

	// Shift back
	value = value.toString().split('e');
	return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
}

export const roundNumberPerThousand = (value) => {
	let cal = Math.round(value / 1000).toFixed(3) * 1000
	return cal
}

export const generateUUIDV4 = () => {
	var seed = Date.now();
	if (window.performance && typeof window.performance.now === "function") {
		seed += performance.now();
	}
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (seed + Math.random() * 16) % 16 | 0;
		seed = Math.floor(seed / 16);
		return (c === 'x' ? r : r & (0x3 | 0x8)).toString(16);
	});
	return uuid;
}

export const encryptString = (value) => {
	var wordArray = CryptoJS.enc.Utf8.parse(value + keyString);
	var data = CryptoJS.enc.Base64.stringify(wordArray);
	return data
}
export const decryptString = (value) => {
	var parsedWordArray = CryptoJS.enc.Base64.parse(value);
	var data = parsedWordArray.toString(CryptoJS.enc.Utf8);
	return data
}