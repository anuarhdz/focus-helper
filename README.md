# focus-helper

Helper for focus management within components

Install:
`npm install focus-helper`

Use:

```js
import { focusHelper, removeFocusHelper } from "focus-helper";

// use focusHelper to keep the focus inside a container (to traverse all its child elements that can receive focus)
const container = document.querySelector(".element-with-focusable-elements");
const firstElementToFocus = container.querySelector(".another-query");
const anotherElement = document.querySelector(".another-element");
focusHelper(container, firstElementToFocus);

// use removeFocusHelper to stop focusHelper from running. Additionally you can assign as a parameter the element that will receive the focus next
removeFocusHelper(anotherElement);
```

focusHelper can be very useful to accompany the operation of navigation menus or accessilble components that must maintain the focus order in a certain context while its component is being used.
