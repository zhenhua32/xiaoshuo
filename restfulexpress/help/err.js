let err = {
    json400: j400,
    json404: j404,
    json500: j500
};
// 400 Bad Request
function j400(err, res) {
  res.status(400);
  res.json({
    err: err.message,
    msg: 'bad request, params is not satisfied'
  });
}
// 404 Not Found
function j404(err, res) {
  res.status(404);
  res.json({
    err: err.message,
    msg: 'Not Found'
  })
}
// 500 Internal Server Error
function j500(err, res) {
  console.log(err);
  res.status(500);
  res.json({
    err: err.message,
    msg: 'something bad happen'
  })
}

module.exports = err;