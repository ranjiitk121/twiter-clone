import { TypeormService } from '@my/backend-core';
import { User } from '../entities/user.entity';
const userRepository = TypeormService.getRepository();

async function my() {
    const user = new User()
user.firstName = "Timber"
user.lastName = "Saw"
user.age = 25
await userRepository.save(user)

const allUsers = await userRepository.find()
const firstUser = await userRepository.findOneBy({
    id: 1,
}) // find by id
const timber = await userRepository.findOneBy({
    firstName: "Timber",
    lastName: "Saw",
}) // find by firstName and lastName

await userRepository.remove(timber)
}