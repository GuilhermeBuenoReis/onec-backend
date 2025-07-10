import { seedAdmins } from './index.js'

const env = process.env.NODE_ENV ?? 'development'

if (env === 'development') {
  ;(async () => {
  await seedAdmins()
})()
} else {
  console.log(`Sem seed para o ambiente "${env}"`)
}
