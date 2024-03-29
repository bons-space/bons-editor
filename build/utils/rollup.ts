import { compPackage } from './paths'

export const target = 'esnext'

export const getCompPackage = () => {
  // eslint-disable-next-line global-require,import/no-dynamic-require
  const { version, dependencies, peerDependencies } = require(compPackage)
  return {
    version,
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
  }
}

export const generateExternal = (options: { full: boolean }) => {
  const { dependencies, peerDependencies } = getCompPackage()

  const packages: string[] = peerDependencies

  if (options.full) {
    packages.push(...dependencies)
  }

  return (id: string) => packages.some(
    (pkg) => id === pkg || (options.full && id.startsWith(`${pkg}/`)),
  )
}
