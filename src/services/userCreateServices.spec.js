const UserCreateServices = require("./UserCreateServices");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");

describe("CreateService", () => {
  let userRepositoryInMemory = null;
  let userCreateServices = null;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userCreateServices = new UserCreateServices(userRepositoryInMemory)
  })

  it("user should be created", async () => {
    const user = {
      name: "user",
      email: "user@mail.com",
      password: "123",
    };

    const userCreated = await userCreateServices.execute(user);

    expect(userCreated).toHaveProperty("id");
  })

  it("user not should be create with exists email", async () => {
    const user1 = {
      name: "user test 1",
      email: "newuser@example.com",
      password: "123",
    }
    const user2 = {
      name: "user test 2",
      email: "newuser@example.com",
      password: "456",
    }

    await userCreateServices.execute(user1);
    await expect(userCreateServices.execute(user2)).rejects.toEqual(new AppError("Este e-mail já está em uso."));
  });
});
