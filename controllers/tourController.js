// const fs = require('fs');
const {
  findByIdAndDelete,
} = require('./../models/tourModel');
const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apifeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields =
    'name,price,ratingsAverage,summary,difficulty';
  next();
};

// const tours = JSON.parse(
//   fs.readFileSync(
//     `./dev-data/data/tours-simple.json`
//   )
// );

// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour id is: ${val}`);

//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Error 404',
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price)
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name or price',
//     });
//   next();
// };

exports.getAlltours = catchAsync(
  async (req, res, next) => {
    const features = new APIFeatures(
      Tour.find(),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });

    // try {
    //   console.log(req.query, '1');
    //   // BUILD QUERY
    // 1A) Filetering
    // const queryObj = { ...req.query };
    // const excludedFields = [
    //   'page',
    //   'sort',
    //   'limit',
    //   'fields',
    // ];

    // excludedFields.forEach(
    //   (el) => delete queryObj[el]
    // );

    // console.log(req.query, queryObj, '2');

    // // 1B) Advanced filtering
    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(
    //   /\b(gte|gt|lte|lt)\b/g,
    //   (match) => `$${match}`
    // );
    // console.log(JSON.parse(queryStr), '3');

    // // { difficulty : 'easy', duration : {$gte: 5}}

    // // const query = Tour.find(queryObj);
    // let query = Tour.find(JSON.parse(queryStr));

    // 2) Sorting
    // if (req.query.sort) {
    //   const sortBy = req.query.sort
    //     .split(',')
    //     .join(' ');
    //   console.log(sortBy);
    //   query = query.sort(sortBy);
    //   // sort('price ratingsAverage')
    // } else {
    //   query = query.sort('-createdAt');
    // }

    // 3) Field Limiting
    // if (req.query.fields) {
    //   const fields = req.query.fields
    //     .split(',')
    //     .join(' ');
    //   query = query.select(fields);
    // } else {
    //   query = query.select('-__v');
    // }

    // 4) Pagination
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;
    // // page=2&limit=10, 1-10,page 1, 11-20, page 2, 21-30 page 3
    // query = query.skip(skip).limit(limit);

    // if (req.query.page) {
    //   const numTours =
    //     await Tour.countDocuments();
    //   if (skip >= numTours)
    //     throw new Error(
    //       'This page does not exist'
    //     );
    // }

    //EXECUTE QUERY
    // const features = new APIFeatures(
    //   Tour.find(),
    //   req.query
    // )
    //   .filter()
    //   .sort()
    //   .limitFields()
    //   .paginate();
    // const tours = await features.query;

    // const query =  Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    // SEND RESPONSE
    // res.status(200).json({
    //   status: 'success',
    //   results: tours.length,
    //   data: {
    //     tours,
    //   },
    // });
    // } catch (err) {
    //   res.status(404).json({
    //     status: 'fail',
    //     message: err,
    //   });
    //   console.log(err);
    // }
    // // console.log(req.requestTime);
    // res.status(200).json({
    //   status: 'success',
    //   requestedAt: req.requestTime,
    //   results: tours.length,
    //   data: {
    //     tours,
    //   },
    // });
  }
);

exports.getTour = catchAsync(
  async (req, res, next) => {
    const tour = await Tour.findById(
      req.params.id
    );

    if (!tour) {
      return next(
        new AppError(
          'No tour found with that ID',
          404
        )
      );
    }
    // Tour.findOne({ _id: req.params.id });
    // Same as written above

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
    // try {
    //   // const tour = await Tour.findById(
    //   //   req.params.id
    //   // );
    //   // // Tour.findOne({ _id: req.params.id });
    //   // // Same as written above

    //   // res.status(200).json({
    //   //   status: 'success',
    //   //   data: {
    //   //     tour,
    //   //   },
    //   // });
    // } catch (err) {
    //   res.status(404).json({
    //     status: 'fail',
    //     message: err,
    //   });
    // }

    // console.log(req.params);
    // const id = req.params.id * 1;
    // const tour = tours.find((el) => el.id === id);
    // res.status(200).json({
    //   status: 'success',
    //   data: {
    //     tour,
    //   },
    // });
  }
);

exports.createTour = catchAsync(
  async (req, res, next) => {
    //
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
    // try {
    //   const newTour = await Tour.create(req.body);

    //   res.status(201).json({
    //     status: 'success',
    //     data: {
    //       tour: newTour,
    //     },
    //   });
    // } catch (err) {
    //   res.status(400).json({
    //     status: 'fail',
    //     message: err,
    //   });
    // }

    // console.log(req.body);
    // const newId = tours[tours.length - 1].id + 1;
    // const newTour = Object.assign(
    //   { id: newId },
    //   req.body
    // );
    // tours.push(newTour);
    // fs.writeFile(
    //   `${__dirname}/dev-data/data/tours-simple.json`,
    //   JSON.stringify(tours),
    //   (err) => {
    //     res.status(201).json({
    //       status: 'success',
    //       data: {
    //         tour: newTour,
    //       },
    //     });
    //   }
    // );
    // res.send('Done');
  }
);

