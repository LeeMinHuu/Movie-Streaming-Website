const { calculateLimitAndOffset, paginate } = require("paginate-info");

exports.paging = (data, page, pageSize) => {
  const { limit, offset } = calculateLimitAndOffset(page, pageSize);
  const count = data.length;
  const paginatedData = data.slice(offset, offset + limit);
  const paginationInfo = paginate(page, count, paginatedData);
  return { paginatedData, paginationInfo };
};
