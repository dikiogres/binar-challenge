const {Router} =require('express');
const router = Router();
const authControllers = require('../controllers/authControllers')

router.get('/', authControllers.gethome)
router.get('/home', authControllers.get_home)
router.get('/game', authControllers.get_game)
router.get('/dashboard', authControllers.get_dashboard)
router.post('/login', authControllers.post_login)
router.post('/dashboard/create', authControllers.post_dashboard)
router.delete('/dashboard/delete/:id', authControllers.delete_dashboard)
router.put('/dashboard/update/:id', authControllers.update_dashboard)

module.exports= router;