exports.updateTour = catchAsync(
  async (req, res, next) => {
    const tour = await Tour.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!tour) {
      return next(
        new AppError(
          'No tour found with that ID',
          404
        )
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
    // try {
    //   // const tour = await Tour.findByIdAndUpdate(
    //   //   req.params.id,
    //   //   req.body,
    //   //   {
    //   //     new: true,
    //   //     runValidators: true,
    //   //   }
    //   // );
    //   // res.status(200).json({
    //   //   status: 'success',
    //   //   data: {
    //   //     tour,
    //   //   },
    //   // });
    // } catch (err) {
    //   res.status(404).json({
    //     status: 'fail',
    //     message: err,
    //   });
    // }

    // res.status(200).json({
    //   status: 'success',
    //   data: {
    //     tour: '<Updated tour here...>',
    //   },
    // });
  }
);

exports.deleteTour = catchAsync(
  async (req, res, next) => {
    const tour = await Tour.findByIdAndDelete(
      req.params.id
    );

    if (!tour) {
      return next(
        new AppError(
          'No tour found with that ID',
          404
        )
      );
    }

    res.status(204).json({
      status: 'succcess',
      message: `tour deleted`,
    });
    // try {
    //   const tour = await Tour.findByIdAndDelete(
    //     req.params.id
    //   );

    //   res.status(204).json({
    //     status: 'succcess',
    //     message: `tour deleted`,
    //   });
    // } catch (err) {
    //   res.status(404).json({
    //     status: 'fail',
    //     message: err,
    //   });
    // }

    // res.status(204).json({
    //   status: 'success',
    //   data: null,
    // });
  }
);

exports.getTourStats = catchAsync(
  async (req, res, next) => {
    const stats = await Tour.aggregate([
      {
        $match: {
          ratingsAverage: { $gte: 4.5 },
        },
      },
      {
        $group: {
          // _id: null,
          _id: { $toUpper: '$difficulty' },
          num: { $sum: 1 },
          numRatings: {
            $sum: '$ratigsQuantity',
          },
          avgRating: {
            $avg: '$ratingsAverage',
          },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
      // {
      //   $match: { _id: { $ne: 'EASy' } },
      // },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
    // try {
    //   const stats = await Tour.aggregate([
    //     {
    //       $match: {
    //         ratingsAverage: { $gte: 4.5 },
    //       },
    //     },
    //     {
    //       $group: {
    //         // _id: null,
    //         _id: { $toUpper: '$difficulty' },
    //         num: { $sum: 1 },
    //         numRatings: {
    //           $sum: '$ratigsQuantity',
    //         },
    //         avgRating: {
    //           $avg: '$ratingsAverage',
    //         },
    //         avgPrice: { $avg: '$price' },
    //         minPrice: { $min: '$price' },
    //         maxPrice: { $max: '$price' },
    //       },
    //     },
    //     {
    //       $sort: { avgPrice: 1 },
    //     },
    //     // {
    //     //   $match: { _id: { $ne: 'EASy' } },
    //     // },
    //   ]);

    //   res.status(200).json({
    //     status: 'success',
    //     data: {
    //       stats,
    //     },
    //   });
    // } catch (err) {
    //   res.status(404).json({
    //     status: 'fail',
    //     message: err,
    //   });
    // }
  }
);

exports.getMonthlyPlan = catchAsync(
  async (req, res, next) => {
    const year = req.params.year * 1;

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { numTourStarts: -1 },
      },
      {
        $limit: 12,
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        plan,
      },
    });
    // try {
    //   const year = req.params.year * 1;

    //   const plan = await Tour.aggregate([
    //     {
    //       $unwind: '$startDates',
    //     },
    //     {
    //       $match: {
    //         startDates: {
    //           $gte: new Date(`${year}-01-01`),
    //           $lte: new Date(`${year}-12-31`),
    //         },
    //       },
    //     },
    //     {
    //       $group: {
    //         _id: { $month: '$startDates' },
    //         numTourStarts: { $sum: 1 },
    //         tours: { $push: '$name' },
    //       },
    //     },
    //     {
    //       $addFields: { month: '$_id' },
    //     },
    //     {
    //       $project: {
    //         _id: 0,
    //       },
    //     },
    //     {
    //       $sort: { numTourStarts: -1 },
    //     },
    //     {
    //       $limit: 12,
    //     },
    //   ]);

    //   res.status(200).json({
    //     status: 'success',
    //     data: {
    //       plan,
    //     },
    //   });
    // } catch (err) {
    //   res.status(404).json({
    //     status: 'fail',
    //     message: err,
    //   });
    // }
  }
);
