[jQuery Context Sensitive Menu](http://www.trunknetworks.com)
================================

This jQuery UI menu plugin provides a simeple to use context-sensitive menu for use anywhere within your projects.

## Getting Started

Include jQuery, jQuery UI and the plugin on a page. Then select an item or area to have a context sensitive menu on.

```html
<div id="RightClickArea">
</div>

<script>
	var options = [
		{id:1,label:'Ireland'},
		{id:4,label:'England',options:[
			{id:5, label:'Brighton'},
			{id:6, label:'London'},
			{id:7, label:'Manchester'}
		]},
		{id:2,label:'France'},
		{id:3,label:'Germany'}
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
</script>
```
