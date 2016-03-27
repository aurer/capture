module.exports = {
  fonts: [],

  add: function (font) {
    this.fonts.push(font);
    return this;
  },

  load: function () {
    WebFontConfig = {
      google: { families: this.fonts }
    };
    var wf = document.createElement('script');
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  }
}
