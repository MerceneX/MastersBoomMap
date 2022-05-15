const createPipeline = options => {
  const match = {
    $and: [
      {
        $or: [
          {
            description: {
              $regex: options.term
            }
          },
          { location: { $regex: options.term } },
          {
            roadSection: {
              $regex: options.term
            }
          }
        ]
      },
      {
        datePublished: { $lte: options.dStart }
      },
      {
        datePublished: { $gte: options.dEnd }
      }
    ]
  };

  let pipeline = [
    {
      $match: match
    },
    { $sort: { [options.sort]: options.sortAscDesc } },
    { $project: { _id: 0 } },
    { $skip: options.skip },
    { $limit: options.limit }
  ];
  return pipeline;
};

module.exports = createPipeline;
