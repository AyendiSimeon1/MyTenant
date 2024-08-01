const { query, validationResult } = require(express-validator)

const validatePaginationParams = [
    query('page').optional().isInt({ min:1 }).toInt(),
    query('limit').optional().isInt({ min:1, max:100 }).toInt(),
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.arry() });
    }
    next();
}

const paginateResults = async (model, query, page =1, limit = 0) => {
   const skip = (page -1) *limit;
   const total = await model.countDocuments(query);
   const items = await model.find(query).skip(skip).limit(limit);
   
   return {
    items,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalItems: total
   };
}

module.exports = { validatePaginationParams, handleValidationErrors }
