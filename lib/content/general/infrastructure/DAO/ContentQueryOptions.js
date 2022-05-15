//Pattern: Query Object
class ContentQueryOptions {
  constructor(
    term = '',
    dStart = undefined,
    dEnd = undefined,
    sort = 'datePublished',
    sortAscDesc = -1,
    limit = 10,
    skip = 0
  ) {
    this.term = term;
    this.dStart = dStart;
    this.dEnd = dEnd;
    this.sort = sort;
    this.sortAscDesc = parseInt(sortAscDesc);
    this.limit = parseInt(limit);
    this.skip = parseInt(skip);
    if (!this.dStart) {
      this.dStart = new Date().toISOString();
    } else {
      try {
        this.dStart = new Date(dStart);
        this.dStart = this.dStart.toISOString();
      } catch (err) {
        console.log('Error at converting dStart to Date');
      }
    }
    if (!this.dEnd) {
      let e = new Date();
      e.setHours(e.getHours() - 72);
      this.dEnd = e.toISOString();
    } else {
      try {
        this.dEnd = new Date(dEnd);
        this.dEnd = this.dEnd.toISOString();
      } catch (err) {
        console.log('Error at converting dEnd to Date');
      }
    }
    if (this.term != '') {
      this.term = new RegExp(this.term);
    }
  }
}

module.exports = ContentQueryOptions;
