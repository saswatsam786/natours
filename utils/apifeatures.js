class APIFeatures {
  constructor(query, queryString) {
    // query from mongoose and queryString from express
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = [
      'page',
      'sort',
      'limit',
      'fields',
    ];

    excludedFields.forEach(
      (el) => delete queryObj[el]
    );

    //console.log(req.query, queryObj, '2');

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    console.log(JSON.parse(queryStr), '3');

    // { difficulty : 'easy', duration : {$gte: 5}}

    // const query = Tour.find(queryObj);

    this.query = this.query.find(
      JSON.parse(queryStr)
    );
    // let query = Tour.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort
        .split(',')
        .join(' ');
      console.log(sortBy);
      this.query = this.query.sort(sortBy);
      // sort('price ratingsAverage')
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields
        .split(',')
        .join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit =
      this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    // page=2&limit=10, 1-10,page 1, 11-20, page 2, 21-30 page 3
    this.query = this.query
      .skip(skip)
      .limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
