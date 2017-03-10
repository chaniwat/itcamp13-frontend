var DefaultOption = {
  mode: 'MAIN_APP'
}

export class AppOptions {

  constructor(options = {}) {
    this.mode = options.mode ? options.mode : DefaultOption.mode;
  }

}
