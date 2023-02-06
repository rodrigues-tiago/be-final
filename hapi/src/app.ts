import initialize from './server'

const main = async () => {
  const port = process.env['PORT'] ?? 3000

  const server = await initialize({port})
  void await server.start()
}

void main()
