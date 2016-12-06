export default (req, res, next) => {
  res.render('index', { title: 'DAS', session: req.session })
}
