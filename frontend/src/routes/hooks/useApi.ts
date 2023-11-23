import { UsersProps } from "../../types";
import service from "../../services/UsersService";
import { Search } from "../utils/SearchMethods";

export const useApi = () => ({
  validateToken: async (alias:string, email:string, token: string) => {
    const user = await getUser(alias, email);
    const response = user.token === token ? user : null;

    return response;
  },

  signin: async (name: string, email: string, jtiToken: string) => {
    let user = await getUser(name, email);
    user.token = jtiToken;
    const id = user.id;
    const mail = user.mail;
    const alias = user.alias;
    const token = user.token;
    const phone = user.phone;

    return await service.put({ id, alias, mail, phone, token });
  },

  logout: async (name: string, email: string) => {
    let user = await getUser(name, email);
    const id = user.id;
    const mail = user.mail;
    const alias = user.alias;
    const token = "";
    const phone = user.phone;
    await service.put({ id, alias, mail, phone, token });
  },
});

let users: UsersProps[] = [];

async function getUsers() {
    try {
      const data = await service.get();
      users = data;
    } catch (error) {
      console.log(error);
    }
  }

async function getUserPosition(email:string) {
  await getUsers();
  /* Cria lista de emails*/
  let mailList: string[] = [];

  /* Se usuários existem, popula a lista de email dos usuários */
  if (users.length > 0) {
    users?.map((user) => mailList.push(user.mail));
  }

  let s_number = new Search<number>();

  return s_number.sequential_ws(email, mailList);
}

async function registerUser(alias: string, mail: string) {
  await service.post({
    alias: alias.trim(),
    mail: mail.trim(),
    phone: "",
  });
}

async function getUser(alias: string, email:string) {
  let position = await getUserPosition(email);

  /* Se o email ainda não estiver no banco de dados, ele então é cadastrado */
  if (position === -1) {
    registerUser(alias, email);
    position = await getUserPosition(email);
  }
  return users[position];
}
