export default (req, res, next) => {
  res.render('index', { title: 'Express', session: req.session })
}
