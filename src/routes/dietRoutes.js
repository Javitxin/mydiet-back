const express = require('express')
const router = express.Router();
const DietController = require('../controllers/dietController.js')
const decodeToken = require('../middlewares/authMiddleware.js')


router.get('/') 
router.get('/user', decodeToken, DietController.getUserByMail)  //home del user
router.get('/user/:id/alldietary',decodeToken,  DietController.alldietary) // saca todos los dietarios
router.get('/user/:id/alldietary/:id_plan',decodeToken, DietController.getDietary) //dietario concreto con todas las recetas e ingredientes y demas
router.get('/user/:id/mytracking', decodeToken, DietController.getUserTracking) //seguimientos del usuario
router.get('/user/:id/myagenda', decodeToken, DietController.getUserTracking ) //las citas


router.get('/dashboard/users', decodeToken, DietController.getAllUsers) //salen todos los pacientes del dietista
router.get('/dashboard/users/:id', decodeToken, DietController.getUserTracking) //seguimiento del paciente ID
router.post('/dashboard/users/newuser', decodeToken, DietController.createNewUser)
router.get('/dashboard/users/:id/getuserbyid', decodeToken, DietController.getUserById)
router.put('/updateuser', decodeToken, DietController.updateUser)

router.get('/dashboard/recipes', decodeToken, DietController.getRecipes)
router.post('/dashboard/recipes/newrecipe', decodeToken, DietController.newRecipe)
router.put('/updatetracking', decodeToken, DietController.updateTracking)
router.put('/updatediary', decodeToken, DietController.updateDiary)
router.post('/dashboard/users/:id/newtracking', decodeToken, DietController.newTracking)

router.get('/dashboard/agenda', decodeToken, DietController.getAgenda)
router.get('/dashboard/diaries', decodeToken, DietController.getDiaries)
router.put('/dashboard/recipes/updaterecipe', decodeToken, DietController.updateRecipe)
router.post('/dashboard/diaries/newdiary', decodeToken, DietController.newDiary)
router.delete('/deletediary',decodeToken,DietController.deleteDiary)
router.delete('/deleterecipe',decodeToken,DietController.deleteRecipe)
router.post('/dashboard/users/:id/newplan', decodeToken, DietController.newPlan)
router.get('/dashboard/users/:id/:id_plan', decodeToken, DietController.getPlanByID)
router.put('/dashboard/users/:id/:id_plan', decodeToken, DietController.updatePlan )
 
module.exports = router;