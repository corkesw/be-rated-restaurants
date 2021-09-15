const handleInvalidPath = (req, res) => {
  res.status(404).send({ msg: "Invalid URL" });
};

const handlePsqlErrors = (err, req, res, next) => {
    if (err.code === '23502' || err.code === '22001' || err.code === '22P02' || err.code === '42703') {
        res.status(400).send({msg: 'Bad request'})
    } else next(err)
}

const handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({msg: err.msg})
  } else next (err)
} 

handleServerErrors = (err, req, res, next) => {
    console.log(err, 'errors 19');
    res.status(500).send({ msg: 'Internal Server Error' });
  };

module.exports = { handleInvalidPath, handlePsqlErrors, handleCustomErrors, handleServerErrors };
