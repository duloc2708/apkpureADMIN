import * as langActions from 'modules/language/actions/form'
class LanguageFormView extends React.Component {
	_expandLang() {
		$('.dropdown-lang').children("ul.dropdown-menu")
			.slideToggle("show")
	}
	_selectLang(event) {
		const { locale } = this.props.i18n || {}
		const langChange = (event && event.target) ? event.target.value : null
		if (locale != langChange &&
			langChange) {
			this.props.changeLang(langChange)
		}
		$('.dropdown-lang').children("ul.dropdown-menu")
			.slideToggle("show")
	}
	componentWillUnmount() {
		let dropdown = $('.dropdown-lang')
		document.removeEventListener('click', (event) => {
			let $trigger = $(".dropdown-lang")
			if ($trigger != event.target &&
				!$trigger.has(event.target).length) {
				$(".dropdown-menu").slideUp("fast")
			}
		}, false)
	}
	componentDidMount() {
		//this.changeLangLiveChat()
	}
	changeLangLiveChat() {
		const { list_id_livechat } = this.props.language || {}
		const { locale } = this.props.i18n || {}
		let live_chat = list_id_livechat.find(x => x.lang == locale);
		let ss = `(function(d, src, c) { var t=d.scripts[d.scripts.length - 1],s=d.createElement('script');s.id='la_x2s6df8d';s.async=true;s.src=src;s.onload=s.onreadystatechange=function(){var rs=this.readyState;if(rs&&(rs!='complete')&&(rs!='loaded')){return;}c(this);};t.parentElement.insertBefore(s,t.nextSibling);})(document,
			'https://kolabslocdu.ladesk.com/scripts/track.js',
			function(e){
			  function _getSubdomain(h) {
				var parts = h.split(".");
				if (parts.length == 2) return "www";
				return parts[0]
			  }
			  var hostname = window.location.hostname;
			  var subDM = _getSubdomain(hostname)
			  var SUBDOMAIN_ASIA = 'dev-asianbetonline'
			  if(subDM!=SUBDOMAIN_ASIA) {
				  LiveAgent.createButton('${live_chat && live_chat.id || ''}', e);
				}});`;
		const s = document.createElement('script');
		s.setAttribute("id", "script_livechat");
		s.type = 'text/javascript';
		s.async = true;
		s.innerHTML = ss
		document.body.appendChild(s);
	}
	componentDidUpdate() {
		//SportConfig._removeCookie('LaRunningChat')
		// $('.i-embedded-chat').remove()
		// var divs = document.getElementsByTagName('div'),
		// 	forEach = Array.prototype.forEach,
		// 	regex = /^b_.*$/;
		// forEach.call(divs, function (d) {
		// 	if (d.id !== undefined && regex.test(d.id)) {
		// 		d.parentNode.removeChild(d);
		// 	}
		// });
		// $('#script_livechat').remove()
		// this.changeLangLiveChat()
		//window.location.reload()
	}
	render() {
		const { locale } = this.props.i18n || {}
		let mutiLang = SportConfig.mutiLang
		const { hostname } = window.location || {}
		const subDM = SportConfig._getSubdomain(hostname)
		return (
			<div className="language">
				<select onChange={event => {
					this._selectLang(event)
				}} className={`${subDM != Config.SUBDOMAIN_ASIA ? '' : 'dropdown-language width-100'}`}
					selected={locale}
					value={locale}>
					{Object.keys(mutiLang).map((langKey, langI) => {
						return (
							<option
								className={`${locale == mutiLang[langKey].value ? 'active' : ''}`}
								key={`lang_${langI}`} value={langKey}>
								{mutiLang[langKey].name}
							</option>
						)
					})}
				</select>
			</div>
		)
	}
}
const mapStateToProps = ({ i18n, language }) => {
	return {
		i18n,
		language
	}
}
const mapDispatchToProps = (dispatch) => {
	return Redux.bindActionCreators({
		...langActions
	}, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(LanguageFormView)