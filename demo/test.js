var options = [
	{id:1,label:'Ireland'},
	{id:2,label:'England',options:[
		{id:5, label:'Brighton'},
		{id:6, label:'London'},
		{id:7, label:'Manchester'}
	]},
	{id:3,label:'France'},
	{id:4,label:'Germany'}
]

$(document).ready(function() {
	$('#RightClickArea').customMenu({
		option_list_callback: function() {
			return options;
		},
		item_selected: function(data) {
			alert('You selected: ' + data.label);
		}
	});
});
