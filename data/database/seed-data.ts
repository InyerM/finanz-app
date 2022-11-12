// import bcrypt from 'bcrypt'

interface IUserData {
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
}

interface ISeedData {
  users: IUserData[];
}

export const seedData: ISeedData = {
  users: [
    {
      name: 'Admin',
      email: 'admin@finanzapp.com',
      // password: bcrypt.hashSync('admin1', 10),
      password: 'admin1',
      role: 'admin',
    },
    {
      name: 'David',
      email: 'david@google.com',
      // password: bcrypt.hashSync('123456', 10),
      password: '123456',
      role: 'user',
    }
  ]
}
