/**
 * 生成一个用不重复的ID
 */
export function genNonDuplicateID(randomLength = 3) {
  let idStr = Date.now().toString(36)
  idStr += Math.random().toString(36).substr(2, randomLength)
  return idStr
}
