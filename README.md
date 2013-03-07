[jQuery Context Sensitive Menu](http://www.trunknetworks.com)
================================

This jQuery UI menu plugin provides a simeple to use context-sensitive menu for use anywhere within your projects.

## Getting Started

Include jQuery, jQuery UI and the plugin on a page. Then select an item or area to have a context sensitive menu on.

```html
<table id="RightClickArea">
	<thead>
		<tr><th>Header 1</th><th>Header 2</th><th>Header 3</th></tr>
	</thead>
	<tbody>
		<tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td></tr>
		<tr><td>Cell 4</td><td>Cell 5</td><td>Cell 6</td></tr>
	</tbody>
</table>

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
