import { Request, Response } from "express";
import {createUser, deleteUser, getAllUsers, getUserByGoogleId, getUserById, updateUser} from "./UserController";

class UserAuthController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { googleId, email, username, imageUser } = req.body;

    // Verifica se o usuário já existe pelo googleId
    const existingUser = await getUserByGoogleId(googleId);
    if (existingUser) {
      return res.json({ error: "Usuário já existe", props: "googleId" });
    }

    // Cria um novo usuário
    const user = await createUser({ googleId, email, username, imageUser}).catch((e) => {
      return { error: e.message, props: "" };
    });

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id, googleId, email, username, imageUser } = req.body;

    // Obtém o usuário pelo id
    const user = await getUserById(id);

    if (!user) {
      return res.json({ error: "Usuário inexistente", props: "user" });
    }

    // Atualiza os dados do usuário
    user.googleId = googleId;
    user.email = email;
    user.username = username;
    user.imageUser = imageUser;

    const updatedUser = await updateUser(user).catch((e) => {
      return { error: e.message, props: "" };
    });

    return res.json(updatedUser);
  }

  public async list(_: Request, res: Response): Promise<Response> {
    const users = await getAllUsers();
    return res.json(users);
  }

  public async listById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    console.log("id", id);
    const user = await getUserById(parseInt(id, 10));
    return res.json(user);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;

    // O método delete retorna o objeto {"raw": [],"affected": 1}
    // A propriedade affected terá valor 0 se não tiver sido excluído o registro
    const { affected } = await deleteUser(id);

    return res.json({ affected });
  }
}

export default new UserAuthController();
