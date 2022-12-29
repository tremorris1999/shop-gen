const User = () => ({
  id: '',
  email: '',
  password: '',
  dateCreated: new Date(),
})

type User = ReturnType<typeof User>

export default User
