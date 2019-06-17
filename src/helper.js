export default {
  $(selector) {
    if (typeof selector === "string") {
      return document.querySelector(selector);
    }
    return selector;
  },
  extend(...args) {
    return Object.assign(...args);
  },
  cumulativeOffset(element) {
    let top = 0;
    let left = 0;

    do {
      top += element.offsetTop || 0;
      left += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);

    return {
      top: top,
      left: left
    };
  },
  directScroll(element) {
    return element && element !== document && element !== document.body;
  },
  scrollTop(element, value) {
    let inSetter = value !== undefined;
    if (this.directScroll(element)) {
      return inSetter ? (element.scrollTop = value) : element.scrollTop;
    } else {
      return inSetter
        ? (document.documentElement.scrollTop = document.body.scrollTop = value)
        : window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;
    }
  },
  scrollLeft(element, value) {
    let inSetter = value !== undefined;
    if (this.directScroll(element)) {
      return inSetter ? (element.scrollLeft = value) : element.scrollLeft;
    } else {
      return inSetter
        ? (document.documentElement.scrollLeft = document.body.scrollLeft = value)
        : window.pageXOffset ||
            document.documentElement.scrollLeft ||
            document.body.scrollLeft ||
            0;
    }
  }
};
