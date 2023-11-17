import { Repository, FindOneOptions } from "typeorm";
import { User } from "../entities/User";
import { createConnection, Connection, getRepository } from "typeorm";

let userRepository: Repository<User>;

async function initializeService(): Promise<void> {
  const connection: Connection = await createConnection();
  userRepository = getRepository(User);
}

export async function createUser(user: Partial<User>): Promise<User> {
  const newUser = userRepository.create(user);
  const savedUser = await userRepository.save(newUser);
  return savedUser;
}

export async function getUserByGoogleId(googleId: string): Promise<User | undefined> {
  return userRepository.findOne({ where: { googleId } });
}

export async function getUserById(id: number): Promise<User | undefined> {
  const options: FindOneOptions<User> = { where: { id } };
  return userRepository.findOne(options);
}

export async function updateUser(user: User): Promise<User> {
  return userRepository.save(user);
}

export async function getAllUsers(): Promise<User[]> {
  return userRepository.find();
}

export async function deleteUser(id: number): Promise<{ affected: number }> {
  const { affected } = await userRepository.delete(id);
  return { affected };
}

// Chamar a inicialização ao iniciar o aplicativo
initializeService();

export { initializeService };
