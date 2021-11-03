import JQuery from 'jquery';

class Loading {
  public static instance: Loading;
  private loadingEl: JQuery<HTMLElement>;

  public static getInstance(): Loading {
    if (!Loading.instance) {
      Loading.instance = new Loading();
    }
    return Loading.instance;
  }

  private constructor() {
    this.makeLoadingEl();
    this.loadingEl = JQuery('#loading');
  }

  private makeLoadingEl() {
    if (!JQuery('#loading').length) {
      document.body.append('<div id="loading"></loading');
    }

    if (!JQuery('#loading > #spinner').length) {
      JQuery('#loading').append('<div id="spinner"></div>');
    }
  }

  public getEl() {
    return this.loadingEl;
  }
}

export default Loading;
