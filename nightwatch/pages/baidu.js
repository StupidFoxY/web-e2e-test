let baiduCommands = {
  submitEvent() {
    this.api.pause(1000);
    return this.waitForElementVisible('@submit', 1000)
      .click('@submit')
  }
}

module.exports = {
  url: 'http://wwww.baidu.com',
  commands: [baiduCommands],
  elements: {
    searchBar: {
      selector: '#kw'
    },
    submit: {
      selector: '#su',
    }
  }
};
