import { Router } from 'express'
import { deleteUser, getUserById, getUsers, signinUser, signupUser, updateUser } from '../controllers/userControllers';
const userRouter = Router();

/* GET */
userRouter.get('/user', getUsers);
userRouter.get('/user/:id', getUserById);

/* POST */
userRouter.post('/user/register', signupUser);
userRouter.post('/user/login', signinUser);

/* UPDATE */
userRouter.put('/user/update/:id', updateUser);

/* DELETE */
userRouter.delete('/user/delete/:id', deleteUser);

export default userRouter;
