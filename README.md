# Reusable table component

This project builds a reusable table component which enables rows to be selected.

### How to:

· Run `npm run dev` to start dev server on local
· Run `npm run test` to run unit tests.

### Features include:

· Only those that have a status of "available" are currently able to be downloaded.
Your implementation should manage this. The Download button will be disabled if none selected rows are available to download.
· The select-all checkbox should be in an unselected state if no items are selected.
· The select-all checkbox should be in a selected state if all items are selected.
· The select-all checkbox should be in an indeterminate state if some but not all
items are selected.
· The "Selected 2" text should reflect the count of selected items and display
"None Selected" when there are none selected.
· Clicking the select-all checkbox should select all items if none or some are
selected.
· Clicking the select-all checkbox should de-select all items if all are currently
selected.
· Status should be correctly formatted
· Clicking "Download Selected" when some or all items are displayed should
generate an alert box with the path and device of all selected files.
· The selectable feature can be turned on/off with props. When it's off, it just shows a simple table.
· Table name, table head can also be customizable, depending on the shape of the input data.
