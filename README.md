# Svelte-scrollto

Animating vertical and horizontal scrolling

## Install

```bash
npm install --save-dev svelte-scrollto
# or
yarn add -D svelte-scrollto
```

## Usage

```html
<script>
  import * as animateScroll from "svelte-scrollto";
</script>

<a on:click={() => animateScroll.scrollToBottom()}> Scroll to bottom </a>
<a on:click={() => animateScroll.scrollToTop()}> Scroll to top </a>
<a on:click={() => animateScroll.scrollTo({element: 'scroll-to-element-selector'})}> Scroll to element </a>
<a on:click={() => animateScroll.scrollTo({element: 'scroll-to-element-selector', offset: 200})}> Scroll to below element 200px </a>
<a on:click={() => animateScroll.scrollTo({element: 'scroll-to-element-selector', duration: 2000})}> Scroll to element over 2000ms </a>
```


Using as a action
```html
<script>
  import { scrollto } from "svelte-scrollto";
</script>
<!-- Parameter is element selector or options -->
<a use:scrollto={'#scroll-element'}> Scroll to element </a>
```

## API

### Global Options

|     Option     | Required | Default value | Description |
| :------------: | :------: | :-----------: | :---------: |
| `container`    | 		✔     | `"body"`      | Scroll container 
| `duration`     | 		✔     | `500` 				| The duration (in milliseconds) of the scrolling animation.
| `delay`        | 		      | `0` 					|
| `offset`       | 		      | `0` 					| The offset that should be applied when scrolling. This option accepts a callback function
| `easing`       | 		      | `"cubicIn"` 	| The easing to be used when animating. Combine with [svelte easing][easing]
| `onStart`      | 		      | `noop` 				| A callback function that should be called when scrolling has started. Receives the target element and page offset as a parameter.
| `onDone`       | 		      | `noop` 				| A callback function that should be called when scrolling has ended. Receives the target element and page offset  as a parameter.
| `onAborting`   | 		      | `noop` 				| A callback function that should be called when scrolling has been aborted by the user (user scrolled, clicked etc.). Receives the target element and page offset as parameters.
| `scrollX`      | 		      | `false` 			| Whether or not we want scrolling on the `x` axis
| `scrollY`      | 		      | `true` 				| Whether or not we want scrolling on the `y` axis


Override global options:
```javascript
import * as animateScroll from "svelte-scrollto";

animateScroll.setGlobalOptions({
	offset: 200,
	onStart: (element, offset) => {
		if(element) {
			console.log("Start scrolling to element:", element);
		} else if(offset) {
			console.log("Start scrolling to page offset: (${offset.x}, ${offset.y})");
		}
	}
})
```

### Functions

#### `scrollTo(options)`
Accepts all global options and:
+ `element`: The element you want scroll to
+ `x`: The offset we want to scrolling on the x axis
+ `y`: The offset we want to scrolling on the y axis

#### `scrollToTop(options)`

Shortcut of use scrollTo with `x` equal to `0`.

#### `scrollToBottom(options)`

Shortcut of use scrollTo with `x` equal to *`containerHeight`*

### Actions

Svelte action that listens for `click` (`touchstart`) events and scrolls to elements with animation. 

+ `scrollto`

+ `scrolltotop`

+ `scrolltobottom`


### Troubleshooting

If you want to use Lazy and want to scroll to elements, you need to give your lazy components (images, v.v..) fixed dimensions, so the browser known the size of the not loaded elements before scrolling.


[easing]: https://github.com/sveltejs/svelte/blob/master/src/runtime/easing/index.ts
